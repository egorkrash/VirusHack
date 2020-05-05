import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './index.css';
import Alarms from './containers/Alerts';
import * as serviceWorker from './serviceWorker';
import SnmpMonitor from './containers/SnmpMonitor';
import RadiusMonitor from './containers/RadiusMonitor';
import NotFoundPage from "./pages/NotFound";
import AlertDetail from "./components/AlarmDetail";


ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/snmp" component={SnmpMonitor} />
      <Route path="/radius" component={RadiusMonitor} />
      <Route path="/user_detail" component={AlertDetail} />
      <Route path="/" component={Alarms} exact />
      <Route component={NotFoundPage}/>
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
