import React from 'react';
import { Link } from 'react-router-dom'
import style from './page.module.css'

export function Page() {
  return (
    <>
      <div className={style.boton}>
        <Link to="/home">
          <button className={style.boton}>Home</button>
        </Link>
      </div>

      <h2 className={style.font}>Busca tu mascota favorita y <br/> conoce más sobre ella !</h2>


    </>
  )
};

export default Page;