import React, { useEffect, useState } from "react";
import styles from "../styles/styles";
import Headers from "../components/layout/Headers";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import { productData } from "../static/data";
import Footer from "../components/layout/Footer";
import { useSelector } from "react-redux";
import Loader from "../components/layout/Loader";

const BestSellingPage = () => {
  const [data, setData] = useState([]);
  const { allProducts, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    //  const d = allProducts && allProducts.sort((a,b) => b.sold_out - a.sold_out); we will add it after complete order route
    const d = allProducts;
    setData(d);
    // window.scrollTo(0, 0)
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Headers activeHeading={2} />
          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px] my-12">
              {data &&
                data.map((i, index) => <ProductCard data={i} key={index} />)}
            </div>
            {data && data.length === 0 ? (
              <h1 className="text-center w-full pb-[100px] text-[20px]">
                No Product Found!
              </h1>
            ) : null}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default BestSellingPage;
