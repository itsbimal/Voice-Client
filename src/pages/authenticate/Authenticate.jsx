import React,{useState} from "react";
import phoneEmail from '../steps/phoneEmail/PhoneEmail'
import otpVerification from '../steps/otpVerification/OtpVerification'

const steps = {
  1: phoneEmail,
  2: otpVerification,
};

const Authenticate = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];

  function onNext() {
    console.log("Clicked");
    setStep(step + 1); // increasing above steps
  }
  return(
    <Step onNext={onNext} />
  );
};

export default Authenticate;
