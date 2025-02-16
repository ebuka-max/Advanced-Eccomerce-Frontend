import React from 'react'
import "./Carousel.scss"
import { Link } from 'react-router-dom'
import { shortenText } from '../../utils'
import { useDispatch } from 'react-redux';
import { ADD_TO_CART, saveCartDB } from '../../redux/features/cart/cartSlice';

function removeHTMLTags(input){
  const regex = /<[^>]+>/g;
  return input.replace(regex, "");
}

const CarouselItem = ({url,name,price,regularPrice,description,product}) => {

  const dispatch = useDispatch()

  const addToCart = (product) => {
      dispatch(ADD_TO_CART(product))
      dispatch(saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) }))
  }

  const desc = removeHTMLTags(description)
  return (
    <div className='carouselItem'>
        <Link to={`/product-details/${product._id}`}>
        <img className='product--image' src={url} alt="product" />
        <p className='price'>
        <span>{regularPrice > 0 && <del>${regularPrice}</del>}</span>
            {`$${price}`}
        </p>
        <h4>{shortenText(name, 18)}</h4>

        <p className='--mb'>{shortenText(desc, 26)}</p>
        </Link>
        <button className='--btn --btn-primary --btn-block' onClick={()=> addToCart(product)}>Add To Cart</button>
    </div>
  )
}

export default CarouselItem