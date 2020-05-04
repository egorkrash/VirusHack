import "bootstrap/dist/css/bootstrap.min.css"
import React, {useEffect, useState} from 'react';
import { Col, Container, Row, Alert, Button } from "reactstrap";
import defaults from "../../config";
import Header from "../../components/Header";


function get_alarm_bar({data, title}) {
  // alert(JSON.stringify(users_values));
  const [users, values] = data;
  let res = [];
  for (let i=0; i<users.length; i++) {
    res.push(
      <Row>
        <Button
          style={{width: '100%', marginBottom:3, marginTop:3, marginLeft:6, marginRight:6}}
          color={"danger"}
        >
          <span style={{float: "left"}}>{users[i]}</span>
          <span style={{float: "right"}}><b>{values[i]}</b></span>
        </Button>
      </Row>
    )
  }
  return (
    <Col style={{width: '90%', backgroundColor: '#EFEFEF', margin: 3}}>
      <p><b> {title} </b></p>
      {res}
    </Col>
  );
}


async function fetch_data({set_data, hour}) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({hour: hour.hour})
  };
  fetch('http://localhost:4500/get_alert_users', requestOptions)
    .then(response => response.json())
    .then(data => set_data(data));
}


const Alerts = () => {
  const [data, set_data] = useState({
    failed_alert: [[], []],
    stops_alert: [[], []],
    tr_inp_zero_alert: [[], []],
    tr_out_zero_alert: [[], []]
  });
  const [hour, set_hour] = useState({hour: '05-03 00'})

  useEffect(() => {
    fetch_data({set_data, hour}).then();
  },   [1]);


  // alert(JSON.stringify(data)); f
  const columns_alerts = [
    get_alarm_bar({data: data.failed_alert, title: "FAILED in auth"}),
    get_alarm_bar({data: data.stops_alert, title: "Count stops"}),
    get_alarm_bar({data: data.tr_inp_zero_alert, title: "Zero input traffic"}),
    get_alarm_bar({data: data.tr_out_zero_alert, title: "Zero output traffic"})
  ];


  return (
    <div>
      <Header/>
      <Container>
        <Row> {columns_alerts} </Row>
      </Container>
    </div>
  );
};

export default Alerts;
