import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price, handleClick = false }) => {
    const { currency } = useContext(ShopContext);
    return (
        <Link
            to={`/product/${id}`}
            className="text-gray-700 cursor-pointer"
            onClick={handleClick}
        >
            <div className="overflow-hidden flex justify-center">
                <img
                    src={image[0]}
                    className="hover:scale-110 transition ease-in-out max-h-[300px]"
                    alt=""
                />
            </div>
            <p className="pt-3 pb-1 text-sm">{name}</p>
            <p className="text-sm font-medium">
                {currency} {price}
            </p>
        </Link>
    );
};

export default ProductItem;
