import React, { useEffect, useState } from "react";
import AddRoomModal from "../../components/addRoomModal/AddRoomModal";
import RoomCard from "../../components/roomCard/RoomCard";
import { getAllRooms } from "../../http/Index";
import style from "./Rooms.module.css";

// const rooms = [
//   {
//     id: 1,
//     topic: "Its about getting hign marks",
//     speakers: [
//       {
//         id: 1,
//         name: "Bimal Shrestha",
//         avatar: "/images/logo.png",
//       },
//       {
//         id: 1,
//         name: "Bimal Shrestha",
//         avatar: "/images/logo.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 2,
//     topic: "Its about getting hign marks",
//     speakers: [
//       {
//         id: 1,
//         name: "Bimal Shrestha",
//         avatar: "/images/logo.png",
//       },
//       {
//         id: 1,
//         name: "Bimal Shrestha",
//         avatar: "/images/logo.png",
//       },
//     ],
//     totalPeople: 60,
//   },
// ];

const Rooms = () => {

  const [rooms,setRooms] = useState([]);

  useEffect(()=>{
    const fetchRooms = async () =>{
      const {data} = await getAllRooms();
      setRooms(data);
    };
    fetchRooms();
  },[]);

  const [showModal, setShowModal] = useState(false);

  function openModal(){
    console.log("hello")
    setShowModal(true);
  }


  return (
    <div className="container">
      <div className={style.roomHeader}>
        <div className={style.left}>
          {/* <span className="fs-3">Search the room</span> */}
          <div className={style.search}>
            <i class=" fa-solid fs-3 fa-magnifying-glass"></i>
            <input type="text" placeholder="Search the room ..." className={style.searchInput} />
          </div>
        </div>
        <div className={style.rignt}>
          <button onClick={openModal} className="btn btn-success shadow-0">
            <span className="fw-bold">Create a room</span>
            <i class="fa-solid fa-microphone-lines ms-2 fw-bold"></i>

          </button>
        </div>
      </div>

      <div className={style.roomList}>
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room}/>
        ))}
      </div>
      {showModal && <AddRoomModal onClose={()=> setShowModal(false)} />}
    </div>
  );
};

export default Rooms;
