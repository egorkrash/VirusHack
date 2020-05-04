import React, {Component} from 'react';
import { Spinner, Col, Row } from "reactstrap";
import defaults from "../../config";
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'


const TimeControler = ({hour, set_hour, fetchDone}) => {

  const handleChange = (value) => {
    set_hour({hour: value});
  };

  const text_hour = defaults.hour_textHour[hour.hour.toString()]

  return (
    <div>
      <Row>
        <Col>
          <br/>
          {
            !fetchDone
            ? (<Spinner  style={{float: "right"}} color="success" />)
            : ''
          }
        </Col>
        <Col style={{width: "100%"}}>
          <Slider
            min={0}
            max={24}
            value={hour.hour}
            onChange={(value) => handleChange(value)}
          />
          <span style={{float: "right"}}>
            {text_hour}
          </span>
        </Col>
      </Row>
    </div>
  )
};

// class TimeControler extends Component {
//   constructor(props, context) {
//     super(props, context)
//     this.state = {
//       volume: 0
//     }
//   }
//
//   handleOnChange = (value) => {
//     this.setState({
//       volume: value
//     })
//   }
//
//   render() {
//     let { volume } = this.state
//     return (
//       <Slider
//         value={volume}
//         orientation="vertical"
//         onChange={this.handleOnChange}
//       />
//     )
//   }
// }


export default TimeControler;
