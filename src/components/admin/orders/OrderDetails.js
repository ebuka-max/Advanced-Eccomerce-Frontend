import React from 'react'
// import { Link } from 'react-router-dom'
import OrderDetailsComp from '../../../pages/order/OrderDetailsComp'

const OrderDetails = () => {
    return (
        <OrderDetailsComp orderPageLink={"/admin/orders"} />
    )
}

export default OrderDetails