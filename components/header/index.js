import Link from "next/link";
import Image from "next/image";
import cart from '@/public/cart.png'


import './header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <nav className="header__nav">
          <Link href="/" className="text-cyan-50 font-bold">E-commerce</Link>
          <div className="header__nav--list">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact Us</Link>
            {/* <Link href="/login">Login</Link> */}
            <Link className="cart_warpper" href="/cart"><Image src={cart} alt="Cart"/><span>0</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
