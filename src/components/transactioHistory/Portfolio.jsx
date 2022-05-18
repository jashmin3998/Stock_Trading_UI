import React, { useState ,useEffect} from "react";
import ReactDOM from "react-dom";
import CRUDTable, {
  Fields,
  Field,
} from "react-crud-table";
import { roundToTwoDigits } from '../../util';

// Component's Base CSS
import "../../crudTable.css";
import { getPortfolio, getStocksTransactions } from "../../services";

function Portfolio(){
  
const [transactions, setTransactions] = useState([]);
const [totalPandL, setTotalPandL] = useState();
const [totalInvested, setTotalInvested] = useState();
const [currentValuation, setCurrentValuation] = useState();

//let transactions = []
useEffect(() => {
  const fetchData = async () =>{
      const res = await getPortfolio(
        // username: window.localStorage.getItem("username")
        { params: { username: window.localStorage.getItem("username") } }
      );
      var jsonData = res.data;
      var totalProfit = 0;
      var totalAmountInvested = 0;
      var totalCurrentValue = 0;
      
      var allData = []
        for (var i = 0; i < jsonData.length; i++) {
           if(jsonData[i][1] > 0){

            
            totalAmountInvested = totalAmountInvested + jsonData[i][2];
            totalCurrentValue = totalCurrentValue + (jsonData[i][3]*jsonData[i][1]);
            totalProfit = totalProfit + (jsonData[i][3]*jsonData[i][1]) - jsonData[i][2];
            //totalProfit = totalProfit + (jsonData[i][3]*jsonData[i][1]) - jsonData[i][2]
            var counter = {
              "stockSymbol": jsonData[i][0],
              "quantity": String(jsonData[i][1]),
              "investedAmount":'$' + String(roundToTwoDigits(jsonData[i][2])),
              "currentValue": '$' + String(roundToTwoDigits(jsonData[i][3]*jsonData[i][1]))
            }
            allData.push(counter)

           }
        }
        setTotalPandL(totalProfit)
        setTotalInvested(totalAmountInvested)
        setCurrentValuation(totalCurrentValue)
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
    console.log(result);
    return Promise.resolve(result);
  }  
};

const styles = {
  container: { margin: "auto", width: "fit-content" }
};

const Example = () => (
  <div style={styles.container}>
    <div style={{fontSize : '1.5rem'}}> Total P&L: ${roundToTwoDigits(totalPandL)}</div>
    <CRUDTable
      caption="Portfolio"
      fetchItems={(payload) => service.fetchItems(payload)}
      
    >
      <Fields>
        <Field name="stockSymbol" label="Stock" placeholder="Stock"  />
        <Field name="quantity" label="Quantity" placeholder="quanytity"  />
        <Field name="investedAmount" label="Invested Amount" placeholder="investedAmount"  />
        <Field name="currentValue" label="Current Value" placeholder="currentValue"  />
      </Fields>
      
    </CRUDTable>

    <div style={{fontSize : '1.5rem'}}> Total Invested Amount: ${roundToTwoDigits(totalInvested)} </div>
    <div style={{fontSize : '1.5rem'}}> Current Portfolio Value: ${roundToTwoDigits(currentValuation)}</div>
  </div>
);
Example.propTypes = {};
return(
  <Example/>
)

}

export default Portfolio;