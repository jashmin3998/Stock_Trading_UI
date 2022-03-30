import React, { useEffect, useState } from 'react';
import { addStock, getUserRole } from '../../services';

//import AuthenticationService from './AuthenticationService.js'

function AddStock(){

    const[error, setError] = useState("")
    const[isAdmin, setIsAdmin] = useState(false)

    useEffect(()=>{
        const fetchUserRole = async () =>{
            try{
                const res = await getUserRole(
                    { params: { username: window.localStorage.getItem("username") } }
                );    
                if(res){
                    setIsAdmin(res.data === "ADMIN" ? true: false);
                }
            }
            catch{
                console.log("Not an admin")
            }           
        }

        fetchUserRole();

    },[])

    return(
        <>
        {isAdmin && <AddStocks />}
        
        {isAdmin && <h3>Admin access only</h3>}
        </>
    )
}

function AddStocks(){

    const[stockName, setStockName] = useState("Tesla")
    const[sSymbol, setSSymbol] = useState("TSL")
    const[totalQty, setTotalQty] = useState(100000)
    const[purchasedQty, setPurchasedQty] = useState(20000)
    const[intialPrice, setIntialPrice] = useState(852)
    const[creationDate, setCreationDate] = useState()
    const[error, setError] = useState("")
    const[isAdmin, setIsAdmin] = useState(false)

    const handleStockNameChange=(event) =>{
        setStockName(event.target.value) 
    }

    const handleSSymbolChange=(event) =>{
        setSSymbol(event.target.value) 
    }
    const handleTotalQuantityChange=(event) =>{
        setTotalQty(event.target.value) 
    }

    const handlePurchasedQuantityChange=(event) =>{
        setPurchasedQty(event.target.value) 
    }
    const handleIntialPriceChange=(event) =>{
        setIntialPrice(event.target.value) 
    }

    // const handleCreationDateChange=(event) =>{
    //     setCreationDate(event.target.value) 
    // }

    

    

    async function addClicked(){
        try {

            var totalQuantity = parseInt(totalQty, 10);
            var purchasedQuantity = parseInt(purchasedQty, 10) 
            var price = parseFloat(intialPrice)
            var stockSymbol = sSymbol
            var name = stockName
            var creationTime = creationDate
            const response = await addStock({
                name,
                stockSymbol,
                totalQuantity,
                purchasedQuantity,
                price,
                creationTime
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
        <>
        <div className='Login d-flex flex-column align-items-center'>
            <h3> Add New Stock </h3>
            <div className='row col-2 mt-2'>
                Stock Name: 
            </div>
            <div className='row col-2 mb-2'>
                <input type="text" name="name" value={stockName} onChange={handleStockNameChange} />
            </div>
            <div className='row col-2 mt-2'>
                Stock Symbol: 
            </div>
            <div className='row col-2 mb-2'>
                <input type="text" name="sSymbol" value={sSymbol} onChange={handleSSymbolChange} />
            </div>
            <div className='row col-2 mt-2'>
                Total Quantity: 
            </div>
            <div className='row col-2 mb-2'>
                <input type="number" name="totalQuantity" value={totalQty} onChange={handleTotalQuantityChange} />
            </div>
            <div className='row col-2 mt-2'>
                Purchased Quantity: 
            </div>
            <div className='row col-2 mb-2'>
                <input type="number" name="purchasedQuantity" value={purchasedQty} onChange={handlePurchasedQuantityChange} />
            </div>
            <div className='row col-2 mt-2'>
                Price: 
            </div>
            <div className='row col-2 mb-2'>
                <input type="number" name="intialPrice" value={intialPrice} onChange={handleIntialPriceChange} />
            </div>
            
            <button className="btn btn-success" onClick={addClicked}>Add</button>
            
        </div>
        </>
    )
    
    
}

export default AddStock;

