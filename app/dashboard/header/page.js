import React from 'react'

const Header = () => {
  return (
    <div className='w-full flex justify-between py-1'>
        <h1 className='text-red-500 text-4xl' style={{ fontFamily: 'cursive' }}>Blog Platform</h1>
        <div>
            <button className='border border-black cursor-pointer px-2 py-1 border rounded-lg'>
                Sign In
            </button>
        </div>
    </div>
  )
}

export default Header