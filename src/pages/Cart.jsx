import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ORDER_PRODUCTS } from '../utils/urls';
import Layout from "../components/Layout";
import axios from 'axios';



export default function Cart() {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart'))||[]);
    const nanigate = useNavigate()

    const removeCartItem=(cartItem)=>{
        setCart([...cart.filter(item=>item.product.id !== cartItem.product.id)])
    }

    const inc=cartItem=>{
        setCart(cart.map(item=>{
            if (item.product.id === cartItem.product.id) {
                item.count+=1
            }
            return item
        }))
    }

    const dec=cartItem=>{
       if (cartItem.count <=1) {
        return removeCartItem(cartItem)
       }else{
        setCart(cart.map(item=>{
            if (item.product.id === cartItem.product.id) {
                item.count-=1
            }
            return item
        }))
       }
    }

    const createOrderProducts = item => {
        axios.post(ORDER_PRODUCTS,{
            data: {
                product: item.product,
                amount : item.count,
                total: item.product.attributes.price * item.count
            }
        })
        .then(res=> nanigate(`/order/${res.data.data.id}/${item.count}`))
        .catch(err=> console.error(err))
    }


    useEffect(()=>{
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])
    console.log(cart);
   return (
       <Layout>
           <div className='section'>
               <div className="container">
                   {!cart || cart.length === 0 ? (
                           <h1 className="title is-1 has-text-danger has-text-centered">Empty Cart</h1>)
                       : (cart.map(cartItem => (
                           <div className='box' key={cartItem.product.id}>
                               <div className="columns is-12 is-flex is-align-items-center">
                                   <div
                                       className="column is-2 is-clickable">
                                       <img
                                        src={`http://localhost:1337${cartItem.product.attributes.image.data.attributes.url}`}
                                        alt="Placeholder image"/>
                                   </div>
                                   <div
                                       className="column is-4 is-clickable">
                                       <p className='title is-5'>{cartItem.product.attributes.name}</p>
                                   </div>
                                   <div className="column is-4 is-flex is-align-items-center">
                                       <button
                                           className="button is-small"
                                           onClick={()=>dec(cartItem)}>
                                           -
                                       </button>
                                       <span className='title m-4 is-6'>{cartItem.count}</span>
                                       <button
                                           className="button is-small"
                                           onClick={()=>inc(cartItem)}>
                                           +
                                       </button>
                                   </div>
                                   <div className="column is-flex is-flex-direction-column is-justify-content-center">
                                       <button
                                            onClick={() => createOrderProducts(cartItem)}
                                           className='button is-success mx-1'
                                           >
                                           Buy
                                       </button>
                                       <br/>
                                       <br/>
                                       <button
                                           className='button is-danger mx-1'
                                           onClick={()=>removeCartItem(cartItem)}>
                                           Remove
                                       </button>
                                   </div>
                               </div>
                           </div>
                       )))}
               </div>
           </div>
       </Layout>
   );
}