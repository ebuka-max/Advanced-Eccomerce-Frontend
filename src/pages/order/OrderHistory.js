import React  from 'react'

import { useNavigate } from 'react-router-dom'
import "./OrderHistory.scss"

import ListOfOrders from './ListOfOrders'

const OrderHistory = () => {

  const navigate = useNavigate()

  const openOrderDetails = (id) =>{
    navigate(`/order-details/${id}`);
  }

  return (
    <section>
      <div className="container order">
        <h2>Your Order History</h2>
        <p>
          Open an order to leave a <b>Product Review</b>
        </p>
        <br />
        <ListOfOrders  openOrderDetails={openOrderDetails}/>
      </div>
    </section>
  )
}

export default OrderHistory