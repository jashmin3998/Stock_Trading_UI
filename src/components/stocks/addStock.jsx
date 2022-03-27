import React, { useState } from 'react';
import { addStock } from '../../services';

//import AuthenticationService from './AuthenticationService.js'

function AddStock(){

    const[stockName, setStockName] = useState("Tesla")
    const[sSymbol, setSSymbol] = useState("TSL")
    const[totalQuantity, setTotalQuantity] = useState(100000)
    const[purchasedQuantity, setPurchasedQuantity] = useState(20000)
    const[intialPrice, setIntialPrice] = useState(852)
    const[creationDate, setCreationDate] = useState()
    const[error, setError] = useState("")
    

    const handleStockNameChange=(event) =>{
        setStockName(event.target.value) 
    }

    const handleSSymbolChange=(event) =>{
        setSSymbol(event.target.value) 
    }
    const handleTotalQuantityChange=(event) =>{
        setTotalQuantity(event.target.value) 
    }

    const handlePurchasedQuantityChange=(event) =>{
        setPurchasedQuantity(event.target.value) 
    }
    const handleIntialPriceChange=(event) =>{
        setIntialPrice(event.target.value) 
    }

    const handleCreationDateChange=(event) =>{
        setCreationDate(event.target.value) 
    }

    

    async function addClicked(){
        try {

            var total_quantity = parseInt(totalQuantity, 10);
            var purchased_quantity = parseInt(purchasedQuantity, 10) 
            var price = parseFloat(intialPrice)
            var stockSymbol = sSymbol
            var name = stockName
            var creation_time = creationDate
            const response = await addStock({
                name,
                stockSymbol,
                total_quantity,
                purchased_quantity,
                price,
                creation_time
            })

            if(response.data.success){
                console.log(response.data)
                setError("Added Successfully")
            }
            else{
                console.log(response.data)
                setError("Failed to add stock")
            }
        } catch (error) {
            console.log(error)
            if(error?.response?.data?.error){
                console.log(error.response.data.error)
                setError(error.response.data.error)
            }
        }
    }




    return(
        <div className='Add'>
            
                {/*<ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>*/}
            Stock Name: <input type="text" name="name" value={stockName} onChange={handleStockNameChange} />
            Stock Symbol: <input type="text" name="sSymbol" value={sSymbol} onChange={handleSSymbolChange} />
            Total Quantity: <input type="number" name="totalQuantity" value={totalQuantity} onChange={handleTotalQuantityChange} />
            Purchased Quantity: <input type="number" name="purchasedQuantity" value={purchasedQuantity} onChange={handlePurchasedQuantityChange} />
            Price: <input type="number" name="intialPrice" value={intialPrice} onChange={handleIntialPriceChange} />
            
            <button className="btn btn-success" onClick={addClicked}>Add</button>
            
        </div>
    )
    
    
}

export default AddStock;

