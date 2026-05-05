
import './App.css';

import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import ProductViewPage from './pages/ProductViewPage';
import AdminePage from './pages/AdminePage';
import Product from './pages/Product';
function App() {


  return (
   <BrowserRouter>
   <Routes>
    <Route  path='/' element={<Home/>}/>
    <Route  path='/product/:id' element={<ProductViewPage/>}/>
    <Route  path='/admine-us' element={<AdminePage/>}/>
    <Route path='/about-us' element={<About/>}/>
    <Route path='/Login-us' element={<Login/>}/>
    <Route path='/product' element={<Product/>}/>
   </Routes>
   
   </BrowserRouter>
  )
}

export default App
