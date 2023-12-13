import React from 'react'
import Headers from "../components/layout/Headers";
import Footer from "../components/layout/Footer";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProducts from "../components/Route/FeaturedProducts/FeaturedProducts";
import Events from "../components/Route/Events/Events";
import Sponsored from "../components/Route/Sponsored/Sponsored";

const HomePage = () => {
  return (
    <div>
      <Headers activeHeading= {1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProducts />
      <Sponsored />
      <Footer />
      
    </div>
  )
}

export default HomePage
