import React, { useEffect, useState } from "react";
import Headers from "../components/layout/Headers";
import styles from "../styles/styles";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import Footer from "../components/layout/Footer";
import { useSelector } from "react-redux";
import Loader from "../components/layout/Loader";

const ProductsPage = () => {
  const { allProducts, isLoading } = useSelector((state) => state.product);
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (categoryData === null) {
      const d = allProducts;
      setData(d);
    } else {
      const d =
        allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
    }
    // window.scrollTo(0, 0)
    // eslint-disable-next-line
  }, [allProducts]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Headers activeHeading={3} />
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
        </>
      )}
    </div>
  );
};

export default ProductsPage;
