import React, { useState } from 'react';
import productData from "./Products.json"
import Link from 'next/link';


interface Product {
    id: string;
    title: string;
    
}

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Product[]>([]);

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const filteredResults = productData.filter((product) =>
            product.category.toLowerCase().includes(searchQuery.toLowerCase()) || product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredResults);
        
    };


    const clearSearchResults = () => {
        setSearchResults([])

    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium border border-gray-900 sr-only">
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500"
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
                        className="block w-full p-4 pl-10 text-sm bg-slate-200"
                        placeholder="Search...."
                        required
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Search
                    </button>
                </div>
            </form>

            {searchResults.length > 0 && (
                <div className="mt-4 bg-white rounded-lg">
                    <h2 className=" text-lg font-medium mb-2">
                        Search Results:
                    </h2>
                    <ul>
                        {searchResults.map((product) => (
                            <li key={product.id} className="mb-2">

                                <Link
                                    href={`/ViewProduct/${product.id}`}
                                    className="w-full inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-white hover:bg-gray-800 hover:border-white  hover:text-white rounded-lg focus:ring-4 focus:outline-none"
                                    onClick={clearSearchResults}
                                    >
                                    {product.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}