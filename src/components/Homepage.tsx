import CarouselNav from "./CarouselNav";
import ProductMenu from "./ProductMenu";

export default function Homepage() {
  return (
     
      <div className=" container mx-auto">
        <div className=" border rounded-2xl my-5 ">
          <CarouselNav />
        </div>

      
        <h1 className="text-2xl font-semibold">
          Popular Items
        </h1>
        <ProductMenu />
      </div>
   
  )
}
