import React, { useState ,useEffect} from "react";
import ReactDOM from "react-dom";
import {Modal, Button} from 'react-bootstrap';
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm
} from "react-crud-table";
import { addCashFund, getStatement, getCashBalance } from "../../services";
import { roundToTwoDigits } from '../../util';

export function ManageCash(){

  const [transactions, setTransactions] = useState([]);
  const [cashBalance, setCashBalance] = useState(0);
  const [investedAmount, setInvestedAmount] = useState(0);

  //let transactions = []
  useEffect(() => {
    const fetchData = async () =>{
      var res
      var balance
      
      try{
        balance = await getCashBalance(
          { params: { username: window.localStorage.getItem("username") } }
        );
        setCashBalance(balance.data)
        res = await getStatement(
          { params: { username: window.localStorage.getItem("username") } }
        );
        }
      catch(error){
        console.log(error.response.data.error)
      }
        var jsonData = res.data;
  
        var allData = []
          for (var i = 0; i < jsonData.length; i++) {

              var transactionType = "Deposit"
              if(jsonData[i].transactionType === 1){
                transactionType = "Withdraw"
              }
              var counter = {
                              "transactionId" : String(jsonData[i].ctId),
                              "transactionTime": String(new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(jsonData[i].transactionTime)),
                              "amount": (jsonData[i].transactionType === 1 ? "-" : "+") + String(roundToTwoDigits(jsonData[i].amount)),
                              "type": transactionType,
                              "buyingPower": String(roundToTwoDigits(jsonData[i].user.cashBalance)),
                              "investedAmount" : String(roundToTwoDigits(jsonData[i].user.usedCash))
                            }
              allData.push(counter)
          }
          // setCashBalance(res.data[0].user.cashBalance)
          // setBuyingPower(res.data[0].user?.cashBalance - res.data[0]?.user?.usedCash)
          
          setTransactions(allData)
        
    }
    fetchData();
  }, []);
  
  
  const SORTERS = {
    NUMBER_ASCENDING: (mapper) => (a, b) => mapper(a) - mapper(b),
    NUMBER_DESCENDING: (mapper) => (a, b) => mapper(b) - mapper(a),
    STRING_ASCENDING: (mapper) => (a, b) => mapper(a).localeCompare(mapper(b)),
    STRING_DESCENDING: (mapper) => (a, b) => mapper(b).localeCompare(mapper(a))
  };
  
  const getSorter = (data) => {
    const mapper = (x) => x[data.field];
    let sorter = SORTERS.STRING_ASCENDING(mapper);
  
    if (data.field === "id") {
      sorter =
        data.direction === "ascending"
          ? SORTERS.NUMBER_ASCENDING(mapper)
          : SORTERS.NUMBER_DESCENDING(mapper);
    } else {
      sorter =
        data.direction === "ascending"
          ? SORTERS.STRING_ASCENDING(mapper)
          : SORTERS.STRING_DESCENDING(mapper);
    }
  
    return sorter;
  };
  
  let count = transactions.length;
  const service = {
    fetchItems: (payload) => {
      let result = Array.from(transactions);
      result = result.reverse(getSorter(payload.sort));
      //console.log(result);
      return Promise.resolve(result);
    }  
  };
  
  const styles = {
    container: { margin: "auto", width: "fit-content" }
  };
  
  const Example = () => (
    <div style={styles.container}>
      <CRUDTable
        caption="Statement"
        fetchItems={(payload) => service.fetchItems(payload)}
        
      >
        <Fields>
          {/* <Field name="id" label="Id" hideInCreateForm   /> */}
          <Field name="transactionId" label="Transaction Id" placeholder="transactionId" />
          <Field name="transactionTime" label="Date" placeholder="date"  />
          <Field name="amount" label="Amount" placeholder="amount"  />
          <Field name="type" label="Transaction Type" placeholder="type"  />
        </Fields>
        
      </CRUDTable>
    </div>
  );
  Example.propTypes = {};
  return(
    <div>
      <div className="d-flex justify-content-center">
          <h4> Cash Balance: ${roundToTwoDigits(cashBalance)} </h4>
      </div>
      <Example/>
    </div>
  )
}

const CashInfo = () => {

  const [show, setShow] = useState(false);
  const [isDeposit, setIsDeposite] = useState()

    function MakePayment(){
        setShow(true);
    }

  

  return (
    <>
      
      <div className="row my-4" style={{justifyContent: "space-evenly"}} >
        <button className="col-1 btn btn-success mr-2 " onClick={()=>{
          setIsDeposite(0)
          setShow(true)
        }}>Add Funds</button>
        <button className="col-1 btn btn-primary ml-2" onClick={()=>{
          setIsDeposite(1)
          setShow(true)
        }}>Withdraw</button>
      </div>
      {show && <CashTransaction
                show={show}
                setShow={setShow}
                isDeposit = {isDeposit}
            />}
      <ManageCash />
    </>
  )
}


function CashTransaction({
  show,
  setShow,
  isDeposit
})
{
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error, setError] = useState("")
  const [amount, setAmount] = useState();

  async function handleCashTransaction(){

    try{ 
        var reqBody = {
          "amount" : amount,
          "transactionType" : isDeposit,
          "user":{
            "username" : window.localStorage.getItem("username")
          }  
        }
  
        const res = await addCashFund(reqBody)
        if(res.data.success){
          setShow(false)
          window.location.reload();
        }
        else{
          setError("Transaction Failed : Unsufficient Balance");
        }
    }
    catch (error) {
      console.log(error)
      if(error?.response?.data?.error){
          console.log(error.response.data.error)
      }
    }
  }

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isDeposit === 0? "Deposite" : "Cash Out"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className='Login d-flex flex-column align-items-center'>
                <div className='row'>
                    Amount:  <input type="number" name="amount" value={amount} onChange = {(e) =>{setAmount(e.target.value)}} />
                </div>
            </div>
            
            {error&&<div className='text-danger d-flex justify-content-center'> {error} </div>}
            </Modal.Body>
            
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cancle
            </Button>
            <Button variant="primary" onClick={handleCashTransaction}>
                {isDeposit === 0? "Add Funds" : "Withdraw Funds"}
            </Button>
            </Modal.Footer>
      </Modal>
    )
}


export default CashInfo;
