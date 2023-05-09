import {Navbar, Container, Card, Button, Row, Col} from 'react-bootstrap';
import mainLogo from'../photos/Mantarin_haus_logo.png';
import React from "react"
import './index.css';



const Welcome=()=> {
  
const  onSubmit =(value) =>{
    console.log(value)
      
  }
  
  return (
    
    <div>
    

    <div  className="Auth-form-container" >
     
    <Card style={{ width: '50rem', textAlign: "center" }}>
      <Card.Img variant="top" className="rounded mx-auto d-block" src={mainLogo} style={{width: '25vw',
height: '50vh', }}/ >
      <Card.Body style={{textAlign: "center"}}>
        <Card.Title>Welcome 'Object.name'</Card.Title>
        <Row>
        <Col><img
              alt=""
              src={mainLogo}
              width="100"
              height="100"
            /></Col>
        <Col><img
              alt=""
              src={mainLogo}
              width="100"
              height="100"
            /></Col>
        <Col><img
              alt=""
              src={mainLogo}
              width="100"
              height="100"
            /></Col>
      </Row>

      <Row>
        <Col><Button variant="primary">Go somewhere</Button></Col>
        <Col><Button variant="primary">Go somewhere</Button></Col>
        <Col><Button variant="primary">Go somewhere</Button></Col>
      </Row>
       
      </Card.Body>
    </Card>
    
    </div>
    
    </div>
    
  );
}
export default Welcome;