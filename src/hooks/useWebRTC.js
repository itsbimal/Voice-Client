import { useState, useRef, useEffect, useCallback } from "react";
import { useStateWithCallback } from "./useStateWithCallback";
import { socketInit } from '../socket/Index'
import { ACTIONS } from "../action";
import freeice from "freeice";

const users = [
    // {
    //     id:1,
    //     name:'Bimal Shrestha'
    // },
    // {
    //     id:2,
    //     name:'Johnny Jonny'
    // }
]

export const useWebRTC = (roomId, user) => {
    const [clients, setClients] = useStateWithCallback(users);
    const audioElements = useRef({});
    const connections = useRef({});
    const localMediaStream = useRef(null);
    const socket = useRef(null);
    const clientRef = useRef([]); // for mute unmute

    useEffect(() => {
        socket.current = socketInit();
    }, [])

    const addNewClient = useCallback(
        (newClient, cb) => {
            const lookingFor = clients.find((client) => client.id === newClient.id);
            if (lookingFor === undefined) {
                setClients((existingClients) =>
                    [...existingClients, newClient], cb
                )
            }
        }, [clients, setClients],
    )

    // capture the audio
    useEffect(() => {
        const startCapture = async () => {
            localMediaStream.current = await navigator.mediaDevices.getUserMedia({
                audio: true
            })
        };
        startCapture().then(() => {
            addNewClient({ ...user, muted: true }, () => {
                const localElement = audioElements.current[user.id];
                if (localElement) {
                    localElement.volume = 0; // for double listening own volume
                    localElement.srcObject = localMediaStream.current; // playing
                }

                // web socket emit join SOCKET.IO
                socket.current.emit(ACTIONS.JOIN, { roomId, user });

            })
        });
        return () => {
            // leaving the room
            localMediaStream.current.getTracks().forEach(track => track.stop())
            socket.current.emit(ACTIONS.LEAVE, { roomId })
        }
    }, []);

    useEffect(() => {
        const handleNewPeer = async ({ peerId, createOffer, user: remoteUser }) => {

            // if user is already connected
            if (peerId in connections.current) {
                return console.log(`Already connected with ${peerId} (${user.name})`);
            }

            connections.current[peerId] = new RTCPeerConnection({
                iceServers: freeice()
            });

            // Handling new ice candidate
            connections.current[peerId].onicecandidate = (event) => {
                socket.current.emit(ACTIONS.RELAY_ICE, {
                    peerId,
                    icecandidate: event.candidate
                })
            }

            // handling on track on this connections
            connections.current[peerId].ontrack = ({
                streams: [remoteStream]
            }) => {
                addNewClient({...remoteUser, muted: true}, () => {
                    if (audioElements.current[remoteUser.id]) {
                        audioElements.current[remoteUser.id].srcObject = remoteStream
                    } else {
                        let settled = false;
                        const interval = setInterval(() => {
                            if (audioElements.current[remoteUser.id]) {
                                audioElements.current[remoteUser.id].srcObject = remoteStream
                                settled = true;
                            }

                            if (settled) {
                                clearInterval(interval)
                            }
                        }, 1000)
                    }
                });
            };

            // Add local track to remote connections
            localMediaStream.current.getTracks().forEach(track => {
                connections.current[peerId].addTrack(track, localMediaStream.current)
            });

            // creating offer
            if (createOffer) {
                const offer = await connections.current[peerId].createOffer();
                // await connections.current[peerId].setLocalDescription(offer); // 17 hrs to solve
                await connections.current[peerId].setRemoteDescription(offer);

                // sending offer to another clients
                socket.current.emit(ACTIONS.RELAY_SDP, {
                    peerId,
                    sessionDescription: offer
                })
            }

        }

        socket.current.on(ACTIONS.ADD_PEER, handleNewPeer)

        return () => {
            socket.current.off(ACTIONS.ADD_PEER)
        }

    }, [])

    // HAndle ice dandidate
    useEffect(() => {
        socket.current.on(ACTIONS.ICE_CANDIDATE, ({ peerId, icecandidate }) => {

            if (icecandidate) {
                connections.current[peerId].addIceCandidate(icecandidate);
            }
        })  // ON: LISTENING

        return () => {
            socket.current.off(ACTIONS.ICE_CANDIDATE);
        }

    }, [])

    // Handle SDP
    useEffect(() => {

        const handleRemoteSdp = async ({
            peerId,
            sessionDescription: remoteSessionDescription
        }) => {
            connections.current[peerId].setRemoteDescription(
                new RTCSessionDescription(remoteSessionDescription)
            );

            // id sesion desc is offer, then create answer
            if (remoteSessionDescription.type === 'offer') {
                const connection = connections.current[peerId]
                const answer = await connection.createAnswer();
                connection.setLocalDescription(answer);
                socket.current.emit(ACTIONS.SESSION_DESCRIPTION, {
                    peerId,
                    sessionDescription: answer,
                });
            }
        };

        socket.current.on(ACTIONS.SESSION_DESCRIPTION, handleRemoteSdp)
        return () => {
            socket.current.off(ACTIONS.SESSION_DESCRIPTION)
        }
    }, [])

    // handle remove peer
    useEffect(() =>{
        const handleRemovePeer = async({peerId, userId}) =>{
            if (connections.current[peerId]){
                connections.current[peerId].close();
            }
            setClients((list) => list.filter((c) => c.id !== userId)); // debug 4.5 hrs
            delete connections.current[peerId];
            delete audioElements.current[peerId];
            
        }
        socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);
        return () => {
            socket.current.off(ACTIONS.REMOVE_PEER)
        };
    },[])

    // Listening mute/unmute
    useEffect(() =>{
        socket.current.on(ACTIONS.MUTE,({peerId,userId}) =>{
            setMute(true, userId)
        });

        socket.current.on(ACTIONS.UN_MUTE,({peerId,userId}) =>{
            setMute(false, userId)
        });
        
        const setMute = (mute, userId) =>{
            const clientIdx = clientRef.current
                .map((client) => client.id)
                .indexOf(userId);

            const connectedClients = JSON.parse(
                JSON.stringify(clientRef.current)
            );
            if(clientIdx >  -1){
                connectedClients[clientIdx].muted = mute;
                setClients(connectedClients);
            }
        }

    },[]);

    useEffect(() =>{
        clientRef.current = clients;
    }, [clients]);
    
    const provideRef = (instance, userId) => {
        audioElements.current[userId] = instance;
    };

    const handleMute = (isMute, userId) => {
        let settled = false;
        let interval = setInterval(() =>{
            if (localMediaStream.current){
                localMediaStream.current.getTracks()[0].enabled = !isMute;
                if(isMute){
                     socket.current.emit(ACTIONS.MUTE,{
                         roomId, 
                         userId,
                    });
                    
                }
                else{
                    socket.current.emit(ACTIONS.UN_MUTE,{
                        roomId,
                        userId
                    })
                }

                settled = true;
            }
            if(settled){
                clearInterval(interval);
            }
        },200); // 200 milli sec
        
    }
    
    return { clients, provideRef, handleMute };
};
