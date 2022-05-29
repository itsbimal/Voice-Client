import React, { useState } from 'react';
import Input from '../../../../components/common/input/Input';
import Card from '../../../../components/common/card/Card'
import Button from '../../../../components/common/buttons/Button'

const email = ({onNext}) => {
    const [email, setEmail] = useState("");
  return (
    <Card title="Enter your email" icon="email">
      <Input placeholder="you@example.com" value={email}  onChange={(e)=> setEmail(e.target.value)}/>
      <div>
        <Button text={"Next"} onClick={onNext} />
      </div>

      <p className='mt-3'>
          Enter valid email to get verification code, used for account activation.
      </p>
      
     
    </Card>
  )
}

export default email