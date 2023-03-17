import Head from "next/head";
import Link from "next/link";
import { ToastContainer } from 'react-toastify';
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import 'react-toastify/dist/ReactToastify.css';
import { Menu } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import DropDownLink from "./DropDownLink";
import Cookies from "js-cookie";
function Layout({ title, children }) {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setcartItemsCount] = useState(0);
  useEffect(() => {
    setcartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
  }, [cart.cartItems])

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' })
    signOut({ callbackUrl: '/login' })
    console.log("Logout button was clicked")
  }
  return (
    <>
      {/* <Navbar /> */}
      <div>
        <Head>
          <title>{title ? title + "Gadget-at-Guru" : "Finance-at-Guru"}</title>
          <meta name="description" content="Ecommerce Website" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ToastContainer position="bottom-center" limit={1} />
        <div className="flex min-h-screen flex-col justify-between">
          <header>
            <nav className="flex h-12 items-center p-4 justify-between shadow-md">
              <Link className="text-lg font-bold" href="/">
                Gadget-at-Guru
              </Link>
              <div>
                <Link className="p-2" href="/cart">
                  Cart
                  {cartItemsCount > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
                {status === 'loading' ? ('Loading.....') :
                  session?.user ? (<Menu as="div" className="relative inline-block">
                    <Menu.Button className="text-blue-600">
                      {session.user.name}
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg">
                      <Menu.Item>
                        <DropDownLink className="dropdown-link" href="/profile">Profile</DropDownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <DropDownLink className="dropdown-link" href="/order-history">Order History</DropDownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <DropDownLink className="dropdown-link" href="#" onClick={logoutClickHandler}>Logout</DropDownLink>
                      </Menu.Item>

                    </Menu.Items>
                  </Menu>)
                    : <Link href="/login">Login</Link>}
              </div>
            </nav>
          </header>
          <main className="container m-auto mt-4 px-4">{children}</main>
          <footer className="flex h-10 justify-center items-center shadow-inner">
            <p>Copyright 2023 Gadget-at-guru</p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Layout;
