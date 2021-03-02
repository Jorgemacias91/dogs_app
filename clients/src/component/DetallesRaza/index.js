import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import style from './detalles.module.css'
import { getRazasDetails } from '../../actions/index'
// ejemplo para cambio


function Detalles(props) {

  useEffect(() => {
    const varId = props.match.params.id;
    props.getRazasDetails(varId)
  }, [])

  return (

    <div className={style.wc}>

      <div className={style.container}>
        <div className={style.card_container}>
          <div className={style.header}> 
         
            <img src={props.estado.img} className={style.imagen} width="400" height="300"/>
          
            <h2>
              {props.estado.name}
            </h2>
            <h4 className={style.text_white}>{props.estado.temperament}</h4>
          </div>
          <div className={style.description}>
            <p className={style.wc}>
              <strong >Detalle de la Raza</strong>
            </p>

            <p className={style.text_white}>
              Altura: {props.estado.height}
            </p>
            <p className={style.text_white}>
              Peso: {props.estado.weight}
            </p>

            <p className={style.text_white}>
              Años de Vida: {props.estado.life_span}
            </p>


          </div>
        </div>
      </div>
    </div>
  )
};

function mapStateToProps(state) {
  return {
    estado: state.razasDetail
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getRazasDetails: id => dispatch(getRazasDetails(id)),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Detalles); 