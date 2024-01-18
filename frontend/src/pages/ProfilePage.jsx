import React, { useState } from 'react'
import Headers from '../components/layout/Headers'
import Footer from '../components/layout/Footer'
import styles from '../styles/styles'
import ProfileSideBar from '../components/Profile/ProfileSideBar'
import ProfileContent from '../components/Profile/ProfileContent.jsx'

const ProfilePage = () => {
    const [active, setActive] = useState(1)
  return (
    <div>
      <Headers />
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
        <div className="w-[50px] 800px:w-[335px]">
            <ProfileSideBar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} />
      </div>
      <Footer />
    </div>
  )
}

export default ProfilePage
