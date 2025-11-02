import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="pt-16 pb-7 mt-10">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col min-[830px]:flex-row items-center justify-between gap-6 pb-10 border-b-2 border-gray-700">
        <Link href="/">
         <img src="./logo.png" alt="Logo" className='w-20'/>
        </Link>
        <ul className="flex flex-wrap text-sm sm:text-base items-center gap-3 sm:gap-12">
          <li><a href="jaascript:;"
              className="font-normal text-gray-400 transition-all duration-100 hover:text-purple-600 focus-within:text-purple-600 focus-within:outline-0">SmartTrack</a>
          </li>
          <li><a href="jaascript:;"
              className="font-normal text-gray-400 transition-all duration-100 hover:text-purple-600 focus-within:text-purple-600 focus-within:outline-0">Products</a>
          </li>
          <li><a href="jaascript:;"
              className="font-normal text-gray-400 transition-all duration-100 hover:text-purple-600 focus-within:text-purple-600 focus-within:outline-0">Blogs</a>
          </li>
          <li><a href="jaascript:;"
              className="font-normal text-gray-400 transition-all duration-100 hover:text-purple-600 focus-within:text-purple-600 focus-within:outline-0">Support</a>
          </li>
        </ul>
      </div>
      <div className="pt-7 text-center">
        <span className="text-sm font-normal text-gray-500">© <a href="https://pagedone.io/">smarttrack</a> Since 2025, All rights reserved.</span>
      </div>
    </div>
  </footer>
  )
}

export default Footer
