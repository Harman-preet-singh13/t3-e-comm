import { useRouter } from "next/router";
import { useEffect, useState } from "react"


export default function RedirectToHome() {

    const [redirectSec, setRedirectSec] = useState<number>(5);
    const router = useRouter();

    useEffect(() => {

        if (redirectSec === 0) {
            router.push("/")
            return;
        }

        setTimeout(() => {
            setRedirectSec((redirectSec) => redirectSec - 1)
        }, 1000)
    }, [redirectSec])

    return (
        <div className="container mx-auto pt-20">
            <header className="flex justify-around item-center mb-4">
                <h1 className=" text-lg md:text-2xl">
                    Your order is added redirecting to Homepage in {redirectSec} seconds....
                </h1>
            </header>
        </div>
    )
}
