import React, { useState,useEffect } from "react";
import {Modal, Button, DropdownButton, Dropdown} from 'react-bootstrap';
import { placeLimitOrder, placeMarketOrder } from "../../services";
import {roundToTwoDigits} from '../../util';
import {BsCaretUpFill,BsCaretDownFill} from 'react-icons/bs';


function StockDtl({selectedStock}){

    const [data, setData] = useState([])

    return(
        <div>
            <div className="page-header">
            <div className="page-header">
                <div className="row" style={{fontSize : '2rem'}}>
                    <div className="col-2">{selectedStock?.name}</div>
                        <div className="col-10" >
                        <div style={selectedStock?.stockPrice?.price > selectedStock?.stockPrice?.preClose? {color:"green", textAlign: "end"} : {color:"red", textAlign: "end"}}>${roundToTwoDigits(selectedStock?.stockPrice?.price)}
                        { selectedStock?.stockPrice?.price > selectedStock?.stockPrice?.preClose? <BsCaretUpFill/>: <BsCaretDownFill/>} 
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">({selectedStock?.stockSymbol})</div>
                </div>
            </div>
            <br/>
            <br/>
            <h3 className="display-8">Statistics</h3>
            <div>
                <table class="table table-borderless">
                    <tbody>
                        <tr>
                            <th>Open</th>
                            <th>Pre. Close</th>
                            <th>Volume</th>
                            <th>Market Capitalization</th>
                            <th>Today's Low</th>
                            <th>Today's High</th>
                        </tr>
                        <tr>
                            <td>${roundToTwoDigits(selectedStock?.stockPrice?.todayLow)}</td>
                            <td>${roundToTwoDigits(selectedStock?.stockPrice?.preClose)}</td> 
                            <td>${roundToTwoDigits(selectedStock?.purchasedQuantity * selectedStock?.stockPrice?.price)}</td>
                            <td>${roundToTwoDigits(selectedStock?.totalQuantity * selectedStock?.stockPrice?.price)}</td> 
                            <td>${roundToTwoDigits(selectedStock.stockPrice?.todayLow)}</td>
                            <td>${roundToTwoDigits(selectedStock.stockPrice?.todayHigh)}</td> 
                        
                        </tr>
                
                       
                    </tbody>
                </table>
            </div>
            

        </div>
        <FooterOption props = {selectedStock}></FooterOption>
        </div>

    )
    
}

function FooterOption(selectedStock){

    const [show, setShow] = useState(false);
    const [isBuy, setIsBuy] = useState(0);

    function clickedBuyOption(){
        setShow(true);
        setIsBuy(0);
    }
    function clickedSellOption(){
        setShow(true);
        setIsBuy(1);
    }

    return(
        <div className="row  my-5" style={{justifyContent: "space-evenly"}}>

            <button className="col-2 btn btn-success mr-2" onClick={clickedBuyOption}>Buy</button>
            <button className="col-2 btn btn-primary ml-2" onClick={clickedSellOption}>Sell</button>
            {show && <TrasactionForm
                show={show}
                setShow={setShow}
                selectedStock={selectedStock}
                isBuy = {isBuy}
            />}
        </div>
    )
}

function TrasactionForm({
    show,
    setShow,
    selectedStock,
    isBuy
})
{


  const[price, setPrice] = useState(roundToTwoDigits(selectedStock?.props?.stockPrice?.price)); 
  const[quantity, setQuantity] =useState(0);
  const[isLimit, setIsLimit] = useState(false) 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error, setError] = useState("")
  const [msg, setMsg] = useState("")


  async function handlePlaceOrder(){

    if(quantity < 1){
        setError("! Incorrect Quantity")
        return;
    }
    var marketOrder = {
        "quantity" : parseInt(quantity),
        "transactionType" : isBuy,
        "rate" : price,
        "user":{
            "username": window.localStorage.getItem("username")
        },
        "stock":{
            "stockSymbol": selectedStock?.props?.stockSymbol
        }
    }

    try{
        var res
        if(isLimit){
            res = await placeLimitOrder(marketOrder)
        }
        else{
            res = await placeMarketOrder(marketOrder)
        }
        
        if(res.data.success){
            setError("")
            setMsg("Order Successfully")

        }
        else{
            setMsg("")
            setError(res?.data?.error)
        }
    }
    catch{
        if(error?.response?.data?.error){
            console.log(error.response.data.error)
            setError(error.response.data.error)
        }
    }



  }

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Title className="mx-auto">{selectedStock?.props?.stockSymbol}</Modal.Title>
            <div className="d-flex flex-column align-items-left ml-3" style={{marginLeft : "20px"}}>
                <div className='my-2'>
                        Quantity: <input type="number" name="name" onChange={(e)=>{
                            setQuantity(e.target.value);
                        }}/>
                </div>
            
            <DropdownButton id="dropdown-basic-button" className="my-2" title={isLimit? 'Limit Order' : 'Market Order'}>
                <Dropdown.Item onClick={()=>{
                    setIsLimit(false)
                    setPrice(selectedStock?.props?.stockPrice?.price)
                }}>Market Order</Dropdown.Item>
                <Dropdown.Item onClick={()=>{
                    setIsLimit(true)
                    
                }}>Limit Order</Dropdown.Item>
            </DropdownButton>
            
            
                <div className='my-2'>
                        Price: <input type="number" name="price" disabled = {!isLimit} value = {price} onChange = {(e)=> {
                            setPrice(e.target.value)
                        }}/>
                </div>
            </div>
            {msg&&<div className='text-success my-3' style={{textAlign : "center"}}> {msg} </div>}
            {error&&<div className='text-danger my-3'  style={{textAlign : "center"}}> {error} </div>}
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="primary" onClick={handlePlaceOrder}>
                Place Order
            </Button>
            </Modal.Footer>
      </Modal>
    )
}


export default StockDtl;

