import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getOrder } from '../../redux/features/order/orderSlice'
import { Spinner } from '../../components/loader/Loader'
import html2canvas from "html2canvas"
// import {jsPDF} from "jsPDF"
// import { useReactToPrint } from "react-to-print"
import { jsPDF } from "jspdf";



const OrderDetailsComp = ({ orderPageLink}) => {
    const { id } = useParams()
    const pdfRef = useRef()
    const dispatch = useDispatch()
    const { isLoading,  order } = useSelector((state) => state.order)

    useEffect(()=>{
        dispatch(getOrder(id))
      }, [dispatch, id])

      const downloadPDF = () => {
        const input = pdfRef.current;
        html2canvas(input).then((canvas) => {

          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4", true);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          const imageWidth = canvas.width;
          const imageHeight = canvas.height;
          const ratio = Math.min(pdfWidth / imageWidth, pdfHeight / imageHeight);
          const imgX = (pdfWidth - imageWidth * ratio) / 2;
          const imgY = 30;
          pdf.addImage(
            imgData,
            "PNG",
            imgX,
            imgY,
            imageWidth * ratio,
            imageHeight * ratio
          );
          pdf.save(`shopitoInvoice.pdf`);
        });
      };

    // const downloadPDF = useReactToPrint({
    //     content: () => pdfRef.current,
    //     documentTitle : "emp-data",
    //     onAfterPrint: () => alert("downloadede Successfully")
    // })
 

      console.log(order);
      


  return (
    
        <div className="container" ref={pdfRef}>
            <h2> Order Details</h2>

            <div>
                <Link to={orderPageLink}>&larr; Back To Orders</Link>
            </div>
            <br />
            <div className="table">
                {isLoading && order === null ? (
                    <Spinner />
                ) : (
                    <>
                    <p>
                        <b>Ship to</b>{order?.shippingAddress?.name}
                    </p>

                    <p>
                        <b>Order ID</b> {order?._id}
                    </p>

                    <p>
                        <b>Order Amount</b> ${order?.orderAmount}
                    </p>

                    <p>
                        <b>Coupon</b> {order?.coupon?.name} | {order?.coupon?.discount}%
                    </p>

                    <p>
                        <b>Payment Method</b> {order?.paymentMethod}
                    </p>

                    <p>
                        <b>Order Status</b> {order?.orderStatus}
                    </p>

                    <p>
                        <b>Shipping Address</b> 
                        <br />
                        Address: {order?.shippingAddress.line1},
                        {order?.shippingAddress.line2}, {order?.shippingAddress.city}
                        <br />
                        State: {order?.shippingAddress.state}
                        <br />
                        Country: {order?.shippingAddress.country}
                    </p>
                    <br />

                    {/* TABLE */}
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
                                {order?.cartItems?.map((cart,index) => {
                                    const { _id, name, price, image, cartQuantity} = cart;
                                    return (
                                        <tr key={_id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <p><b>{name}</b></p>
                                                <img src={image[0]} alt={name} style={{width: "100px"}} />
                                            </td>
                                            <td>{price}</td>
                                            <td>{cartQuantity}</td>
                                            <td>{price*cartQuantity}</td>

                                            <td className={"icons"}>
                                            <button className="--btn --btn-primary">
                                                Review Product
                                            </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    
                    </>
                )}
            </div>

            <div className="--center-all --my">
                <button className="--btn --btn-primary --btn-lg" onClick={downloadPDF} >
                    Download as PDF
                </button>
            </div>
        </div>
  )
}

export default OrderDetailsComp