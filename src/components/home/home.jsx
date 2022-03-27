import {React, useState,useEffect} from 'react';
import { Route , withRouter, useNavigate} from 'react-router-dom';
import '../../App.css'
import { getStocks } from '../../services';
import StockDtl from './StockDtl';

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
                <div className='col-3'>
                <input className='col-md-auto' type='text' placeholder='Search' onChange={handleSerachTermChange}></input>
                {/* <Table data={search(stocks)}/> */}
                <table className="table table-hover text-align-start" >
                
                    <tbody>
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
                                
                        {/* <td scope="row">{item.name}</td> */}
                        <td scope="row">{item.stockSymbol}</td>
                        <td scope="row">{item.price}$</td>
                        {/* <td scope="row">{item.price}*{item.total_quantity}</td> */}
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