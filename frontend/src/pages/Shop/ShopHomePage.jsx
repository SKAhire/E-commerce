import React from 'react'
import styles from '../../styles/styles.js';
import ShopInfo from '../../components/Shop/ShopInfo'
import ShopProfileDetails from '../../components/Shop/ShopProfileDetails'

const ShopHomePage = () => {
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <div className="w-full flex py-10 justify-between">
        <div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] top-10 left-0 z-10 sticky">
          <ShopInfo isOwner={true} />
        </div>
        <div className="w-[72%] rounded-[4px]">
          <ShopProfileDetails isOwner={true} />
        </div>
      </div>
    </div>
  )
}

export default ShopHomePage
