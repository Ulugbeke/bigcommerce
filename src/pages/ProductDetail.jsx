import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import Layout from '../components/Layout';
import { ORDER_PRODUCTS, PRODUCT, REVIEWS, REVIEWS_OF_PRODUCT } from '../utils/urls';
import StarRating from './StarRating';


export default function ProductDetail() {
    const [product, setProduct] = useState(null)
    const params = useParams()
    const navigate=useNavigate()

    const ratingList = {
        1: 'bad',
        2: 'ok',
        3: 'good',
        4: 'excellent'
    }
    const [rating,setRating] = useState( null)
    const [review, setReview] = useState ('') 
    const [reviews, setReviews] = useState([])
    const {user} = useState(JSON.parse(localStorage.getItem("user")))

    const loadReviews = () => {
        axios.get(REVIEWS_OF_PRODUCT.replace('productId', params.id))
        .then(res => setReviews(res.data.data))
        .catch(err => console.error(err))
    }

    const createOrderProduct=()=>{
        axios.post(ORDER_PRODUCTS, {
            data:{
                product: product,
                amount: 1,
                total: product.attributes.price
            }
        })
        .then(res=>navigate(`/order/${res.data.data.id}/1`))
        .catch(err=>console.error(err))
    }
    async function addReview(event){
        event.preventDefault()
        if(review && rating){
            await axios.post(REVIEWS,{
                data: {
                    body:review,
                    user: user,
                    product: product.id,
                    point: ratingList[rating],
                }})
                .then(res => {
                 setReview('') 
                 setRating(null) 
                 loadReviews()  
                })
                .catch(err => console.error(err))
        }else{
            alert('write something')
        }
    }
    useEffect(() => {
        axios.get(PRODUCT.replace('id', params.id))
        .then(res => setProduct(res.data.data))
        .catch(err => console.error(err))

        loadReviews()
    },  [])

   return (
     <Layout>
       <div className="section">
           <div className="container">
               <div className="tile is-ancestor">
                   <div className="tile is-vertical">
                       {product && (
                           <div className="tile">
                               <div className="tile is-parent is-vertical">
                                   <article className="tile is-child notification has-text-centered">
                                       <img
                                           src={`http://localhost:1337${product.attributes.image.data.attributes.url}`}
                                           alt="404 not found"/>
                                   </article>
                               </div>
                               <div className="tile is-parent">
                                   <article className="tile is-child notification">
                                       <div className="title is-4">{product.attributes.name}</div>
                                       <div className="subtitle has-text-grey is-spaced">{product.attributes.description}</div>
                                       <div className="title is-4 has-text-success">{product.attributes.price} sum</div>
                                       <div className="content">
                                           <div className="subtitle is-spaced has-text-weight-bold">Brand: {product.attributes.brand.data.attributes.title}</div>
                                           <button className="button mr-3 is-primary" onClick={createOrderProduct}>Buy</button>
                                           <button className="button is-info">
                                               Add to card
                                           </button>
                                           <hr className='dropdown-divider my-3'/>
                                           <form className="form" onSubmit={e => addReview(e)}>
                                               <input
                                                   type="text"
                                                   className="input my-2"
                                                   placeholder='Leave your review here'
                                                    value={review}
                                                    onChange={e => setReview(e.target.value)}
                                                    />
                                                    <div className="has-text-centered">
                                                   <StarRating
                                                        object={ratingList}
                                                        rating={rating}
                                                        setRating={setRating}                                                   />
                                                   </div>
                                               <button className='button is-success is-fullwidth my-2' type='submit'>
                                                   Submit
                                               </button>
                                               <Link to='/' style={{textDecoration: 'none'}}>
                                                   <button className='button is-danger is-fullwidth my-2'>
                                                       Back to main
                                                   </button>
                                               </Link>
                                           </form>
                                       </div>
                                   </article>
                               </div>
                           </div>
                                )}
                                    <div className="tile is-parent">
                                      <article className="tile is-child notification">
                                        <div className="content">
                                         <div className="title has-text-centered">
                                                         Reviews of other clients
                                            </div>
                                                <div className="columns is-multiline is-centered">
                                                        {reviews && reviews.map(review => (
                                                      <div className='column is-4' key={review.id}>
                                                     <div className="card">
                                                    <div className="card-content">
                                                   <div className="media">
                                                  <div className="media-left">
                                                 <figure className="image is-48x48">
                                                <img
                                                    src="https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
                                                    alt="Placeholder image" className='is-rounded'/>
                                              </figure>
                                                 </div>
                                                  <div className="media-content">
                                                    <p className="title is-4">{review.attributes.user.attributes.data.attributes.username}</p>
                                                    <p className="subtitle  is-6">{review.attributes.user.attributes.data.attributes.email}</p>
                                                   </div>
                                                  </div>

                                            <div className="content is-size-5">"{review.attributes.body}"</div>
                                          place to show stars
                                       </div>
                                      </div>
                                    </div>
                                     ))}
                                 </div>
                               </div>
                           </article>
                       </div>
                   </div>
               </div>
           </div>
       </div>
  </Layout>
   );
}