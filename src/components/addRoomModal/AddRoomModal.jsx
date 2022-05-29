import React, { useState } from 'react';
import style from './AddRoomModal.module.css';
import Input from '../common/input/Input';
import { createRoom as create } from '../../http/Index';
import {useNavigate} from 'react-router-dom';

const AddRoomModal = ({onClose}) => {

    const navigate = useNavigate();

    const [roomType, setRoomType] = useState('open');
    const [topic, setTopic] = useState('');

    async function createRoom(){
        // calling the server
        try {
            console.log("Hello")
            if(!topic) return;
            const {data} = await create({topic,roomType});
            navigate(`/room/${data.id}`);
            console.log(data);

        } catch (error) {
            console.log(error);
        }

    }

  return (
    <div className={style.modalMask}>
        <div className={style.modalBody}>
            <button onClick={onClose} className={style.closeBtn}>
                <i class="fa-solid fa-xmark"></i>
            </button>
            <div className={style.modalHeader}>
                <h5>Enter the topic to be discussed!</h5>
                <Input fullWidth="true" value={topic} onChange={(e)=>setTopic(e.target.value)} />

                <p className={style.roomTypeHead}>Room Types</p>
                <div className={style.roomType}>
                    <div onClick={()=> setRoomType('open')} className={`${style.typeBox} ${roomType === 'open' ? style.active : ''}`}>
                        <i class="fa-solid fs-2 mb-1 fa-globe"></i>
                        <span>Public</span>
                    </div>
                    <div onClick={()=> setRoomType('social')} className={`${style.typeBox} ${roomType === 'social' ? style.active : ''}`}>
                        <i class="fa-solid fs-2 mb-1 fa-users"></i>
                        <span>Social</span>
                    </div>
                    <div onClick={()=> setRoomType('private')} className={`${style.typeBox} ${roomType === 'private' ? style.active : ''}`}>
                        <i class="fa-solid fs-2 mb-1 fa-lock"></i>
                        <span>Private</span>
                    </div>
                </div>
                
            </div>
            <div className={style.modalFooter}>
                <p>Start a room, Available to everyone</p>
                <button className='btn btn-success' onClick={createRoom}>
                    Let's create! <i class="fa-solid fa-location-arrow"></i>
                </button>
            </div>
        </div>
    </div>
  )
}

export default AddRoomModal