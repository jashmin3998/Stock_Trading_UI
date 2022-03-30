import React, { useState ,useEffect} from "react";
import ReactDOM from "react-dom";
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm
} from "react-crud-table";
import {BsPlusSquareFill} from 'react-icons/bs';

// Component's Base CSS
import "../../crudTable.css";
import { getStocksTransactions } from "../../services";

function TransactionHistory(){
  
 const [transactions, setTransactions] = useState([]);

//let transactions = []
useEffect(() => {
  const fetchData = async () =>{
      const res = await getStocksTransactions(
        // username: window.localStorage.getItem("username")
        { params: { username: window.localStorage.getItem("username") } }
      );
      var jsonData = res.data;

      var allData = []
        for (var i = 0; i < jsonData.length; i++) {
            var counter = {
                            "transactionTime": String(new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(jsonData[i].transactionTime)),
                            "stockSymbol": jsonData[i].stock.stockSymbol,
                            "quantity": String(jsonData[i].quantity),
                            "purchasedRate": String(jsonData[i].purchasedRate),
                            "totalAmount": (jsonData[i].transactionType === 1 ? "-" : "+") + String(jsonData[i].totalAmount)
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
      caption="Transaction History"
      fetchItems={(payload) => service.fetchItems(payload)}  
    >
      
      <Fields>
        {/* <Field name="id" label="Id" hideInCreateForm   /> */}
        <Field name="transactionTime" label="Date" placeholder="date"  />
        <Field name="stockSymbol" label="Stock" placeholder="Stock"  />
        <Field name="quantity" label="Quantity" placeholder="quanytity"  />
        <Field name="purchasedRate" label="Rate" placeholder="rate"  />
        <Field name="totalAmount" label="Amount" placeholder="amount" />
        
      </Fields>
      
    </CRUDTable>
    
  </div>
);
Example.propTypes = {};
return(
  <Example/>
)

}


export default TransactionHistory;