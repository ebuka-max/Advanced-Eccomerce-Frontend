import React, { useEffect } from 'react'
import styles from "./Cart.module.scss"
import "./Radio.scss"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TO_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, CLEAR_CART, DECREASE_CART, REMOVE_FROM_CART, saveCartDB, selectCartItems, selectcartTotalAmount, selectcartTotalQuantity } from '../../redux/features/cart/cartSlice'
import { FaTrashAlt } from 'react-icons/fa'
import Card from '../../components/card/Card'
import VerifyCoupon from '../../components/verifyCoupon/VerifyCoupon'
import PaymentOptions from '../../components/paymentOptions/PaymentOptions'


const Cart = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)
    const cartTotalQuantity = useSelector(selectcartTotalQuantity)
    const cartTotalAmount = useSelector(selectcartTotalAmount)
    const { coupon } = useSelector((state) => state.coupon);

    const increaseCart = (product) => {
        dispatch(ADD_TO_CART(product))
        dispatch(saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) }))
    }
    const decreaseCart = (product) => {
        dispatch( DECREASE_CART(product))
        dispatch(saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) }))
    }
    const removeFromCart = (product) => {
        dispatch( REMOVE_FROM_CART(product))
        dispatch(saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) }))
    }

    const clearCart = () => {
        dispatch(CLEAR_CART())
        dispatch(saveCartDB({ cartItems: [] }))
    }

    const cartAction = (cart) => {
        return (
            <div className={styles.count}>
          
                <>
                    <button className="--btn"
                    onClick={() => decreaseCart(cart)}>-</button>
                    <p>
                        <b>{cart.cartQuantity}</b>
                    </p>
                    <button className="--btn"  
                    onClick={() => increaseCart(cart)}>+</button>
                </>
            

        </div>
        )
    }

    useEffect(() => {
        dispatch(CALCULATE_TOTAL_QUANTITY())
        dispatch(CALCULATE_SUBTOTAL({ coupon}))
    },[dispatch, cartItems, coupon])

    return (
        <section>
            <div className={`container ${styles.table}`}>
                <h2>Shopping Cart</h2>
                {cartItems?.length === 0 ? (
                    <>
                        <p>Your cart is empty</p>
                        <div>
                            <Link to={"/shop"}>&larr; continue shopping</Link>
                        </div>
                    </>
                ) : (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>s/n</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {cartItems?.map((cart,index) => {
                                    const { _id, name, price, image, cartQuantity} = cart;
                                    return (
                                        <tr key={_id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <p><b>{name}</b></p>
                                                <img src={image[0]} alt={name} style={{width: "100px"}} />
                                            </td>
                                            <td>{price}</td>
                                            <td>{cartAction(cart)}</td>
                                            <td>{price*cartQuantity}</td>

                                            <td className={styles.icons}>
                                                <FaTrashAlt
                                                size={19}
                                                color="red"
                                                onClick={() => removeFromCart(cart)} 
                                                 />
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                        <div className={styles.summary}>
                            <button className="--btn --btn-danger" onClick={clearCart}>CLEAR CART</button>
                            <div className={styles.checkout}>
                                <div>
                                    <Link to={"/shop"}>&larr; Continue Shopping</Link>
                                </div>

                                <br/>
                                <Card cardClass={styles.card}>
                                    <p>
                                        <b>{`Cart item(s): ${cartTotalQuantity}`}</b>
                                    </p>

                                    <div className={styles.text}>
                                        <h4>Subtotal :</h4>
                                        <h3>{`$${cartTotalAmount?.toFixed(2)}`}</h3>
                                    </div>
                                    <VerifyCoupon />
                                    <div className='--underline --my'></div>
                                    <PaymentOptions />
                                </Card>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}

export default Cart