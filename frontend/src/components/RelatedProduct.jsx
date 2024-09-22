import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { useParams } from "react-router-dom";

const RelatedProduct = ({ category, subCategory }) => {
    const { productId } = useParams();
    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let productCopy = products.slice();
            productCopy = productCopy.filter(
                (item) => category === item.category && item._id != productId
            );
            productCopy = productCopy.filter(
                (item) =>
                    subCategory === item.subCategory && item._id != productId
            );
            setRelated(productCopy.slice(0, 5));
        }
    }, [productId, products]);

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="my-24">
            <div className="text-center text-3xl py-2">
                <Title text1={"RELATED"} text2={"PRODUCT"} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {related.map((item, index) => (
                    <ProductItem
                        key={index}
                        id={item._id}
                        name={item.name}
                        image={item.image}
                        price={item.price}
                        handleClick={handleClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default RelatedProduct;
