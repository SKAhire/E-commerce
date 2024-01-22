import React, { useEffect } from 'react';
import ShopLogin from '../components/Shop/ShopLogin'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ShopLoginPage = () => {
  const {isShopAuthenticated, shop} = useSelector((state) => state.shop)
  const navigate = useNavigate();

  useEffect(() => {
    if(isShopAuthenticated === true) {
      navigate(`/shop/${shop._id}`);
    }
  }, [])
  return (
    <div>
      <ShopLogin/>
    </div>
  )
}

export default ShopLoginPage
