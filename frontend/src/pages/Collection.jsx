import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { assets } from "../assets/assets";

const Collection = () => {
    const { products, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState("relavent");

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory((prev) =>
                prev.filter((item) => item !== e.target.value)
            );
        } else {
            setCategory((prev) => [...prev, e.target.value]);
        }
    };

    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory((prev) =>
                prev.filter((item) => item !== e.target.value)
            );
        } else {
            setSubCategory((prev) => [...prev, e.target.value]);
        }
    };

    const appyFilter = () => {
        let productsCopy = products.slice();

        if (showSearch && search) {
            productsCopy = productsCopy.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (category.length > 0) {
            productsCopy = productsCopy.filter((item) =>
                category.includes(item.category)
            );
        }

        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter((item) =>
                subCategory.includes(item.subCategory)
            );
        }

        setFilterProducts(productsCopy);
    };

    const sortProduct = () => {
        let filterProductsCopy = filterProducts.slice();
        switch (sortType) {
            case "low-high":
                setFilterProducts(
                    filterProductsCopy.sort((a, b) => a.price - b.price)
                );
                break;
            case "high-low":
                setFilterProducts(
                    filterProductsCopy.sort((a, b) => b.price - a.price)
                );
                break;
            default:
                appyFilter();
                break;
        }
    };

    useEffect(() => {
        appyFilter();
    }, [category, subCategory, search, showSearch, products]);

    useEffect(() => {
        sortProduct(sortType);
    }, [sortType]);

    return (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
            {/* Filters side */}
            <div className="min-w-60">
                <p
                    className="my-2 text-xl flex items-center cursor-pointer gap-2"
                    onClick={() => setShowFilter(!showFilter)}
                >
                    FILTERS
                    <img
                        src={assets.dropdown_icon}
                        className={`h-3 sm:hidden ${
                            showFilter ? "rotate-90" : ""
                        }`}
                        alt=""
                    />
                </p>
                {/* Category filter */}
                <div
                    className={`border border-gray-300 pl-5 py-3 mt-6 ${
                        showFilter ? "" : "hidden"
                    } sm:block`}
                >
                    <p className="mb-3 text-sm font-medium">CATEGORIES</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        <p className="flex gap-2">
                            <input
                                type="checkbox"
                                className="w-3"
                                onChange={toggleCategory}
                                value={"Men"}
                                id="men"
                            />
                            <label htmlFor="men">Men</label>
                        </p>
                        <p className="flex gap-2">
                            <input
                                type="checkbox"
                                className="w-3"
                                onChange={toggleCategory}
                                value={"Women"}
                                id="women"
                            />
                            <label htmlFor="women">Women</label>
                        </p>
                        <p className="flex gap-2">
                            <input
                                type="checkbox"
                                className="w-3"
                                onChange={toggleCategory}
                                value={"Kids"}
                                id="kids"
                            />
                            <label htmlFor="kids">Kids</label>
                        </p>
                    </div>
                </div>
                {/* Sub filter */}
                <div
                    className={`border border-gray-300 pl-5 py-3 my-5 ${
                        showFilter ? "" : "hidden"
                    } sm:block`}
                >
                    <p className="mb-3 text-sm font-medium">TYPE</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        <p className="flex gap-2">
                            <input
                                type="checkbox"
                                className="w-3"
                                onChange={toggleSubCategory}
                                value={"Topwear"}
                                id="Topwear"
                            />
                            <label htmlFor="Topwear">Topwear</label>
                        </p>
                        <p className="flex gap-2">
                            <input
                                type="checkbox"
                                className="w-3"
                                onChange={toggleSubCategory}
                                value={"Bottomwear"}
                                id="Bottomwear"
                            />
                            <label htmlFor="Bottomwear">Bottomwear</label>
                        </p>
                        <p className="flex gap-2">
                            <input
                                type="checkbox"
                                className="w-3"
                                onChange={toggleSubCategory}
                                value={"Winterwear"}
                                id="Winterwear"
                            />
                            <label htmlFor="Winterwear">Winterwear</label>
                        </p>
                    </div>
                </div>
            </div>
            {/* Products side */}
            <div className="flex-1">
                <div className="flex justify-between text-base sm:text-2xl mb-4">
                    <Title text1={"ALL"} text2={"COLLECTIONS"} />
                    {/* Sort */}
                    <select
                        className="border-2 border-gray-300 text-sm px-2"
                        onChange={(e) => setSortType(e.target.value)}
                    >
                        <option value="relavent">Sort by: Relavent</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: high to Low</option>
                    </select>
                </div>
                {/* Products */}
                <div className="grid gridcols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                    {filterProducts.map((item, index) => (
                        <ProductItem
                            key={index}
                            id={item._id}
                            name={item.name}
                            image={item.image}
                            price={item.price}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Collection;
