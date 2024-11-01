import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaGitSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
    const navigate = useNavigate()
    return (
        <div className='flex w-screen place-content-center footer text-white'>
            <div className='flex flex-col sm:flex-row w-11/12 sm:w-1/2 justify-between'>
                <div className='flex font-playwrite place-content-center'>
                    Shortify
                </div>
                <div className='flex gap-4 place-content-center mt-2 sm:mt-0'>
                    <a className='place-content-center' href="https://github.com/GuruDarshan57" target="_blank"><span className='text-2xl cursor-pointer'><FaGitSquare /></span></a>
                    <a className='place-content-center' href="https://www.linkedin.com/in/gurudarshan57/" target="_blank"><span className='text-2xl cursor-pointer'><FaLinkedin /></span></a>
                </div>
                <div className='flex mt-2 sm:mt-0 tracking-wider font-medium place-content-center'>
                    Copyright © {new Date().toString().slice(10, 15)} GuruDarshan
                </div>
            </div>
        </div>
    )
}

export default Footer