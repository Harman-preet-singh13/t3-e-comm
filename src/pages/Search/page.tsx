import React, { useState } from "react";
import productData from "../../components/Products.json";
import Link from "next/link";
import Rating from "@mui/material/Rating";
import Head from "next/head";

const PriceSection = ["10", "50", "100"];
const CategorySection = [
  "men's clothing",
  "women's clothing",
  "jewelery",
  "electronics",
];

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const selectedPriceNumber = parseFloat(selectedPrice);

  // Filter data
  const filteredData = productData.filter(
    (entry) =>
      (selectedPrice === "" || entry.price < selectedPriceNumber) &&
      (selectedCategory === "" || entry.category === selectedCategory) &&
      (entry.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handlePriceSelect = (topic: string) => {
    if (topic === "10") {
      setSelectedPrice(topic);
    } else if (topic === "50") {
      setSelectedPrice(topic);
    } else if (topic === "100") {
      setSelectedPrice(topic);
    } else {
      setSelectedPrice(topic);
    }
  };

  const handleCategorySelect = (topic: string) => {
    setSelectedCategory(topic);
    console.log(selectedCategory);
  };

  return (
    <>
      <Head>
        <title>T3-Ecomm</title>
        <link rel="icon" href="https://create.t3.gg/images/t3-light.svg" />
      </Head>
      <div className="mx-auto my-10 max-w-4xl">
        <form>
          <label
            htmlFor="default-search"
            className="sr-only mb-2 text-sm font-medium text-gray-900"
          >
            Search
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-4 w-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full rounded-lg border-2 border-gray-400 bg-gray-50 p-4 pl-10 text-sm focus:border-gray-800 focus-visible:outline-none"
              placeholder="Search..."
              required
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute bottom-2.5 right-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 "
            >
              Search
            </button>
          </div>
        </form>

        <main className="mx-auto my-5 max-w-5xl bg-[#FFFFFF]">
          <section className="filter-container flex justify-between">
            {/* slection by price */}
            <div className="filter-item">
              <label>Select Price:</label>

              <select
                onChange={(e) => handlePriceSelect(e.target.value)}
                value={selectedPrice}
                className=""
              >
                <option value="">All</option>
                {PriceSection.map((topic, index) => {
                  return (
                    <option key={index} value={topic}>
                      under &#x20B9;{topic}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* slection by Category */}
            <div className="filter-item">
              <label>Select Category:</label>
              <select
                onChange={(e) => handleCategorySelect(e.target.value)}
                value={selectedCategory}
                className=""
              >
                <option value="">All</option>
                {CategorySection.map((topic, index) => {
                  return (
                    <option key={index} value={topic}>
                      {topic}
                    </option>
                  );
                })}
              </select>
            </div>
          </section>
          <h1 className="filter-heading mt-10">Filter Results</h1>
          <section>
            {filteredData.length === 0 ? (
              <p className="filter-heading mt-10">No products found</p>
            ) : (
              <ul className="">
                {filteredData.map((item, index) => (
                  <Link href={`/ViewProduct/${item.id}`}>
                    <li
                      key={index}
                      className="my-5 flex justify-center gap-5 border border-[#f5f5f5] shadow-sm"
                    >
                      <img
                        src={item.image}
                        className="h-40 w-36 bg-slate-500"
                      />

                      <div className="max-w-xl">
                        <h2 className="product-heading-big">{item.title}</h2>
                        <p className="product-para">{item.description}</p>
                        <Rating
                          defaultValue={item.rating.rate}
                          precision={0.5}
                          readOnly
                        />
                        <h2 className="product-price">&#x20B9;{item.price}</h2>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </section>
        </main>
      </div>
    </>
  );
}
