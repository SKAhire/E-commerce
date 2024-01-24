import React from 'react'
import DashboardSidebar from '../../components/Shop/Layout/DashboardSidebar'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import AllEvents from '../../components/Shop/AllEvents'

const ShopAllEvents = () => {
    return (
        <div>
          <DashboardHeader />
          <div className="flex justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
                <DashboardSidebar active={5} />
            </div>
            <div className="w-full flex justify-center">
                <AllEvents />
            </div>
          </div>
        </div>
      )
}

export default ShopAllEvents
