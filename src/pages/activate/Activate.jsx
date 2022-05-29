import React, { useState } from 'react';
import Fullname from '../steps/fullName/Fullname'
import SetProfile from '../steps/setProfile/SetProfile'
import Username from '../steps/userName/Username'

const steps = {
  1: Fullname,
  2: SetProfile,
  3: Username
}

const Activate = (onNext) => {
  const[step,setStep] =  useState(1);
  const Step = steps[step];

  function onNext(){
    setStep(step+1)
  }

  return (
    <div>
      <Step onNext={onNext}></Step>
    </div>
  )
}

export default Activate