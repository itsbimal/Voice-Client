import React, { useState } from "react";
import Card from "../../../components/common/card/Card";
import Input from "../../../components/common/input/Input";
import Button from "../../../components/common/buttons/Button";
import { useDispatch,useSelector } from "react-redux";
import { setName,setProfile } from "../../../store/AllSlice";

const Fullname = ({ onNext }) => {
  const name = useSelector((state) => state.Auth.name);
  const [fullname,setFullname] = useState(name);
  const dispatch = useDispatch();

  function Submit(){
    if(!fullname){
      return;
    }

    dispatch(setName(fullname));
    onNext()

  }

  return (
    <>
      <Card title="Your good name?" icon="">
        <Input
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <div>
          <Button text={"Next"} onClick={Submit} />
        </div>

        <p className="mt-3">
          Entering your legal name allows to verify through <br /> KYC steps.
        </p>
      </Card>
    </>
  );
};

export default Fullname;
