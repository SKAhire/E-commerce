import React from 'react';
import DashboardSidebar from '../../components/Shop/Layout/DashboardSidebar'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import AllProducts from '../../components/Shop/AllProducts'

const ShopAllPRoducts = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
            <DashboardSidebar active={3} />
        </div>
        <div className="w-full flex justify-center">
            <AllProducts />
        </div>
      </div>
    </div>
  )
}

export default ShopAllPRoducts
