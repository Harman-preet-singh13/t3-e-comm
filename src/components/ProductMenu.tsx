import Link from "next/link"
import productData from "./Products.json"
import { AiOutlineRight } from "react-icons/ai"

export default function ProductMenu() {


  return (
    <div className="grid gap-10 items-stretch my-10 mx-10 shadow-md sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
       
      {
        productData.map((product) => {
          return (
            <div key={product.id} className=" flex flex-col justify-between self-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow-md">
              <a href="#" className="">
                <img className="mx-16 px-5 max-h-30 rounded-t-lg w-40" src={product.image} alt="" />
              </a>
              <div className=" p-5 ">
                <a href="#">
                  <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900">
                    {product.title}
                  </h5>
                </a>
                <p className="mb-3 font-semibold text-gray-700 ">
                  ₹ {product.price}
                </p>
                
              </div>
              <div className="ml-5 mb-2">
                <Link 
                href={`/ViewProduct/${product.id}`} 
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  View
                  <AiOutlineRight className=" text-base m-1" />
                </Link>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
