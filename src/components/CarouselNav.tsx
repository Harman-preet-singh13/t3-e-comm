import Link from "next/link";
import { AiOutlineRight } from "react-icons/ai";
import Carousel from "react-material-ui-carousel"


export default function CarouselNav() {

    var items = [
        {
            id: 5,
            "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
            "price": 695,
            "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl.",
            "category": "jewelery",
            "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
            "rating": {
                "rate": 4.6,
                "count": 400
            }
        },
        {
            id: 2,
            "title": "Mens Casual Premium Slim Fit T-Shirts ",
            "price": 22.3,
            "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. ",
            "category": "men's clothing",
            "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
            "rating": {
                "rate": 4.1,
                "count": 259
            }
        },
        {
            id: 1,
            "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            "price": 109.95,
            "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            "category": "men's clothing",
            "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            "rating": {
                "rate": 3.9,
                "count": 120
            }
        }
    ]

    return (
        <Carousel>
            {
                items.map((item) => {
                    return (
                        <div className="flex my-5 md:mx-48 shadow-lg rounded-2xl">
                            <div className="w-full max-h-72">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className=" lg:w-56"
                                />
                            </div>
                            <div key={item.id}>
                                <h1 className=" font-semibold text-lg ">
                                    {item.title}
                                </h1>
                                <h1 className=" font-light">
                                    {item.description}
                                </h1>
                                <h1 className=" font-semibold">
                                    ₹ {item.price}
                                </h1>
                                <div className=" mb-2">
                                    <Link
                                        href={`/ViewProduct/${item.id}`}
                                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        View
                                        <AiOutlineRight className=" text-base m-1" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </Carousel>
    );
}