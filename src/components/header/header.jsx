import React from "react";
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'

function Header(){
    const isLoggedIn = window.localStorage.getItem("username") ? true : false;
    console.log('🚀 ~ file: header.jsx ~ line 6 ~ Header ~ window.localStorage.getItem("username")', window.localStorage.getItem("username"))
    console.log("🚀 ~ file: header.jsx ~ line 6 ~ Header ~ isLoggedIn", isLoggedIn)

    return(
        
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/home">Stock-Trading</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            
                {
                    isLoggedIn ? <LoggedInHeader /> : <LoggedOutHeader />
                }
            
           
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

function LoggedOutHeader(){
    return (
        <>
        <Nav className="me-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
        </Nav>
        </>
    )
}

function LoggedInHeader(){
    return (
        <>
        <Nav className="me-auto">
            <Nav.Link href="/portfolio">Portfolio</Nav.Link>
            <Nav.Link href="/PendingOrders">Pending Orders</Nav.Link>
            <Nav.Link href="/profile">History</Nav.Link>
        </Nav>
            <Nav>
                <NavDropdown title="Profile" id="basic-nav-dropdown">
                    <NavDropdown.Item >{window.localStorage.getItem("username")}</NavDropdown.Item>
                    <NavDropdown.Item href="/manage-cash">Manage Cash</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">View Statement</NavDropdown.Item>
                    <NavDropdown.Divider></NavDropdown.Divider>
                    <NavDropdown.Item href="#action/3.3">Logout</NavDropdown.Item>
                </NavDropdown>
                
            </Nav>
        </>
    )
}

export default Header;