"use client";

import Link from "next/link";
import Image from "next/image";
import Cart from "@/public/cart.png";
import login from "@/public/login.png";
import register from "@/public/register.png";
import logout from '@/public/Logout.png';

import "./header.scss";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "@/redux/slice/authSlice";
// import { useEffect, useMemo } from "react";


const Header = () => {
  const { isAuth, cart } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(cart);
  const exitAuth = () => {
    const res = confirm("Do you want to log out of this account?");
    if (res) {
      dispatch(setAuth());
    }
  };


  return (
    <header className="header">
      <div className="container">
        <nav className="header__nav">
          <Link href="/" className="text-cyan-50 font-bold">
            E-commerce
          </Link>
          <div className="header__nav--list">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            {isAuth ? (
              <div className="flex gap-2 items-center">
                <Link href="/archive">Archive</Link>
                <Link
                  href="/account"
                  className="bg-slate-100 p-2 px-5 rounded-md text-blue-500"
                >
                  <span className="text-blue-500 flex gap-1">
                    <Image width={20} src={login} alt="fdf" />
                    Account
                  </span>
                </Link>
                <div
                  onClick={exitAuth}
                  className="bg-slate-100 p-2 px-5 rounded-md text-blue-500"
                >
                  <span  className="text-blue-500 flex gap-1 font-bold cursor-pointer">
                    <Image width={20} src={logout} alt="fdf" />
                    Logout
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/register"
                  className="bg-slate-100 p-2 px-5 rounded-md text-blue-500"
                >
                  <span className="text-blue-500 flex gap-2">
                    <Image width={20} src={register} alt="fdf" />
                    Register
                  </span>
                </Link>
                <Link
                  href="/login"
                  className="bg-slate-100 p-2 px-5 rounded-md text-blue-500"
                >
                  <span className="text-blue-500 flex gap-1">
                    <Image width={20} src={login} alt="fdf" />
                    Login
                  </span>
                </Link>
              </div>
            )}
            <Link className="cart_warpper " href="/cart">
              <Image src={Cart} alt="Cart" />
              <span>{cart.length}</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
