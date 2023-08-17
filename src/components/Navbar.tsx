import { signIn, signOut, useSession } from "next-auth/react";
import { GiHamburgerMenu } from "react-icons/gi"
import { AiOutlineClose } from "react-icons/ai"
import { VscSignIn, VscSignOut } from "react-icons/vsc"
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"
import { useState } from "react";
import Link from "next/link";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from "next/router";
import SearchBar from "./SearchBar";

export default function NavBar() {


    const session = useSession()

    const [navbar, setNavbar] = useState(false)

    const [anchor, setAnchor] = useState<null | HTMLElement>(null)
    const open = Boolean(anchor)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setAnchor(null)
    }


    const router = useRouter()

    const orderhandler = () => {

        router.push(`/ViewOrder/page`)

        console.log("order")
    }

    const wishlisthandler = () => {
        router.push(`/ViewWishlist/page`)
        console.log("wish")
    }


    return (

        <nav className="w-full bg-gray-800 shadow">
            <div className=" justify-around px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">

                        <Link href="/">
                            <div className="md:mr-5 flex items-center">
                                <img src="https://create.t3.gg/images/t3-light.svg" className="h-8 mr-3" alt="T3 Logo" />
                                <span className=" self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                                    T3-Ecomm
                                </span>
                            </div>
                        </Link>

                        <div className="md:hidden">
                            <button
                                className="text-white text-3xl p-2 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <AiOutlineClose className=" fill-white" />
                                ) : (
                                    <GiHamburgerMenu />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex-grow">
                    <SearchBar />
                </div>
                <div>
                    <div
                        className={` justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? 'block' : 'hidden'
                            }`}
                    >
                        <ul className=" items-center space-y-4 flex justify-around md:flex md:space-x-6 md:space-y-0">


                            <li className="text-white px-2 py-2">
                                {session.status === "authenticated"
                                    ? <div>


                                        <Button
                                            id="basic-button"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick}
                                            variant="contained"
                                            className="  bg-blue-600 hover:bg-blue-800"
                                            style={{ textTransform: 'none' }}
                                        >
                                            Account
                                            {open ? (
                                                <IoMdArrowDropup className=" text-lg" />
                                            ) : (
                                                <IoMdArrowDropdown className=" text-lg" />
                                            )}
                                        </Button>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchor}
                                            open={open}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <MenuItem onClick={handleClose}>
                                                <div className=" text-sm self-center font-semibold">
                                                    Hello, <span className=" text-blue-500">{session.data.user.name}</span>
                                                </div>
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <Link
                                                href={`/ViewOrder/page`}
                                                onClick={orderhandler}
                                                >
                                                    View Order
                                                </Link>
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                            <Link
                                                href={`/ViewWishlist/page`}
                                                onClick={wishlisthandler}
                                                >
                                                    View Wishlist
                                                </Link>
                                            </MenuItem>
                                            

                                            <MenuItem onClick={handleClose}>
                                                <div className="text-sm self-center">
                                                    <button
                                                        className="bg-red-600 hover:bg-red-800 text-white font-semibold hover:text-white mb-1 py-1 px-2 border border-red-200 hover:border-transparent rounded"
                                                        onClick={() => void signOut()}
                                                    >
                                                        <div className="flex ">
                                                            Log out
                                                            <VscSignOut className=" m-0.5 text-lg" />
                                                        </div>
                                                    </button>
                                                </div>
                                            </MenuItem>
                                        </Menu>

                                    </div>
                                    : <div>
                                        <button
                                            className="bg-transparent hover:bg-blue-500 text-blue-100 font-semibold hover:text-white py-2 px-4 border border-blue-200 hover:border-transparent rounded"
                                            onClick={() => void signIn()}
                                        >
                                            <div className="flex">
                                                Log in
                                                <VscSignIn className=" m-1 text-lg" />
                                            </div>
                                        </button>
                                    </div>
                                }
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}


