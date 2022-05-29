import React from 'react';
import style from './Card.module.css';

function Card({title,icon, children}) { // children means content inside from props
  return (
    <div className={style.cardBody}>
        <div className={style.card}>
        <div>
          <div className={style.heading}>
            { icon && <img className={style.imgC} src={`/images/${icon}.png`} alt="Logo" />}
            { title && <h1 className={style.head}>{title}</h1>}
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Card;


