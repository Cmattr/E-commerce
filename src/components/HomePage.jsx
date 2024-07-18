import React from 'react';
import { Button, Image, Container, Row, Col, Card } from 'react-bootstrap'; 
import HomePagePhoto from './HomePagePhoto.webp'; 

function Homepage() {
    
    const imgHeight = {
        height: '300px' 
    };

    return (
        <div className="home-body bg-primary text-white jusitify-content-center ">
            <Container fluid>
                <Row>
                    <Col xs={6} md={4}>
                        <Image src={HomePagePhoto} fluid style={imgHeight} />
                    </Col>
                </Row>
            </Container>
            <div>
                <h1>Welcome to E-Com</h1>
                <p>The world leaders in everything you're looking for!</p>
                <Card style={{ width: '18rem' }}>
                    
                        <Card.Body>
                            <Card.Title>Welcome to the E-Commerce Application</Card.Title>
                                <Card.Text>
          Here you can find anything you're looking for. Feel free to browse our inventory or select an option
          from our menu ath the top of the page.
        </Card.Text>
        <Button className='button' variant="success" href="http://localhost:5173/products">Shop Now</Button>{' '} 
      </Card.Body>
    </Card>
            </div>
        </div>
    );
}

export default Homepage;