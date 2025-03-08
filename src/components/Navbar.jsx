import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='px-4 py-3'>
        <Image className='w-20' src="/logo.png" width={200} height={100} alt='Smart Track'/>
    </nav>
  )
}

export default Navbar
