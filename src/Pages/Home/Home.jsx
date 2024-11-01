import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import useGetUserDetails from '../../hooks/useGetUserDetails'
import { FaLink } from "react-icons/fa6";
import { FaShareNodes } from "react-icons/fa6";
import { FaChartSimple } from "react-icons/fa6";

const Home = () => {
    const { user_data } = useGetUserDetails()
    const navigate = useNavigate()
    const handleClick = () => {
        user_data ? navigate("/generate") : navigate("/signin")
    }
    return (
        <div className='mt-36 sm:mt-0 w-screen flex place-content-center text-center text-white'>
            <div className=' w-11/12 sm:w-1/2'>
                <div className='font-playwrite text-5xl sm:text-6xl py-4 font-light'>Shortify</div>
                <div className='uppercase tracking-widest text-xs relative right-4'>Simplify Your Links</div>
                <div className='py-16 sm:py-10 text-4xl font-bold text-orange-400' >Shorten, Share, and Track your URL's effortlessly.</div>
                <div><button className='w-40 p-1 border-4 uppercase tracking-wider hover:bg-white font-bold hover:text-black' onClick={handleClick}>Get Started</button></div>
                <div className='flex justify-center gap-8 p-4 pt-10 sm:mt-4'>
                    <a href={"/analytics"} className='border-2 p-4 rounded-full border-slate-400 cursor-pointer hover:bg-white hover:text-black'><span className=''><FaLink /></span></a>
                    <a href={"/analytics"} className='border-2 p-4 rounded-full border-slate-400 cursor-pointer hover:bg-white hover:text-black'><span className=''><FaShareNodes /></span></a>
                    <a href={"/analytics"} className='border-2 p-4 rounded-full border-slate-400 cursor-pointer hover:bg-white hover:text-black'><span className=''><FaChartSimple /></span></a>
                </div>
            </div>
        </div>
    )
}

export default Home