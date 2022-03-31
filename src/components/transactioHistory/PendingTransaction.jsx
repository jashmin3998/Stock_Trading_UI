import React, { useState ,useEffect} from "react";
import ReactDOM from "react-dom";
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm
} from "react-crud-table";

// Component's Base CSS
import "../../crudTable.css";
import { getPendingOrders, removeLimitOrder } from "../../services";
import { roundToTwoDigits } from '../../util';

function PendingTransaction(){
  
const [transactions, setTransactions] = useState([]);

//let transactions = []
useEffect(() => {
  const fetchData = async () =>{
      const res = await getPendingOrders(
        // username: window.localStorage.getItem("username")
        { params: { username: window.localStorage.getItem("username") } }
      );
      var jsonData = res.data;

      var allData = []
        for (var i = 0; i < jsonData.length; i++) {
            var counter = {
                            "orderTime": String(new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(jsonData[i].transactionTime)),
                            "stockSymbol": jsonData[i]?.stock?.stockSymbol,
                            "quantity": String(jsonData[i]?.quantity),
                            "rate": '$'+String(roundToTwoDigits(jsonData[i]?.rate)),
                            "totalAmount": String(roundToTwoDigits(jsonData[i]?.totalAmount)),
                            "orderType": jsonData[i]?.transactionType === 0 ? "Buy" : "Sell",
                            "orderId" : jsonData[i]?.orderId
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
    result = result.reverse(getSorter(payload.sort));
    //console.log(result);
    return Promise.resolve(result);
  },
  delete: (data) => {
    const order = transactions.find((t) => t.orderId === data.orderId);
    
    const deleteLimitOrder = async (order)=>{
      try{
          const res = await removeLimitOrder(
            { params: { orderId: parseInt(order.orderId) } }
          )      
      }
      catch{

      }
    }
    deleteLimitOrder(order);
    window.location.reload()
    //transactions = transactions.filter((t) => t.orderId !== order.orderId);
    
  }  
};

const styles = {
  container: { margin: "auto", width: "fit-content" }
};

const Example = () => (
  <div style={styles.container}>
    <CRUDTable
      caption="Pending Orders"
      fetchItems={(payload) => service.fetchItems(payload)}
      
    >
      <Fields>
        {/* <Field name="id" label="Id" hideInCreateForm   /> */}
        <Field name="orderTime" label="Order Time" placeholder="orderTime"  />
        <Field name="stockSymbol" label="Stock" placeholder="Stock"  />
        <Field name="quantity" label="Quantity" placeholder="quanytity"  />
        <Field name="rate" label="Rate" placeholder="rate"  />
        {/* <Field name="totalAmount" label="Amount" placeholder="amount"  /> */}
        <Field name="orderType" label="Order Type" placeholder="orderType"  />
      </Fields>
      <DeleteForm
        title="Delete Process"
        message="Are you sure you want to delete the order?"
        trigger="Delete"
        onSubmit={order => service.delete(order)}
        submitText="Delete"
        // validate={(values) => {
        //   // const errors = {};
          
        //   // return errors;
        // }}
      />
      
    </CRUDTable>
  </div>
);
Example.propTypes = {};
return(
  <Example/>
)

}


export default PendingTransaction;