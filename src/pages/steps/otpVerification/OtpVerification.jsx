import React, { useState } from "react";
import Button from "../../../components/common/buttons/Button";
import Input from "../../../components/common/input/Input";
import Card from "../../../components/common/card/Card";
import style from "./OtpVerification.module.css";
import { verifyOtp } from "../../../http/Index";
import { useSelector } from "react-redux"; // for fetching data
import { setAuth } from "../../../store/AllSlice";
import { useDispatch } from "react-redux";

const otp_verification = ({ onNext }) => {
  const [otp,setOtp] = useState('');
  const {phone,hash} = useSelector((state)=> state.Auth.otp);
  const dispatch = useDispatch(setAuth);

  async function Submit(){
    if (!otp || !phone || !hash){
      return;
    };
    try{ 
      const {data} = await verifyOtp({otp, phone,hash});
      console.log(data); // access token
      dispatch(setAuth(data));
      // onNext();

    } catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <Card title="OTP Verification" icon="phone">
      <Input placeholder="Enter OTP code" value={otp}  onChange={(e)=> setOtp(e.target.value)}/>
        <div>
          <Button text={"Next"} onClick={Submit} />
        </div>
        <p className="mt-3">
          Provide the valid verification code, we just sent to <br /> your phone number
      </p>
       
      </Card>
    </>
  );
};

export default otp_verification;
