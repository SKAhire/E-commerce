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
        <div className="w-[75px] 800px:w-[335px] 800px:mt-0 mt-[18%] sticky">
            <ProfileSideBar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} />
      </div>
      <Footer />
    </div>
  )
}

export default ProfilePage
