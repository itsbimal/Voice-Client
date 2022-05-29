import React from 'react'
import style from './Input.module.css';

const Input = (props) => {
  return (
    <div>
        <input className={style.input} style={{width: props.fullWidth === 'true' ? '100%' : '350px'}} type="text" {...props} />
    </div>
  )
}

export default Input