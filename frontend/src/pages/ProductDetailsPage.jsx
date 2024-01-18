import React, { useEffect, useState } from "react";
import Headers from "../components/layout/Headers";
import Footer from "../components/layout/Footer";
import ProductDetails from "../components/Products/ProductDetails"
import SuggestedProduct from "../components/Products/SuggestedProduct"
import { useParams } from "react-router-dom";
import { productData } from "../static/data";

const ProductDetailsPage = () => {
    const {name} = useParams();
    const [data, setData] = useState(null);
    const productName = name.replace(/-/g, " ");

    useEffect(() => {
      const data = productData.find((i) => i.name === productName);
      setData(data);
     // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

  return (
    <div>
        <Headers />
        <ProductDetails data={data} />
        {
          data && <SuggestedProduct data={data}/>
        }
        <Footer/>
    </div>
  );
};



export default ProductDetailsPage;
