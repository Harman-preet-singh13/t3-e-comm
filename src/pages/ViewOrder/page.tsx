import Head from 'next/head'
import React, { useState } from 'react'
import { api } from '~/utils/api'
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';



export default function page() {

    const router = useRouter()

    const getOrderQuery = api.manager.getOrder.useQuery()

    const dataTimeFormatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', year: '2-digit', month: '2-digit', day: '2-digit' })

    const [Disable, setDisable] = useState(false)

    const delelteHandler = (orderId: string) => {

        setDisable(true)

        toast((t) => (
            <div>
                <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                    <p className="font-bold">Warning</p>
                    <p>Are you sure to cancel the order</p>

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

        ),{
            duration: 20000,
            
        }
        )

    }

    const deleteOrder = api.manager.deleteOrder.useMutation({
        onSuccess:() => {
            router.reload();
        }
    })

    function handleDeleteOrder(orderId:string) {
        
        deleteOrder.mutate({id: orderId})
    }

    

    const handleNoClick = (toastId: string | undefined) => {
        toast.dismiss(toastId);
        setDisable(false); 
    };

    return (
        <div>
            <Head>
                <title>
                    T3-Ecomm- Order
                </title>
            </Head>
           
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
                    {getOrderQuery.data ? (
                        <div>
                            <h1 className="text-2xl font-semibold mb-4">Your Orders</h1>
                            {getOrderQuery.data.length > 0 ? (
                                <ul className="space-y-4">
                                    {getOrderQuery.data.map((order) => (
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
                                                    <div className="flex mb:0 md:mb-5">
                                                        <h1 className=" ">
                                                            Ordered On-
                                                        </h1>
                                                        <h1 className=" text-blue-500">
                                                            {dataTimeFormatter.format(order.createdAt)}
                                                        </h1>
                                                    </div>
                                                    <div className="flex mb:0 md:mb-5">
                                                        <h1 className=" ">
                                                            Estimated delivery time-
                                                        </h1>
                                                        <h1 className=" text-gray-500">
                                                            Procesing
                                                        </h1>
                                                    </div>
                                                    <div className="flex flex-col md:flex-row mb:0 md:mb-5">
                                                        <h1 className=" ">
                                                            Reference IDs-
                                                        </h1>
                                                        <h1 className=" text-gray-500">
                                                            {order.id}
                                                        </h1>
                                                    </div>
                                                    <div className="mb-5">
                                                        <button
                                                            className="px-2 py-1 rounded-md text-white  bg-red-600 hover:bg-red-800"
                                                            onClick={()=>delelteHandler(order.id)}
                                                            disabled={Disable}
                                                        >
                                                            Cancel Order
                                                        </button>
                                                        <Toaster />
                                                    </div>

                                                </div>
                                                {/* <div>
                                                    <div className=" self-center">
                                                        <button
                                                        onClick={delelteHandler}
                                                        >
                                                        <BsFillTrashFill className=" text-lg text-red-500"/>
                                                        </button>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No Orders</p>
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
