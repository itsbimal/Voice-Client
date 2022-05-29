import React, { useState } from "react";
import Phone from "./phone/Phone";
import Email from "./email/Email";
import style from "./PhoneEmail.module.css";

const phoneEmailSwitch = {
  phone: Phone,
  email: Email,
};

const phone_email = ({ onNext }) => {
  const [verType, setVerType] = useState("phone");
  const Component = phoneEmailSwitch[verType];

  // function onNext() {
  //   setVerType(verType + 1); // increasing above steps
  // }
  return (
    <>
      <div className={style.cardWrap}>
        <div className={style.btnWrap}>
          <button className={`${style.tabBtn} ${verType === 'phone' ? style.active:""}`} onClick={() => setVerType("phone")}><i className="fa-solid fa-phone-volume"></i> Phone</button>
          <button className={`${style.tabBtn} ${verType === 'email' ? style.active:""}`} onClick={() => setVerType("email")}><i class="fa-solid fa-envelope"></i> Email</button>
        </div>
      </div>

      <Component onNext={onNext} />
    </>
  );
};

export default phone_email;
