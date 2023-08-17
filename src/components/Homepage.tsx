import CarouselNav from "./CarouselNav";
import Navbar from "./Navbar";
import ProductMenu from "./ProductMenu";

export default function Homepage() {
  return (
    <div>
      <Navbar />
      <div className=" container mx-auto">
        <div className="mb-5">
          <CarouselNav />
        </div>

        <hr />
        <h1 className="text-2xl font-semibold">
          Popular Items
        </h1>
        <ProductMenu />
      </div>
    </div>
  )
}
