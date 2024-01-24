import React from 'react'
import DashboardSidebar from '../../components/Shop/Layout/DashboardSidebar'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import CreateEvent from '../../components/Shop/CreateEvent'

const ShopCreateEvent = () => {
    return (
        <div>
          <DashboardHeader />
          <div className="flex items-center justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
                <DashboardSidebar active={6} />
            </div>
            <div className="w-full flex justify-center">
                <CreateEvent />
            </div>
          </div>
        </div>
      )
}

export default ShopCreateEvent
