import React, { useEffect } from 'react';
import ShopCreate from '../../components/Shop/ShopCreate'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ShopCreatePage = () => {
  const {isShopAuthenticated, isLoading} = useSelector((state) => state.shop)
  const navigate = useNavigate();

  useEffect(() => {
    if(isShopAuthenticated === true) {
      navigate(`/dashboard`);
    }
  }, [isLoading, isShopAuthenticated, navigate])
  return (
    <div>
      <ShopCreate />
    </div>
  )
}

export default ShopCreatePage
