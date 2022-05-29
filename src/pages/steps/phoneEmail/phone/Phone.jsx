import React, { useState } from "react";
import Card from "../../../../components/common/card/Card";
import Button from "../../../../components/common/buttons/Button";
import Input from "../../../../components/common/input/Input";
import { sendOtp } from "../../../../http/Index";
import { useDispatch } from "react-redux";
import { setOtp } from "../../../../store/AllSlice";

const Phone = ({onNext}) => {
  const [phoneNumber,setPhoneNumber] = useState('');
  const dispatch = useDispatch();

  async function Submit(){
    if(!phoneNumber){
      return;
    }
    // Server request
    const {data} = await sendOtp({phone:phoneNumber});
    console.log(data);
    dispatch(setOtp({phone: data.phone,hash:data.hash}));
    onNext();
  }

  return ( 
    <Card title="Enter your phone" icon="phone">
      <Input placeholder={"+977 98########"} value={phoneNumber} type={Number} onChange={(e)=> setPhoneNumber(e.target.value)}/>
      <div>
        <Button text={"Next"} onClick={Submit} />
      </div>

      <p className="mt-3">
          Enter valid phone number to get OTP Verification <br />for your account
      </p>
     
    </Card>
  );
};

export default Phone;
