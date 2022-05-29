import React from "react";
import style from "./RoomCard.module.css";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ room }) => {
  const navigate = useNavigate();
  console.log(room);
  return (
    <div onClick={() => {navigate(`/room/${room.id}`)}} className={style.card}>
      <h5 className={style.topic}>"{room.topic}"</h5>
      <div className={`${style.speakers} ${room.speakers.length === 1 ? style.singleSpeaker : ''}`}>
        <div className={style.left}>
          {room.speakers.map((speaker) => (
            <img key={speaker.id} src={speaker.profile} alt="Speakers" />
          ))}
        </div>
        <div className={style.right}>
          {room.speakers.map((speaker) => (
            <div key={speaker.id} className={style.nameWrapper}>
              <span>{speaker.name} <i class="fa fa-volume-up fs-6" aria-hidden="true"></i></span>
            </div>
          ))}
        </div>
      </div>
      <div className={style.peopleCount}>
          <span> {room.totalPeople} <i class="fa-solid fa-user-group"></i></span>
      </div>
    </div>
  );
};

export default RoomCard;
