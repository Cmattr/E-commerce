import { Link, NavLink } from "react-router-dom";
import { Button, Image, Container, Row, Col, Nav } from 'react-bootstrap'; 
import LostPhoto from './LostPhoto.jpg'

function NotFound() {

    const imgHeight = {
    height: '300px'
    };

    return (
        <body className="flex-column bg-info text-white"  >
            <Image src={LostPhoto} fluid style={imgHeight} />
            <div>
                <Container>
                    <Row>
                        <Col>
                            <h2>404 Not Found</h2>
                            <p>Looks like theres nothing here.</p>
                            <Nav.Link as={NavLink} to="/" activeclassname="active">
                                Go Home
                            </Nav.Link>
                        
                        </Col>
                    </Row>
                </Container>
            </div>
        </body>
    )
}
export default NotFound