import {React, useState,useEffect} from 'react';
import { Route , withRouter, useNavigate} from 'react-router-dom';
import '../../App.css'
import { getStocks } from '../../services';
import StockDtl from './StockDtl';
import {BsCaretUpFill,BsCaretDownFill} from 'react-icons/bs';

function Home(){

    const[searchTerm, setSearchTerm] = useState('');
    const [stocks, setStocks]= useState([]);
    const[selectedStock, setSelectedStock] = useState()
    const navigate = useNavigate()
    
    function handleSerachTermChange(event){
        setSearchTerm(event.target.value);
    }

    const search =(data)=>{
        return data.filter((item) => 
        item.name.toLowerCase().includes(searchTerm) || 
        item.stockSymbol.toLowerCase().includes(searchTerm)
        );
    }
    
    useEffect(() => {
        
        const fetchData = async () =>{
            const res = await getStocks();
            setStocks(res.data);
            setSelectedStock(res.data[0])
            console.log(res.data)
        }
        fetchData();
      }, []);

      

    function stockClicked(item){
        setSelectedStock(item)
        //navigate
    }
    
    return(
        <div className='container'>        
            <div className='row'>
                <div className='col-3 bg-light'>
                    <div className=' d-flex justify-content-center mt-3'>
                         <input type='text' placeholder='Search' onChange={handleSerachTermChange}></input>
                    </div>
                {/* <Table data={search(stocks)}/> */}
                <table className="table table-hover text-align-start" >
                
                    <tbody style={{overflow: "auto" , height: "79vh",  display: "block"}}>
                        <tr>
                            {/* <th>Stocks Name</th> */}
                            <th>Symbol</th>
                            <th>Price</th>
                            {/* <th>Market Capitalization</th> */}
                        </tr>
                    {search(stocks).map((item) => (
                        <tr key={item.stocksId} onClick= {()=> {
                            stockClicked(item)
                            }}>
                        
                        <td scope="row">{item.stockSymbol}</td>
                        <td scope="row" style={ item?.stockPrice?.price > item?.stockPrice?.preClose ? {color:"green"} : {color:"red"}}>${item?.stockPrice?.price} 
                        {  item?.stockPrice?.price > item?.stockPrice?.preClose ? <BsCaretUpFill/>: <BsCaretDownFill/>} 
                        </td>
                        
                        </tr>
                    ))}
                
                    </tbody>
                </table>
                
                </div>
                <div className='col-9'>
                {selectedStock && <StockDtl
                    selectedStock= {selectedStock}
                />}
                </div>
            </div>
            
        </div>

    )
}



export default Home;