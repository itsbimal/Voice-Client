import React, { useEffect, useState } from 'react';
import Card from '../../../components/common/card/Card';
import Button from '../../../components/common/buttons/Button';
import style from './SetProfile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth, setProfile } from '../../../store/AllSlice';
import { activate } from '../../../http/Index';
import Loader from '../../../components/common/loader/Loader';

const set_profile = ({onNext}) => {
  const dispatch = useDispatch();
  const {name,profile} = useSelector((state) => state.Auth);
  const [image,setImage] = useState('/images/monkey.jpg');
  const [loading, setLoading] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  async function Submit(){
    if(!name || !profile) return;
    setLoading(true);
    try {
      const {data} = await activate({name,profile});
      if(data.Auth){
        // Check
        if(!unmounted){

        }
        dispatch(setAuth(data));
      } 
      setLoading(false);
      
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }


  useEffect(()=>{
    return () =>{
      setUnmounted(true);
    }
  });

  // image
  function captureImage(e){
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function(){
      console.log(reader.result);
      setImage(reader.result);
      dispatch(setProfile(reader.result));
    }

  };

  if (loading) return <Loader message="Activating.."/>;

  return (
    <>
    <Card title={`Wounderful, ${name}`} icon="profile">
        <p className={style.subHeading}>
          Now, you can upload profile!
        </p>

        <div className={style.avatar}>
            <img className={style.avatarImg} src={image} alt="profile" />
        </div>

        
        <div>
          <input 
          onChange={captureImage}
          type="file" id='profileInput' 
          className={style.profileInput}
          
          />
          <label htmlFor='profileInput' className={style.avatarLabel}>
            Choose a photo
          </label>
        </div>

        <div>
          <Button text={"Next"} onClick={Submit} />
        </div>
       
      </Card>
    </>
  )
}

export default set_profile