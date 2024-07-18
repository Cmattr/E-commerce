import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

function NavigationBar() {
    return (
    <nav >
        {/* <Link to="/add-customers">Add Customers</Link>
        <Link to="customers">Customers</Link> */}
      <Navbar  bg='success'  expand='lg'>
        <Navbar.Brand href="/">E-Commerce App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link as={NavLink} to="/" activeclassname="active">
                    Home
                </Nav.Link>
                <Nav.Link as={NavLink} to="/add-customers" activeclassname="active">
                    Add Customer
                </Nav.Link><Nav.Link as={NavLink} to="/customers" activeclassname="active">
                    Customers
                </Nav.Link><Nav.Link as={NavLink} to="/add-products" activeclassname="active">
                    Add Product
                </Nav.Link>
                <Nav.Link as={NavLink} to="/products" activeclassname="active">
                    products
                </Nav.Link>
                <Nav.Link as={NavLink} to="/orders" activeclassname="active">
                    orders
                </Nav.Link>
                <Nav.Link as={NavLink} to="/add-orders" activeclassname="active">
                    Add Orders
                </Nav.Link>
            </Nav>
        </Navbar.Collapse>

      </Navbar>
    </nav>
    )
}

export default NavigationBar;