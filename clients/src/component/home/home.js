import React, { useState, useEffect } from 'react';
import style from './home.module.css'
import { Link } from 'react-router-dom'
import { filtroTemp, getRaza, getRazasAll, getTemperamentos, sort } from '../../actions/index'
import { connect } from 'react-redux';
import { ASD, DES } from '../../actions/index'
import logo from '../../img/dog.png'
import cachorro from '../../img/cachorro.png'

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

    const btnToggle = document.querySelector('.home_toggleBtn__1yeHu')
btnToggle && btnToggle.addEventListener('click' ,function(){
  console.log(document.getElementById('home_navig__EW3f9'))
  document.getElementById('home_navig__EW3f9').classList.toggle('home_active__20C7U')
  document.querySelector('body').classList.toggle('home_container__7Xk0y')
});

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
    <div className={style.home}>

      {/* barra de navegación */}

      <div id={style.navig} className={style.active}>
        {/*----Input de búsqueda para encontrar razas de perros por nombre-----*/}
      
      <div className={style.toggleBtn}>
        <span>&#9776;</span>
      </div>

      <ul>

        <li>
          <img src={logo} className={style.imagen} width="200px" height="200px"/>
        </li>

        <li>
      
      <form className={style.formul}onSubmit={handleDispatch}>
        <div>
          <input
            type="text"
            autoComplete="off"
            placeholder="Races"
            name="raza"
            value={input.raza}
            onChange={handleInput}
          />
        </div>
        <button className={style.btn}type="submit" >Search</button>
      </form>
</li>
      {/*-----------------Boton para buscar por ASC y DES--------------------*/}
 

<li>
  <select onChange={handleDispatchOrder} className={style.fOrder}>
    <option>Ordering</option>
    <option value={ASD}>Upward</option>
    <option value={DES}>Falling</option>
  </select>
</li>

{/*-----------Boton de filtrar por Temperamento---------------------*/}

<li>
  <select name="nameT" value={input.nameT} onChange={handleDispatchTemp} className={style.fTemp}>
    <option value="">Filter by Temperaments</option>
    {props.estadoT && props.estadoT.map(elem => (
      <option value={elem.nameT}>{elem.nameT}</option>
    ))}
  </select>
</li>

{/*-----------------Boton de filtrar por Raza--------------------*/}

<li>
  <select name="razaSelect" value={input.razaSelect} onChange={handleDispatchRaza} className={style.fRaza}>
    <option value="">Filter by Races</option>
    {props.estado && props.estado.map(elem => (
      <option key={elem.id}>{elem.name}</option>
    ))}
  </select>
</li>

<li>
<Link to="crearRaza" className={style.crear}>
  <img src={cachorro} width="100px" height="100px"/>
  <br/>
  <p>Create Races</p>
  </Link>
</li>



      </ul>

      </div>
      
{/*-----------------Boton de filtrar por Raza creada existente--------------------*/}

 
     




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
        <button onClick={() => setPagRazas(pagRazas - 1)}>Backward</button>
        <button>{pagRazas}</button>
        <button onClick={() => setPagRazas(pagRazas + 1)}>Forward</button>
      </div>

    </div>
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