import React from 'react';
import styles from '../../styles/styles';
import { navItems } from '../../static/data';
import { Link } from 'react-router-dom';

const NavBar = ({active}) => {
  return (
    <div className={`block 800px:${styles.noramlFlex}`}>
      {
        navItems && navItems.map((i, index) => (
            <div className="flex" key={index}>
                <Link to={i.url}  className={`${active === index+1 ? "text-[#4a3b85]" : "text-black 800px:text-white"} font-[500] px-6 py-2 cursor-pointer hover:text-purple-200`} >{i.title}</Link>
            </div>
        ))
      }
    </div>
  )
}

export default NavBar
