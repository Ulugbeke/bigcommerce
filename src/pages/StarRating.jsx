import React from 'react'
import { useState } from 'react'
import {FaStar} from "react-icons/fa"

function StarRating({object, rating, setRating}) {
  const [hover, setHover] = useState(null)
   
  return (
    <div>
       {Object.keys(object).map(ratingValue => (
        <label key={ratingValue}>
            <input type="radio" name='rating' value={object[ratingValue]}/>
              <FaStar 
                 size="40" 
                 className='star' 
                 onMouseEnter={() => setHover(ratingValue)}
                 onMouseLeave={() => setHover(null)}
                 onClick={() => setRating(ratingValue)}
                 color={ratingValue <= (hover || rating) ? '#ffc107' : "#e4e5e9"}
               />
        </label>

         ))}
    </div>
  )
}

export default StarRating