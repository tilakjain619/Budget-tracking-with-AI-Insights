import React from 'react'

const Loader = () => {
    return (
        <div className='w-12'>
            <div
                className="p-2 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 md:w-12 md:h-12 h-10 w-10 aspect-square rounded-full"
            >
                <div
                    className="rounded-full bg-gray-800 h-full w-full background-blur-md"
                ></div>
            </div>

        </div>
    )
}

export default Loader
