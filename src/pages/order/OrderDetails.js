import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getOrder } from '../../redux/features/order/orderSlice'
import { Spinner } from '../../components/loader/Loader'
import html2canvas from "html2canvas"
// import {jsPDF} from "jsPDF"
// import { useReactToPrint } from "react-to-print"
import { jsPDF } from "jspdf";
import OrderDetailsComp from './OrderDetailsComp'



const OrderDetails = () => {
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
    <section>
        <OrderDetailsComp orderPageLink={"/order-history"} />
    </section>
  )
}

export default OrderDetails