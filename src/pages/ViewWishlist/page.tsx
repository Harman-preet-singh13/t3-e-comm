import Head from 'next/head'
import React, { useState } from 'react'
import NavBar from '~/components/Navbar'
import { api } from '~/utils/api'
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { AiOutlineRight } from 'react-icons/ai';



export default function page() {

    const router = useRouter()


    const getWishlistQuery = api.manager.getWishlist.useQuery()

    const dataTimeFormatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', year: '2-digit', month: '2-digit', day: '2-digit' })

    const [Disable, setDisable] = useState(false)

    const delelteHandler = (orderId: string) => {

        setDisable(true)

        toast((t) => (
            <div>
                <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                    <p className="font-bold">Warning</p>
                    <p>Are you sure to remove the product from wishlist</p>

                </div>
                <div className="flex justify-evenly">
                    <button
                        className="w-full hover:bg-red-500 hover:text-white border-2 border-black focus:border-red-300 focus:outline-none focus:ring focus:ring-red-300"
                        onClick={() => handleDeleteOrder(orderId)}>
                        Yes
                    </button>
                    <button
                        className="w-full hover:bg-green-300 hover:text-white border-2 border-black"
                        onClick={() => handleNoClick(t.id)}>
                        No
                    </button>
                </div>

            </div>

        ), {
            duration: 20000,

        }
        )

    }

    const deleteWishlist = api.manager.deleteWishlist.useMutation({
        onSuccess: () => {
            router.reload();
        }
    })

    function handleDeleteOrder(orderId: string) {

        deleteWishlist.mutate({ id: orderId })
    }



    const handleNoClick = (toastId: string | undefined) => {
        toast.dismiss(toastId);
        setDisable(false);
    };

    return (
        <div>
            <Head>
                <title>
                    T3-Ecomm- Wishlist
                </title>
            </Head>
            <NavBar />
            <div className=" container mx-auto">
                <div className="mx-5 md:mx-10">
                    <div className="">
                        <button
                            onClick={() => router.back()}
                            className="w-full flex border shadow-sm"
                        >
                            <BiArrowBack
                                className="text-4xl"
                            />
                            <h1 className="text-lg m-1 font-bold">
                                Go back
                            </h1>
                        </button>
                    </div>
                    {getWishlistQuery.data ? (
                        <div>
                            <h1 className="text-2xl font-semibold mb-4">Your Wishlist</h1>
                            {getWishlistQuery.data.length > 0 ? (
                                <ul className="space-y-4">
                                    {getWishlistQuery.data.map((order) => (
                                        <li key={order.id} className="border p-4 rounded-md ">
                                            <div className="flex flex-col md:flex-row justify-around">
                                                <div className=" w-40">
                                                    {order.product_image ? (
                                                        <img
                                                            src={order.product_image}
                                                            className=" "
                                                        />
                                                    ) : null}
                                                </div>
                                                <div className=" font-semibold text-sm md:text-base">
                                                    <div className="flex mb:0 md:mb-5">
                                                        <h1 className=" ">
                                                            Title-
                                                        </h1>
                                                        <h1 className=" text-blue-500">
                                                            {order.product_title}
                                                        </h1>
                                                    </div>

                                                    <div className=" flex gap-5">
                                                        <div className=" mb-2">
                                                            <Link
                                                                href={`/ViewProduct/${order.product_id}`}
                                                                className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                                View
                                                                <AiOutlineRight className=" text-base m-1" />
                                                            </Link>
                                                        </div>
                                                        <div className="mb-5">
                                                            <button
                                                                className="px-2 py-1 rounded-md text-white  bg-red-600 hover:bg-red-800"
                                                                onClick={() => delelteHandler(order.id)}
                                                                disabled={Disable}
                                                            >
                                                                Remove from Wishlist
                                                            </button>
                                                            <Toaster />
                                                        </div>

                                                    </div>



                                                </div>

                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Nothing added to wishlist</p>
                            )}
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    )
}
