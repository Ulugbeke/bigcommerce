import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { addProduct } from '../utils/addProduct';
import Product from "./Product";


export default function Products({ products }) {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [count] = useState(1)

        useEffect(() => {
            localStorage.setItem('cart', JSON.stringify(cart))
        }, [cart])


    return (
        <div className="columns is-multiline is-centered">
            {products.length ? products.map(product => (
                <div className='column is-3' key={product.id}>
                    <Product product={product} addProduct={()=>addProduct(cart, setCart, product, count)}/>
                </div>
            )) : (
                <h1 className='heading has-text-centered has-text-denger is-size-1'>No products</h1>
            )}
        </div>
    );
}

