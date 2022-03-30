import React, { useEffect, useState } from "react";
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import { Route , withRouter, useNavigate, useLocation} from 'react-router-dom';
import { getUserRole } from "../../services";

function Header(){
    const [isLoggedIn, setIsLoggedIn] = useState(window.localStorage.getItem("username") ? true : false);
    
    console.log('🚀 ~ file: header.jsx ~ line 6 ~ Header ~ window.localStorage.getItem("username")', window.localStorage.getItem("username"))
    console.log("🚀 ~ file: header.jsx ~ line 6 ~ Header ~ isLoggedIn", isLoggedIn)
    const location = useLocation();
    
    useEffect(()=>{
        setIsLoggedIn(window.localStorage.getItem("username") ? true : false)
        

    },[location.pathname])
    return(
        
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="#/stock-trading/home">Stock-Trading</Navbar.Brand>
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
            <Nav.Link href="#/stock-trading/login">Login</Nav.Link>
            <Nav.Link href="#/stock-trading/register">Register</Nav.Link>
        </Nav>
        </>
    )
}

function LoggedInHeader(){


    function clickedLogout(){
        
        window.localStorage.clear();
        //navigate("/home");
    }
    return (
        <>
        <Nav className="me-auto">
            {window.localStorage.getItem("isAdmin") && <NavDropdown title="Manage" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#/stock-trading/manage-stock">Add Stock</NavDropdown.Item>
                    <NavDropdown.Item href="#/stock-trading/manage-schedule">Manage Schedule</NavDropdown.Item>
            </NavDropdown>}
            <Nav.Link href="#/stock-trading/portfolio">Portfolio</Nav.Link>
            <Nav.Link href="#/stock-trading/pending-orders">Pending Orders</Nav.Link>
            <Nav.Link href="#/stock-trading/transaction-history">History</Nav.Link>
        </Nav>
            <Nav>
                <NavDropdown title="Profile" id="basic-nav-dropdown">
                    <NavDropdown.Item >{window.localStorage.getItem("username")}</NavDropdown.Item>
                    <NavDropdown.Item href="#/stock-trading/manage-cash">Manage Cash</NavDropdown.Item>
                    <NavDropdown.Item href="#/stock-trading/view-statement">View Statement</NavDropdown.Item>
                    <NavDropdown.Divider></NavDropdown.Divider>
                    <NavDropdown.Item href= "#/stock-trading/login" onClick={clickedLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
                
            </Nav>
        </>
    )
}

export default Header;