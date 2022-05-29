import React from 'react';
import style from './Profile.module.css'
import { useSelector } from 'react-redux';

export const Profile = () => {

  const { isAuth, user } = useSelector((state) => state.Auth)
  return (
    <div className='container'>
      <div className={style.main}>
        <div>
          <img className={style.profile_img} src={user.profile} alt="Profile pic" width="100%" />
        </div>
        <div className={style.name}>
          <h2>Jon Snow</h2>
          <span class="badge bg-primary">@jonsnow</span>
          <div className='mt-2 d-flex '>
            <p>32 Followers</p>
            <p className='ms-3'>3 Following</p>
          </div>
        </div>
      </div>

      <div className={style.clientSetting}>

        <div className={style.tab}>
        <h5 className='me-5'>General Settings</h5>
        <h5 className='me-5'>Privacy and Passcode</h5>
        <h5 className='me-5'>Policy Agreement</h5>
        <h5>Followers / Following</h5>
        </div>
      </div>

    </div>
  )
}

export default Profile;
