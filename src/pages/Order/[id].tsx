import { GetStaticPaths, GetStaticPropsContext, InferGetServerSidePropsType, NextPage } from "next";
import productData from "../../components/Products.json"
import { ssgHelper } from "~/server/api/ssgHelper";
import Head from "next/head";
import NavBar from "~/components/Navbar";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { VscSignIn } from "react-icons/vsc";
import { FormEvent, useEffect, useState } from "react";
import { api } from "~/utils/api";
import { Button } from "@mui/material";


const OrderPage: NextPage<InferGetServerSidePropsType<typeof getStaticProps>> = ({
    id,
}) => {

    const router = useRouter()
    const session = useSession()

    const [inputAddress, setInputAddress] = useState("")
    const [inputPhone, setInputPhone] = useState("")
    const [details_available, setDetailsAvailable] = useState(false)

    const product = productData.find((product) => product.id === id)


    const createAddress_details = api.manager.create.useMutation({
        onSuccess: () => {

        }
    })


    const getAddressQuery = api.manager.getAddress.useQuery()

    useEffect(() => {
        getAddressQuery.refetch()
        setDetailsAvailable(true)
    }, [])

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        createAddress_details.mutate({ address_details: inputAddress, phone_number: inputPhone })
    }

    const createOrder_details = api.manager.createOrder.useMutation({})

    function handleOrder() {
        if (product?.id) {
            createOrder_details.mutate({ product_id: product.id, product_title: product.title, product_image: product.image });
        }

        router.push({
            pathname: `/Redirect/RedirectToHome`
        })
    }

    return (
        <div>
            <Head>
                <title>
                    {`T3-Ecomm- ${product?.title}`}
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

                    <div>
                        {session.status !== "authenticated"
                            ?
                            <div className="flex gap-2 flex-col md:flex-row">
                                <h1 className="sm:text-bs md:text-2xl font-semibold">
                                    You are not logged in. Please log in first..
                                </h1>
                                <div className=" text-center">
                                    <button
                                        className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                        onClick={() => void signIn()}
                                    >
                                        <div className="flex">
                                            Log in
                                            <VscSignIn className=" m-1 text-lg" />
                                        </div>
                                    </button>
                                </div>
                            </div>
                            :


                            <div>
                                {
                                    details_available
                                        ?
                                        <div className="mt-5">
                                            <div className="flex gap-10 justify-center flex-col md:flex-row">
                                                <div>
                                                    <h1 className=" text-lg font-semibold">
                                                        Image-
                                                    </h1>
                                                    <div className=" w-52">
                                                        <img src={product?.image} alt={product?.category} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="mt-5 flex gap-2">
                                                        <h1 className=" text-lg font-semibold">
                                                            Title-
                                                        </h1>
                                                        <h1 className=" text-lg font-semibold text-blue-800">
                                                            {product?.title}
                                                        </h1>
                                                    </div>
                                                    {getAddressQuery.data ? (
                                                        <div>
                                                            <div className="mt-5 flex gap-2">
                                                                <h1 className="text-lg font-semibold">Address-</h1>
                                                                <h1 className="text-lg font-semibold text-slate-500">
                                                                    {getAddressQuery.data.address_details}
                                                                </h1>
                                                            </div>
                                                            <div className="mt-5 flex gap-2">
                                                                <h1 className="text-lg font-semibold">Phone No.-</h1>
                                                                <h1 className="text-lg font-semibold text-slate-500">
                                                                    {getAddressQuery.data.phone_number}
                                                                </h1>
                                                            </div>
                                                        </div>
                                                    ) : null}
                                                    <div className="mt-5 flex gap-2">
                                                        <h1 className=" text-lg font-semibold">
                                                            Payment-
                                                        </h1>
                                                        <h1 className=" text-lg font-semibold text-slate-500">
                                                            ₹{product?.price}-COD only
                                                        </h1>
                                                    </div>
                                                    <div className="mt-5">
                                                        
                                                            <button
                                                                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                                                                onClick={handleOrder}
                                                            >
                                                                Confirm Order
                                                            </button>

                                                        
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        :
                                        <div className="mt-5">
                                            <div className="flex gap-2">
                                                <h1 className=" text-lg font-semibold">
                                                    Title-
                                                </h1>
                                                <h1 className=" text-lg font-semibold text-blue-800">
                                                    {product?.title}
                                                </h1>
                                            </div>
                                            <form onSubmit={handleSubmit} className="mt-5">
                                                <div className="relative z-0 w-full mb-6 group">
                                                    <input
                                                        type="text"
                                                        name="floating_text"
                                                        id="floating_text"
                                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=" "
                                                        value={inputAddress}
                                                        onChange={(e) => setInputAddress(e.target.value)}
                                                        required
                                                    />
                                                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                        Address
                                                    </label>
                                                </div>

                                                <div className="">
                                                    <div className="relative z-0 w-full mb-6 group">
                                                        <input
                                                            type="tel"

                                                            name="floating_phone"
                                                            id="floating_phone"
                                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                            placeholder=" "
                                                            value={inputPhone}
                                                            onChange={(e) => setInputPhone(e.target.value)}
                                                            required
                                                        />
                                                        <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus: peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
                                                    </div>

                                                </div>
                                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">
                                                    Submit
                                                </button>
                                                <h1 className=" text-sm text-slate-500">
                                                    *Enter your details first..
                                                </h1>
                                            </form>
                                            <div className="mt-5 flex gap-2">
                                                <h1 className=" text-lg font-semibold">
                                                    Payment-
                                                </h1>
                                                <h1 className=" text-lg font-semibold text-slate-500">
                                                    ₹{product?.price}-COD only
                                                </h1>
                                            </div>
                                            <div className="mt-5">
                                                <Button variant="contained" disabled>
                                                    Confirm Order
                                                </Button>
                                            </div>
                                        </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: "blocking",
    }
}


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

export default OrderPage