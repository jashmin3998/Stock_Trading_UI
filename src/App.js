import logo from './logo.svg';
import './App.css';
import StockApp from './components/stockApp/StockApp';
import Header from './components/header/header'
import Login from './components/login/Login';

function App() {
  return (
    <div className="App">
      <Header/>
      <StockApp></StockApp>
     
    </div>
  );
}

export default App;
