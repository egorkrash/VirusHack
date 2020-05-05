import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { Formik } from "formik";
import { Col, Container, Row, Button, Table } from "reactstrap";
import defaults from "../../config";
import Header from "../../components/Header";


const AlertDetail = () => {
  const userlogin = new URLSearchParams(useLocation().search).get('userlogin');

  const userlogin_history = defaults.detail_alert_example;
  const [messages, set_messages] = useState({messages: []})

  const MessageForm = (
    <div>
      <Formik
        initialValues={{ text: '' }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            const new_messages = Object.assign([], messages);
            new_messages.push(values.message);
            set_messages({messages: new_messages})
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <input
              style={{width: "800px", height: "60px"}}
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.text}
              name="text"
            />
            {props.errors.name && <div id="feedback">{props.errors.name}</div>}
            <button style={{margin: 10}} type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  )


  let table_rows = [];
  for (let row of userlogin_history.reverse()) {
    table_rows.push(
      <tr>
        <th scope="row">{row[0]}</th>
        <td>{row[1]}</td><td>{row[2]}</td><td>{userlogin}</td><td>{row[4]}</td><td>{row[5]}</td>
        <td>{row[6]}</td><td>{row[7]}</td><td>{row[8]}</td><td>{row[9]}</td><td>{row[10]}</td>
      </tr>
    )
  }
  const table = (
    <Table striped bordered size={"sm"}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Billing</th>
          <th>Directions</th>
          <th>Login</th>
          <th>IP</th>
          <th>MAC</th>
          <th>Accounting</th>
          <th>Failed</th>
          <th>Delay</th>
          <th>Input Traffic</th>
          <th>Output Traffic</th>
        </tr>
      </thead>
      <tbody>
        {table_rows}
      </tbody>
    </Table>
  )

  return (
    <div>
      <Header/>
      <Container>
        <Row>
          <Col style={{marginBottom: 20}}>
            <Row>
              <b> Введите информацию о проделанной работе </b>
            </Row>
            <Row>
              {MessageForm}
            </Row>
          </Col>
        </Row>
        <b> Логи </b>
        <Row>
          {table}
        </Row>
      </Container>
     </div>
  );
};

export default AlertDetail;
