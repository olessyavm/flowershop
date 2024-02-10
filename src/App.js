import './App.css';
import Cart from './Components/Cart/Cart';
import AllCategories from './Components/Filter/AllCategories';
import Arrangemnts from './Components/FlowerComponent/Arrangemnts';

function App() {
  return (
    <div className="App">
      <div className='block'>
            <AllCategories />
      <Cart />
      </div>
      <div className='block'>
        <Arrangemnts />
      </div>
      
    </div>
  );
}

export default App;
