import Link from "next/link";
import productData from "./Products.json";


export default function ProductMenu() {
  return (
    <div className="mx-10 my-10 grid  gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {productData.map((product) => {
        return (
          <Link 
          href={`/ViewProduct/${product.id}`}
            key={product.id}
            className="max-w-sm flex flex-col justify-between rounded-lg border border-gray-200"
          >
            
              <img
                className=" mx-16 w-40 rounded-t-lg px-5"
                src={product.image}
                alt=""
              />
              <div className=" p-5 ">
                <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900">
                  {product.title}
                </h5>

                <p className="mb-3 font-semibold text-gray-700 ">
                  ₹ {product.price}
                </p>
              </div>
            </Link>
          
        );
      })}
    </div>
  );
}
