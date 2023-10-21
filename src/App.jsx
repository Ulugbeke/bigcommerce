import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import Example from "./pages/Example";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Cart from "./pages/Cart";
import ProductDetail from './pages/ProductDetail';
import ConfirmOrder from './pages/ConfirmOrder';
import Orders from './pages/Orders';


function App(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='*' element={<NotFoundPage/>}/>
                <Route path='/example' element={<Example/>}/>
                <Route path='/sign-up' element={<SignUp/>}/>
                <Route path='/sign-in' element={<SignIn/>}/>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/product/:id' element={<ProductDetail/>}/>
                <Route path='/order/:productId/:amount' element={<ConfirmOrder/>}/>
                <Route path='orders' element={<Orders/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;