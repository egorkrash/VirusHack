import React from 'react';
import {Container} from "reactstrap";
import Header from "../../components/Header";


const NotFoundPage = () => {
  return (
    <Container fluid={true}>
      <Header />
      <div>
        Page Not Found
      </div>
    </Container>
  );
};


export default NotFoundPage;
