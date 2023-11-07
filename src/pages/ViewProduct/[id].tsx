import { GetStaticPaths, GetStaticPropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { ssgHelper } from "~/server/api/ssgHelper";
import productData from "../../components/Products.json"
import Rating from '@mui/material/Rating';
import { BiArrowBack } from "react-icons/bi"
import Link from "next/link";
import { AiOutlineRight } from "react-icons/ai";
import Head from "next/head";
import toast, { Toaster } from 'react-hot-toast';
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";



const ViewProductPage: NextPage<InferGetServerSidePropsType<typeof getStaticProps>> = ({
    id,
}) => {

    const session = useSession()
    
    const [isClinet, setIsClinet] = useState(false)

    useEffect(() => {
        setIsClinet(true)
    }, [])

    const product = productData.find((product) => product.id === id)


    const create_wishlist = api.manager.createWishlist.useMutation({
        onSuccess: (data) => {

            if ('alreadyInWishlist' in data) {
                toast.error("Product is already in Wishlist")
            } else {
                toast.success("Added to Wishlist")
            }

        }
    })

    function toastHandler() {

        if (product?.id) {
            create_wishlist.mutate({ product_id: product.id, product_title: product.title, product_image: product.image });

        }
    }

    function toastHandlerUnauth() {
        toast.error("Your are not logged in...")
    }

    return (

        <div>
            <Head>
                <title>
                    {`T3-Ecomm- ${product?.title}`}
                </title>
            </Head>
           
            <div className=" container mx-auto">
                <div className="">
                    <Link
                        href="/"
                        className="flex border shadow-sm"
                    >
                        <BiArrowBack
                            className="text-4xl"
                        />
                        <h1 className="text-lg m-1 font-bold">
                            Go back
                        </h1>
                    </Link>
                </div>
                <div className="mt-10 sm:mx-0 lg:mx-40 flex flex-col sm:flex-row gap-2">
                    <div className="flex-shrink-0 w-full sm:w-1/2">
                        <img
                            src={product?.image}
                            alt={product?.title}
                            className="w-full"
                        />
                    </div>
                    <div className="flex-grow mx-5">
                        <h1 className="sm:mt:0 md:mt-10 font-bold sm:text-xl md:text-3xl">
                            {product?.title}
                        </h1>
                        <div className="mt-2 flex gap-2">
                            <h1 className=" font-light">
                                {product?.rating.rate}
                            </h1>
                            <Rating
                                name="read-only"
                                value={product?.rating.rate}
                                readOnly />
                        </div>

                        <h1 className="sm:mt:0 md:mt-10 sm:font-normal md:font-semibold">
                            {product?.description}
                        </h1>
                        <h1 className="font-bold text-lg">
                            ₹{product?.price}
                        </h1>
                    </div>
                </div>
                <div className="sm:mt-5 md:mt-10 mb-5 flex justify-center gap-2">
                    <Link
                        href={`/Order/${product?.id}`}
                        className="bg-transparent hover:bg-red-500 text-red-600 font-semibold hover:text-white mb-1 py-1 px-2 border border-red-600 hover:border-transparent rounded"
                    >
                        Buy Now
                    </Link>

                    {session.status !== "authenticated"
                        ? (
                            <div>
                                <button
                                    onClick={toastHandlerUnauth}
                                    className="bg-transparent hover:bg-green-500 text-green-600 font-semibold hover:text-white mb-1 py-1 px-2 border border-green-600 hover:border-transparent rounded"
                                >
                                    Add to Wishlist
                                </button>
                                
                                    <Toaster />
                                
                            </div>
                        ) :
                        <div>
                            <button
                                onClick={toastHandler}
                                className="bg-transparent hover:bg-green-500 text-green-600 font-semibold hover:text-white mb-1 py-1 px-2 border border-green-600 hover:border-transparent rounded"
                            >
                                Add to Wishlist
                            </button>
                                <Toaster />
                        </div>
                    }

                </div>
                <hr />
                <div className=" mt-10 text-center">
                    <h1 className=" text-xl font-bold">
                       Popular Products...
                    </h1>
                    {/* hydration error */}
                    {isClinet ? getRandomProducts(): 'never render'}
                </div>
            </div>
        </div>
    )
}

function getRandomProducts() {
    const randomProducts = []
    
    const shuffledProducts = productData.slice().sort(() => 0.5 - Math.random())

    for (let i = 0; i < 4; i++) {
        randomProducts.push(shuffledProducts[i])
    }

    return (
        <div className="grid gap-10 items-stretch my-10 mx-10 shadow-md sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {
                randomProducts.map((product) => {
                    return (
                        <div key={product?.id} className=" flex flex-col justify-between self-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow-md">
                            <a href="#" className="">
                                <img className="mx-16 px-5 max-h-30 rounded-t-lg w-40" src={product?.image} alt="" />
                            </a>
                            <div className=" p-5 ">
                                <a href="#">
                                    <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900">
                                        {product?.title}
                                    </h5>
                                </a>
                                <p className="mb-3 font-semibold text-gray-700 ">
                                    ₹ {product?.price}
                                </p>

                            </div>
                            <div className="ml-5 mb-2">
                                <Link
                                    href={`/ViewProduct/${product?.id}`}
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

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: "blocking",
    };
};

export async function getStaticProps(
    context: GetStaticPropsContext<{ id: string }>
) {
    const id = context.params?.id
    const ssg = ssgHelper()

    return {
        props: {
            id,
        }
    }
}


export default ViewProductPage