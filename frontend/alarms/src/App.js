import "bootstrap/dist/css/bootstrap.min.css"
import React, {useEffect, useState} from 'react';
import { Col, Container, Row, Alert, Button } from "reactstrap";
import './App.css';
import data_alarms from "./data/alarms";
import defaults from "./config";

function App() {
  const { current, history } = data_alarms;

  const [state, set_state] = useState({a: 1})

  let alarms_current = [];
  for (const current_alarm of current) {
    const color = defaults.typeAlarm_to_color[current_alarm.alarm_type];
    alarms_current.push(
      <row>
        <Button
          color={color}
          style={{width: "100%", margin: "5px"}}
          href={`/alarm?id=${current_alarm.id}`}
        >

          <span style={{float:"left"}}>
            <h4 style={{float:"left"}}> <b> "{current_alarm.what}" </b> is <b> {current_alarm.value} </b> </h4>
            <br/>
            <text style={{float:"left"}}> Predict {current_alarm.predict} </text>
            <br/>
            <text style={{float:"left"}}> Normal range {current_alarm.normal_diapason} </text>
          </span>
          <span style={{float:"right"}}>
            <text style={{float:"right"}}> {current_alarm.alarm_type} </text>
            <br/><br/><br/>
            <text style={{float:"right"}}> {current_alarm.date_begin} </text>
          </span>​
          <br/>
        </Button>
      </row>
    )
  }

  return (
    <Container>
      <Col>
        {alarms_current}
      </Col>
    </Container>
  );
}

export default App;
