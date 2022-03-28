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
import { addCashFund, getStatement } from "../../services";

export function ManageCash(){

  const [transactions, setTransactions] = useState([]);

  //let transactions = []
  useEffect(() => {
    const fetchData = async () =>{
        const res = await getStatement(
          // username: window.localStorage.getItem("username")
          { params: { username: window.localStorage.getItem("username") } }
        );
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
                              "amount": String(jsonData[i].amount),
                              "type": transactionType,
                              "buyingPower": String(jsonData[i].user.cashBalance),
                              "investedAmount" : String(jsonData[i].user.usedCash)
                            }
              allData.push(counter)
          }
  
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
      result = result.sort(getSorter(payload.sort));
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
        caption="Cash Balance Statement"
        fetchItems={(payload) => service.fetchItems(payload)}
        
      >
        <Fields>
          {/* <Field name="id" label="Id" hideInCreateForm   /> */}
          <Field name="transactionId" label="Transaction Id" placeholder="transactionId"  />
          <Field name="transactionTime" label="Date" placeholder="date"  />
          <Field name="amount" label="Amount" placeholder="amount"  />
          <Field name="type" label="Transaction Type" placeholder="type"  />
        </Fields>
        
      </CRUDTable>
    </div>
  );
  Example.propTypes = {};
  return(
    <Example/>
  )
}

const CashInfo = () => {

  const [show, setShow] = useState(false);

    function MakePayment(){
        setShow(true);
    }

  

  return (
    <>
      <div className="row justify-content-center my-2">
        Balance: $2000
      </div>
      <div className="row justify-content-center my-2">
        <button className="col-1 btn btn-success mr-2" onClick={MakePayment}>Add Funds</button>
        <button className="col-1 btn btn-danger ml-2">Withdraw</button>
      </div>
      {show && <CashTransaction
                show={show}
                setShow={setShow}
            />}
      <ManageCash />
    </>
  )
}


function CashTransaction({
  show,
  setShow
})
{
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  

  const [amount, setAmount] = useState();
    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Buy Sell</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className='Login d-flex flex-column align-items-center'>
                <div className='row'>
                    Amount:  <input type="number" name="username" value={amount} onChange = {() =>{setAmount(amount);}} />
                </div>
            </div>
                
            </Modal.Body>
            
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cancle
            </Button>
            <Button variant="primary" onClick={handleAddCashTransaction(amount)}>
                Add Funds
            </Button>
            </Modal.Footer>
      </Modal>
    )
}

async function handleAddCashTransaction(amount){

  try{ 
      var user = {
        "username" : window.localStorage.getItem("username")
      }
      var transaction_type = 0;

      const res = await addCashFund(
        amount,
        transaction_type,
        user
      )
  }
  catch (error) {
    console.log(error)
    if(error?.response?.data?.error){
        console.log(error.response.data.error)
    }
  }
}
export default CashInfo;



// const MakePayment =() => {

//   const [amount, setAmount] = useState();

//   async function addFund(event){

//     try{
      
//         setAmount(event.target.value);
//         var user = {
//           "username" : window.localStorage.getItem("username")
//         }
//         var transaction_type = 0;

//         const res = await addCashFund(
//           amount,
//           transaction_type,
//           user
//         )
//     }
//     catch (error) {
//       console.log(error)
//       if(error?.response?.data?.error){
//           console.log(error.response.data.error)
//       }
//   }
//     // if(res.data.success){
//     //   return (
//     //     <div class="modal">
//     //         <div class="modal_content">
//     //             <span class="close">&times;</span>
//     //             <p>I'm A Pop Up!!!</p>
//     //         </div>
//     //     </div>
//     //   )
//     // }
//   }

//   return(
//     <div className='Login d-flex flex-column align-items-center'>
    
//     <div className='row col-2 mt-2'>
//         Enter Amount: 
//     </div>

//     <button className="btn btn-success my-2" onClick={addFund} value={addFund}>Make Payment</button>

// </div>
//   )


// }