import "bootstrap/dist/css/bootstrap.min.css"
import React, {useState} from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Col, Container } from "reactstrap";
// import defaults from "../../config";
import Header from "../../components/Header";



function get_graph({state, y_name}) {
  const { data } = state;
  return (
    <LineChart
      width={800}
      height={200}
      data={data}
      syncId="anyId"
      margin={{
        top: 10, right: 30, left: 0, bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="xtick" />
      <YAxis />
      <Tooltip />
      <Line
        dot={false}
        type="monotone"
        dataKey={y_name}
        stroke="#8884d8"
        fill="#8884d8"
      />
    </LineChart>
  )
}


function SnmpMonitor() {
  const [state, set_state] = useState({data: []});

  if (state.data.length === 0) {
    fetch('http://localhost:4500/get_snmp_data', {method: 'GET'})
      .then(response => response.json())
      .then(data => {
        const { xticks, temp, mem, cpu } = data;
        let data_ = [];
        for (let i=0; i<xticks.length; i++) {
          data_.push({
            xtick: xticks[i],
            temp: Number((temp[i]).toFixed(2)),
            mem: Number((mem[i]).toFixed(2)),
            cpu: Number((cpu[i]).toFixed(2))
          })
        }
        set_state({...state, data: data_})
        // return data
      });
  }

  const graph_temp = get_graph({state: state, y_name: 'temp'});
  const graph_mem = get_graph({state: state, y_name: 'mem'});
  const graph_cpu = get_graph({state: state, y_name: 'cpu'});

  return (
    <div>
      <Header />
      <Container>
        <Col>
          {graph_temp}
        </Col>
        <Col>
          {graph_mem}
        </Col>
        <Col>
          {graph_cpu}
        </Col>
      </Container>
    </div>
  );
}

export default SnmpMonitor;
