import React, { useEffect, useState } from 'react'
import { productData } from '../../static/data'
import styles from '../../styles/styles'
import ProductCard from '../Route/ProductCard/ProductCard'

const SuggestedProduct = ({data}) => {
    const [products, setProducts] = useState(null)
    useEffect(() => {
      const d = productData && productData.filter((i) => i.category === data.category);
      setProducts(d);
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
  return (
    <div>
        {
            data ? (
                <div className={`${styles.section}`}>
                    <h2 className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}>
                        Related Products
                    </h2>
                    <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px] my-12">
                        {products && products.map((i, index) =>(
                            <ProductCard data={i} key={index} />
                        ))}
                    </div>
                </div>
            ) : null
        }
    </div>
  )
}

export default SuggestedProduct
