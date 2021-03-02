import React, { useState, useEffect } from 'react';
import style from './home.module.css'
import { Link } from 'react-router-dom'
import { filtroTemp, getRaza, getRazasAll, getTemperamentos, sort } from '../../actions/index'
import { connect } from 'react-redux';
import { ASD, DES } from '../../actions/index'



export function Home(props) {

  const [input, setInput] = useState({
    raza: "",

  })
  const [pagRazas, setPagRazas] = useState(1);

  const primerGrupo = 8;
  const conteoFinal = pagRazas * primerGrupo;
  const conteoInicial = conteoFinal - primerGrupo;
  const vista = props.estado.slice(conteoInicial, conteoFinal);
                                          

  useEffect(() => {
    filtroTemp();
    filtroRaza();
  }, [])

  function filtroTemp() {
    props.getTemperamento();
  }

  function filtroRaza() {
    props.getRazasAll();
  }


  function handleInput(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    })

  }

  function handleDispatch(e) {
    e.preventDefault();

    if (input.raza) {
      props.getRaza(input.raza)
    }
    else {
      alert("Debe ingresar el nombre de la Raza!")
    }


  }
  function handleDispatchTemp(e) {
    props.filtroTemp(props.estado, e.target.value);

  }

  function handleDispatchRaza(e) {
    props.getRaza(e.target.value)
  }

  function handleDispatchOrder(event) {
    if (event.target.value === ASD || event.target.value === DES) {
      props.sort(event.target.value, props.estado)
    }
  }


  return (
    <>
      {/*----Input de búsqueda para encontrar razas de perros por nombre-----*/}
      <form className={style.form_container} onSubmit={handleDispatch}>
        <div>
          <input
            type="text"
            autoComplete="off"
            placeholder="Razas"
            name="raza"
            value={input.raza}
            onChange={handleInput}
          />
        </div>
        <button type="submit" className={style.boton}>BUSCAR</button>
      </form>

      {/*-----------------Boton para buscar por ASC y DES--------------------*/}
      <div className={style.buscar}>

        <div>
          <select onChange={handleDispatchOrder} >
            <option>Ordenamiento</option>
            <option value={ASD}>Ascendente</option>
            <option value={DES}>Descendente</option>
          </select>
        </div>


        {/*-----------Boton de filtrar por Temperamento---------------------*/}

        <div>
          <select name="nameT" value={input.nameT} onChange={handleDispatchTemp}>
            <option value="">Filtrar por Temperamentos</option>
            {props.estadoT && props.estadoT.map(elem => (
              <option value={elem.nameT}>{elem.nameT}</option>
            ))}
          </select>
        </div>


        {/*-----------------Boton de filtrar por Raza--------------------*/}

        <div>
          <select name="razaSelect" value={input.razaSelect} onChange={handleDispatchRaza}>
            <option value="">Filtrar por Razas</option>
            {props.estado && props.estado.map(elem => (
              <option key={elem.id}>{elem.name}</option>
            ))}
          </select>
        </div>

        {/*-----------------Boton de filtrar por Raza creada existente--------------------*/}

        {/* <div>
          <select onChange={handleDispatchSelect}>
            <option value="">Filtrar por Razas</option>

            <option value="existente">Existente</option>

            <option value="creada">Creada</option>


          </select>
        </div> */}

        <div>
          <Link to="crearRaza">
            <button>Crear Razas</button>
          </Link>
        </div>

      </div>




      {/*-------------------razas----------------------*/}

      <div className={style.container}>
        {vista && vista.map((elem) => (

          <div className={style.card} key={elem.id}>

            <Link to={`/detalles/${elem.id}`}>
              <img src={elem.img} className={style.imagen} />
            </Link>
            <h2>{elem.name}</h2>
            <p>{elem.temperament}</p>
          </div>

        ))}
      </div>

      <div className={style.btnPaginado}>
        <button onClick={() => setPagRazas(pagRazas - 1)}>Atrás</button>
        <button>{pagRazas}</button>
        <button onClick={() => setPagRazas(pagRazas + 1)}>Próximo</button>
      </div>

    </>
  )
};

function mapStateToProps(state) {
  return {
    estado: state.razas,
    estadoT: state.temperamento
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getRaza: elem => dispatch(getRaza(elem)),
    getRazasAll: elem => dispatch(getRazasAll(elem)),
    getTemperamento: elem => dispatch(getTemperamentos(elem)),
    sort: (elem1, elem2) => dispatch(sort(elem1, elem2)),
    filtroTemp: (elem1, elem2) => dispatch(filtroTemp(elem1, elem2))
  }
}





export default connect(mapStateToProps, mapDispatchToProps)(Home);