import React, { useState } from 'react'

const Home = () => {
    return (
        <div className='mt-36 sm:mt-0 w-screen flex place-content-center text-center'>
            <div className=' w-11/12 sm:w-1/2'>
                <div className='font-playwrite text-6xl sm:text-7xl py-4'>Shortify</div>
                <div className='uppercase tracking-widest text-xs relative right-4'>Simplify Your Links</div>
                <div className='py-16 sm:py-10 text-4xl font-bold text-slate-200'>Shorten, Share, and Track your URL's effortlessly.</div>
                <div><button className='w-40 p-2 border-4 uppercase tracking-wider hover:bg-white font-bold hover:text-black'>Get Started</button></div>
                <div className='flex justify-center gap-8 p-4 pt-10 sm:mt-4'>
                    <buttton><i class="fa-solid fa-link border-2 p-4 " style={{ color: "#ffffff" }}></i></buttton>
                    <buttton><i class="fa-solid fa-share-nodes border-2 p-4" style={{ color: "#ffffff" }}></i></buttton>
                    <buttton><i class="fa-solid fa-chart-simple border-2 p-4" style={{ color: "#ffffff" }}></i></buttton>
                </div>
            </div>
        </div>
    )
}

export default Home