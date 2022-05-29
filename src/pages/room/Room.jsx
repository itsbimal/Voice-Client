import React, { useEffect, useState } from 'react'
import { useWebRTC } from '../../hooks/useWebRTC'
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import style from './Room.module.css'
import { getRoom } from '../../http/Index';

const Room = () => {

  const { id: roomId } = useParams();
  const user = useSelector((state) => state.Auth.user)
  const { clients, provideRef, handleMute } = useWebRTC(roomId, user);
  const [room, setRoom] = useState('');
  const [isMute, setMute] = useState(true);
  const navigate = useNavigate();

  function handleManualLeave() {
    navigate('/room')
  }

  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await getRoom(roomId);
      setRoom((prev) => data);
    }
    fetchRoom();
  }, [roomId])

  useEffect(() => {
    handleMute(isMute, user.id);
  }, [isMute]);


  const handleMuteClick = (clientId) => {
    if(clientId !== user.id) return;
    console.log('clicked', clientId)
    setMute((isMute) => !isMute);  // if m then unm, if unm do m
    console.log(isMute)
  }


  return (
    <>
      <div>
        <div className="container">
          <h3 className='fw-bold mb-3'>All connected clients <i class="fa-solid fa-user-group"></i></h3>
          <div className={style.goBack}>
            <button onClick={handleManualLeave} className={style.backBtn}>
              <h4><i class="fa-solid fa-circle-arrow-left me-2"></i></h4>
              <h4 className='fw-bold'>Access All Rooms</h4>
            </button>
          </div>

        </div>

        <div className={style.clientWrap}>
          <div className={style.header}>
            <h3 className="fw-bold">{room.topic}</h3>

            <div className={style.actions}>
              <h3 className='fs-5 fw-bold'><i class="fa-solid fa-hand me-2"></i>Raise</h3>
              <button onClick={handleManualLeave} className={style.btnLeave}>
                <i class="fa-solid fa-hand-peace"></i> Leave Peacefully!
              </button>
            </div>
          </div>
          <div className={style.clientsList}>
            {clients.map(client => {
              return (
                <div className={style.client} key={client.id}>
                  <div className={style.userHead}>
                    <audio ref={(instance) => provideRef(instance, client.id)} autoPlay></audio>

                    <img className={style.userAvatar} src={client.profile} alt="profile" />

                    <button onClick={() => handleMuteClick(client.id)} className={style.micBtn}>
                      {
                        client.muted ? (<i class="fa-solid fa-microphone-slash"></i>)
                          : (<i class="fa-solid fa-microphone"></i>)
                      }


                    </button>

                    <p className='text-center fw-bold fs-5 mt-2'>{client.name}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )

}

export default Room