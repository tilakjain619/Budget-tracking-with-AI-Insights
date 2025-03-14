"use client";
import useAuthStore from '@/store/authStore';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();

  const onToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex justify-between bg-gray-900 px-2 sticky top-0 z-10 py-2 items-center w-full mx-auto">
      <Link href={user ? '/dashboard' : '/'}><Image className='w-20 mx-3 my-1' src="/logo.png" width={200} height={100} alt='Smart Track'/></Link>
      <div
        className={`nav-links bg-gray-900 mt-2 md:mt-0 py-6 md:py-0 h-[90vh] bg-opacity-75 backdrop-blur-sm top-16 md:top-0 duration-300 md:static absolute md:h-fit ${
          isMenuOpen ? 'left-[0%] h-[90vh]' : 'left-[-100%]'
        } md:w-auto w-full flex md:items-center px-5`}
      >
        <ul className="flex md:flex-row flex-col md:items-center md:gap-[3vw] gap-8">
          <li>
            <Link className="hover:text-gray-500" href="/login">
              Login
            </Link>
          </li>
          <li>
            <Link className="hover:text-gray-500" href="/signup">
              Signup
            </Link>
          </li>
          <li>
            <Link className="hover:text-gray-500" href="#">
              About
            </Link>
          </li>
        </ul>
      </div>
      <div onClick={onToggleMenu}
          name={isMenuOpen ? 'close' : 'menu'}
          className="text-3xl px-3 cursor-pointer md:hidden text-white">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#fff"} fill={"none"}>
    <path d="M10 5L20 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 12L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 19L14 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
      </div>
    </nav>
  );
};

export default Navbar;
