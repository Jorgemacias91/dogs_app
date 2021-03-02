import React from "react";
import { Route } from "react-router-dom";
import Home from "./component/home/home"
import Page from "./component/Page/index"
import Detalles from './component/DetallesRaza/index'
import Form from './component/Form/index'

function App() {
  return (
      <React.Fragment>
          <Route path="/" exact component={Page}/>
          <Route path="/home" component={Home} />
          <Route path="/detalles/:id" component={Detalles}/>
          <Route path="/crearRaza" component={Form}/>
      </React.Fragment>
  );
}

export default App;
