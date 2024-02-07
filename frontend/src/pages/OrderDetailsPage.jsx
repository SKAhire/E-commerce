import React from 'react'
import Headers from '../components/layout/Headers'
import Footer from '../components/layout/Footer'
import UserOrderDetails from "../components/UserOrderDetails";

const OrderDetailsPage = () => {
  return (
    <div>
       <div>
        <Headers />
        <UserOrderDetails />
        <Footer />
    </div>
    </div>
  )
}

export default OrderDetailsPage
