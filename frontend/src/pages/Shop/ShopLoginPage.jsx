import React, { useEffect } from 'react';
import ShopLogin from '../../components/Shop/ShopLogin'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ShopLoginPage = () => {
  const {isShopAuthenticated, isLoading} = useSelector((state) => state.shop)
  const navigate = useNavigate();

  useEffect(() => {
    if(isShopAuthenticated === true) {
      navigate(`/dashboard`);
    }
  }, [isLoading, isShopAuthenticated, navigate])
  return (
    <div>
      <ShopLogin/>
    </div>
  )
}

export default ShopLoginPage
