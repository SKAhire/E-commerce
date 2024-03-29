import React from 'react'
import Header from '../components/layout/Headers'
import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import Checkout from "../components/Checkout/Checkout";
import Footer from '../components/layout/Footer';

const CheckoutPage = () => {
  return (
    <div>
        <Header />
        <br />
        <br />
        <CheckoutSteps active={1} />
        <Checkout />
        <br />
        <br />
        <Footer />
    </div>
  )
}

export default CheckoutPage