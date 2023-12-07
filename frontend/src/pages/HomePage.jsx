import React from 'react'
import Headers from "../components/layout/Headers";
import Banner from "../components/Route/Banner/Banner.jsx";
import Categories from "../components/Route/Categories/Categories";

const HomePage = () => {
  return (
    <div>
      <Headers activeHeading= {1} />
      <Banner />
      <Categories />
    </div>
  )
}

export default HomePage
