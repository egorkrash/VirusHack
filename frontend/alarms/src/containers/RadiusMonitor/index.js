import "bootstrap/dist/css/bootstrap.min.css"
import React, {useEffect, useState} from 'react';
import {
  Label, LineChart, Area, Legend, Line, CartesianGrid, XAxis, YAxis, Tooltip, ComposedChart,
} from 'recharts';
import { Col, Container, Row, Alert, Button } from "reactstrap";
// import defaults from "../../config";
import Header from "../../components/Header";
import defaults from "../../config";
import TimeControler from "../../components/TimeControler";


async function fetch_data({set_data, hour, set_fetchDone}) {
  const hour_text = defaults.hour_textHour[hour.hour.toString()] + ":00"
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({date: hour_text})
  };
  set_fetchDone(false);
  fetch('http://localhost:4500/get_real_and_pred_data', requestOptions)
    .then(response => response.json())
    .then(data => {
      let data_ = [];
      for (let i=0; i<data.xticks.length-1; i++) {
        data_.push({
          "xticks": data.xticks[i],
          "start_stop_alige_count_Start_pred": Number((data.start_stop_alige_count_Start_pred[i]).toFixed(2)),
          "start_stop_alige_count_Stop_pred": Number((data.start_stop_alige_count_Stop_pred[i]).toFixed(2)),
          "type__count_Billing-Accounting_pred": Number((data['type__count_Billing-Accounting_pred'][i]).toFixed(2)),
          "type__count_Billing-Authentication_pred": Number((data['type__count_Billing-Authentication_pred'][i]).toFixed(2)),
          "mean_delay_pred": Number((data['mean_delay_pred'][i]).toFixed(2)),
          "mean_input_trafic_pred": Number((data['mean_input_trafic_pred'][i]/1000000).toFixed(2)),
          "mean_output_trafic_pred": Number((data['mean_output_trafic_pred'][i]/1000000).toFixed(2)),
          "count_failed_pred": Number((data['count_failed_pred'][i]).toFixed(2)),
          "start_stop_alige_count_Start": Number((data.start_stop_alige_count_Start[i]).toFixed(2)),
          "start_stop_alige_count_Stop": Number((data.start_stop_alige_count_Stop[i]).toFixed(2)),
          "type__count_Billing-Accounting": Number((data['type__count_Billing-Accounting'][i]).toFixed(2)),
          "type__count_Billing-Authentication": Number((data['type__count_Billing-Authentication'][i]).toFixed(2)),
          "mean_delay": Number((data['mean_delay'][i]).toFixed(2)),
          "mean_input_trafic": Number((data['mean_input_trafic'][i]/1000000).toFixed(2)),
          "mean_output_trafic": Number((data['mean_output_trafic'][i]/1000000).toFixed(2)),
          "count_failed": Number((data['count_failed'][i]).toFixed(2))
        })
      }
      if (data.xticks.length > 0) {
        const i = data.xticks.length - 1;
        data_.push({
          "xticks": data.xticks[i],
          "start_stop_alige_count_Start_pred": Number((data.start_stop_alige_count_Start_pred[i]).toFixed(2)),
          "start_stop_alige_count_Stop_pred": Number((data.start_stop_alige_count_Stop_pred[i]).toFixed(2)),
          "type__count_Billing-Accounting_pred": Number((data['type__count_Billing-Accounting_pred'][i]).toFixed(2)),
          "type__count_Billing-Authentication_pred": Number((data['type__count_Billing-Authentication_pred'][i]).toFixed(2)),
          "mean_delay_pred": Number((data['mean_delay_pred'][i]).toFixed(2)),
          "mean_input_trafic_pred": Number((data['mean_input_trafic_pred'][i]/1000000).toFixed(2)),
          "mean_output_trafic_pred": Number((data['mean_output_trafic_pred'][i]/1000000).toFixed(2)),
          "count_failed_pred": Number((data['count_failed_pred'][i]).toFixed(2))
        })
      }
      set_fetchDone(true);
      set_data({data: data_})
    });
}


function get_graph({data, y_name}) {

  const std = defaults.data_forecasting_error_std[y_name];
  let data_with_confidence_interval = [];
  // alert(JSON.stringify(data.data))
  for (let i=0; i<data.data.length; i++) {
    const values = data.data[i];
    const pred = values[y_name + "_pred"];
    data_with_confidence_interval.push(
      {...values, xticks: values.xticks.slice(5, 16), confidence_interval: [pred - std, pred + std]}
    )
  }
  // alert(JSON.stringify(data_with_confidence_interval))
  return (
    <div >
      <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
        <p> {defaults.data_forecasting_title[y_name]} </p>
      </Row>
      <Row>
        <ComposedChart
          width={500}
          height={200}
          data={data_with_confidence_interval}
          syncId="anyId"
          margin={{
            top: 10, right: 30, left: 20, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="xticks" />
          <YAxis />
          <Tooltip />
          <Area dataKey="confidence_interval" stroke="#ffeede" fill="#ffeede" dot={false} />
          <Line type="monotone" dataKey={y_name} stroke="#8884d8" fill="#8884d8" />
          <Line type="monotone" dataKey={y_name + '_pred'} stroke="#ff7b00" fill="#ff7b00" />
        </ComposedChart>
      </Row>
    </div>
  )
}


function RadiusMonitor() {
  const [data, set_data] = useState({data: defaults.data_forecasting});
  const [hour, set_hour] = useState({hour: 23});
  const [fetchDone, set_fetchDone] = useState(true)

  useEffect(() => {
    fetch_data({set_data, hour, fetchDone, set_fetchDone}).then();
  },   [hour]);

  const graph_names = [
    "start_stop_alige_count_Start",
    "start_stop_alige_count_Stop",
    "type__count_Billing-Accounting",
    "type__count_Billing-Authentication",
    "mean_delay",
    "mean_input_trafic",
    "mean_output_trafic",
    "count_failed"
  ];

  let graphs = []
  for (let graph_name of graph_names) {
    graphs.push(get_graph({data: data, y_name: graph_name}))
  }

  return (
    <div>
      <Header />
      <Container>
        <Row style={{marginBottom: 5}}>
          <Col sm={{ size: 4, order: 1, offset: 8 }}>
            <TimeControler hour={hour} set_hour={set_hour} fetchDone={fetchDone} />
          </Col>
        </Row>
        <Row style={{marginBottom: 5}}>
          <Col> {graphs[0]} </Col>
          <Col> {graphs[1]} </Col>
        </Row>
        <Row style={{marginBottom: 5}}>
          <Col> {graphs[2]} </Col>
          <Col> {graphs[3]} </Col>
        </Row>
        <Row style={{marginBottom: 5}}>
          <Col> {graphs[4]} </Col>
          <Col> {graphs[7]} </Col>
        </Row>
        <Row style={{marginBottom: 5}}>
          <Col> {graphs[5]} </Col>
          <Col> {graphs[6]} </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RadiusMonitor;
