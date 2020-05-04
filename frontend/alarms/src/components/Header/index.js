import React from 'react';
import { Navbar, NavbarBrand, Button, Col } from "reactstrap";
import defaults from "../../config";


const Header = () => {
  return (
    <div>
      <Navbar style={{backgroundColor: '#EFEFEF'}}>
        <Col>
          <NavbarBrand>
            <b>Pegasus</b>
          </NavbarBrand>

        </Col>
        <Col>
          <Button href="/" color="info" style={{width: "60%"}} >Alerts</Button>
        </Col>
        <Col>
          <Button href="/snmp" color="info" style={{width: "60%"}}>Snmp Monitor</Button>
        </Col>
        <Col>
          <Button href="/radius"  color="info" style={{width: "60%"}}>Radius Monitor</Button>
        </Col>
        <Col>
          <span style={{float: "right"}} >
            {defaults.userName[0]}<br/>{defaults.userName[1]}
          </span>
        </Col>
      </Navbar>
    </div>
  );
}


export default Header;
