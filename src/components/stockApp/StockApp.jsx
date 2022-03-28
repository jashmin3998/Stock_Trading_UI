import React from "react";
import { Component } from "react";
import Login from "../login/Login";
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "../home/home";
import withNavigation from "../WithNavigation";
import Register from "../register/Register";
import AddStock from "../stocks/addStock";
import ScheduleMarket from "../schedule/schedule";
import StockDtl from "../home/StockDtl";
import TransactionHistory from "../transactioHistory/TransactionHistory";
import {ManageCash} from "../profile/ManageCash";
import PendingTransaction from "../transactioHistory/PendingTransaction";
import Portfolio from "../transactioHistory/Portfolio";


function StockApp(){
    
        //const LoginComponentWithNavigation = withNavigation(Login);
        return(
            <div className="StockApp">
                <Router basename="/stock-trading">
                    <Routes>
                        <Route path="/login" element={<Login />}/>
                        <Route path="/home" element={<Home />}/>
                        <Route path="/register" element={<Register />}/>
                        <Route path="/stocks/add" element={<AddStock />}/>
                        <Route path="/stocksDetail" element ={<StockDtl/>}/>
                        <Route path="/schedule" element ={<ScheduleMarket/>}/>
                        <Route path="/transaction-history" element ={<TransactionHistory/>}/>
                        <Route path="/manage-cash" element={<ManageCash/>} />
                        <Route path="/pending-orders" element={<PendingTransaction />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="*" element={<ErrorComponent />} />
                    </Routes>
                </Router>
                
            </div>
        )
    
}

function ErrorComponent(){
    return(
        <div>Opps Somthing is wrong. [Incorrect Url]</div>
    )
}

export default StockApp;
