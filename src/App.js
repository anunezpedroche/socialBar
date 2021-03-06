import React, { useState, useEffect, useCallback } from "react";
import { whoAmI } from "./Helpers/auth-helpers";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// Components

import Login from "./Components/Login/Login";
import Home from './Components/Home/Home';
import Locales from './Components/Locales/Locales';
import Menu from './Components/Menu/Menu';
import Dishes from './Components/Dishes/Dishes';
import CardFromTable from './Components/CardFromTable/CardFromTable';
import WaiterController from './Components/WaiterController/WaiterController';
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

// Css

import "./App.css";

// Antd 

import { Spin } from "antd";

// Redux

import { connect } from "react-redux";
import { readUser } from "./Redux/Reducers/UserReducer";
import { logUser } from "./Redux/Actions/UserActions";

function App({ user, logUser }) {
  
  const [loading, setLoading] = useState(true);
  
  const replenishUser = useCallback (async () => {

    const data = await whoAmI();
    if (data.auth) {
      logUser(data.user);
    }
    setLoading(false);

  },[logUser]);

  useEffect(() => {

    setLoading(true);
    replenishUser();

  },[replenishUser]);

  

  return !loading ? (
    <Router>
      <div>
    
        <Switch>

          <Route path="/login" exact>
            {user ? <Redirect to="/Home" /> : <Login />}
          </Route>

          {<PrivateRoute path="/Home" component={Home} exact/>}
          {<PrivateRoute path="/Locales" component={Locales} exact/>}
          {<PrivateRoute path="/Menu" component={Menu} exact/>}
          {<PrivateRoute path="/Dishes" component={Dishes} exact/>}
          {<Route path="/CardFromTable/:idTable/:idCard" component={CardFromTable}/>}
          {<Route path="/WaiterController" component={WaiterController}/>}
          <Route path="/" ><Redirect to="/login" /></Route>
        </Switch>
        
      </div>
    </Router>
  ) : (
    <Spin size="large" className="Spin" />
  );
}

const mapStateToProps = state => {
  return { user: readUser(state) };
};

export default connect(mapStateToProps, { logUser })(App);
