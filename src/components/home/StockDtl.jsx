import React, { useState,useEffect } from "react";
import {Modal, Button} from 'react-bootstrap';
import {roundToTwoDigits} from '../../util';

function StockDtl({selectedStock}){

    const [data, setData] = useState([])

    return(
        <div>
            <div className="page-header">
            <div className="page-header">
                <div className="row">
                    <div className="col-2">{selectedStock?.name}</div>
                        <div className="col-10">
                        <div style={{textAlign: "end"}}>{selectedStock?.price}$</div>
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
                            <td>{selectedStock.stockPrice.todayLow}$</td>
                            <td>{selectedStock.stockPrice.preClose}$</td> 
                            <td>{selectedStock.purchasedQuantity}</td>
                            <td>{roundToTwoDigits(selectedStock.totalQuantity * selectedStock.stockPrice.price)}</td> 
                            <td>{selectedStock.stockPrice.todayLow}$</td>
                            <td>{selectedStock.stockPrice.todayHigh}$</td> 
                        
                        </tr>
                
                       
                    </tbody>
                </table>
            </div>
            

        </div>
        <FooterOption></FooterOption>
        </div>

    )
    
}

function FooterOption(data){

    const [show, setShow] = useState(false);

    function clickedBuyOption(){
        setShow(true);

    }

    return(
        <div className="row justify-content-center my-2">

            <button className="col-2 btn btn-success mr-2" onClick={clickedBuyOption}>Buy</button>
            <button className="col-2 btn btn-danger ml-2">Sell</button>
            {show && <TrasactionForm
                show={show}
                setShow={setShow}
            />}
        </div>
    )
}

function TrasactionForm({
    show,
    setShow
})

{

  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Buy Sell</Modal.Title>
            </Modal.Header>
            <Modal.Body>Buy/Sell Form</Modal.Body>
            
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cancle
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Place
            </Button>
            </Modal.Footer>
      </Modal>
    )
}


export default StockDtl;

