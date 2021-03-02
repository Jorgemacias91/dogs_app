import React, { useEffect, useState } from 'react';
import style from './form.module.css';
import fetch from 'node-fetch';
import { connect } from 'react-redux';
import { getTemperamentos } from '../../actions/index'


function Form(props) {

  const [input, setInput] = useState({
    name: "",
    height: "",
    weight: "",
    years: "",
    sexo: "",
    nameT: ""
  })


  async function handleSubmit(event) {
    event.preventDefault();
    window.location.href = "http://localhost:3000/home"
    await fetch('http://localhost:3001/dogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    })

  }


  function handleChange(e) {

    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  useEffect(() => {

    handleDispatch();
  }, [])

  function handleDispatch() {
    props.getTemperamento()
  }



  return (
    <form onSubmit={handleSubmit}>

      <div className={style.block}>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          required="required"
          value={input.name}
          onChange={handleChange}
        />
      </div>

      <div className={style.block}>
        <label>Altura:</label>
        <input
          type="text"
          name="height"
          required="required"
          value={input.height}
          onChange={handleChange}
        />
      </div>

      <div className={style.block}>
        <label>Peso:</label>
        <input
          type="text"
          name="weight"
          required="required"
          value={input.weight}
          onChange={handleChange}
        />
      </div>

      <div className={style.block}>
        <label>Años de Vida:</label>
        <input
          type="text"
          name="years"
          required="required"
          value={input.years}
          onChange={handleChange}
        />
      </div >

      <div className={style.btn}>

        <div>
          <select name="sexo" value={input.sexo} onChange={handleChange} required>
            <option value="">Sexo</option>
            <option value="Hembra">Hembra</option>
            <option value="Macho">Macho</option>
          </select>
        </div>

        <div>
          <select name="nameT" value={input.nameT} onChange={handleChange} required>
            <option value="">Temperamentos</option>
            {props.estadoT && props.estadoT.map(elem => (
              <option value={elem.id}>{elem.nameT}</option>
            ))}
          </select>
        </div>


        <input type="submit" />
      </div>
    </form>
  )
}

function mapStateToProps(state) {
  return {
    estadoT: state.temperamento
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getTemperamento: elem => dispatch(getTemperamentos(elem))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);