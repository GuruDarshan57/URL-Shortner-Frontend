import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate()
    return (
        <div className='flex w-screen place-content-center footer'>
            <div className='flex flex-col sm:flex-row w-11/12 sm:w-1/2 justify-between'>
                <div className='flex font-playwrite place-content-center'>
                    Shortify
                </div>
                <div className='flex gap-4 place-content-center mt-2 sm:mt-0'>
                    <a href="https://github.com/GuruDarshan57" target="_blank"><i className="fa-brands fa-square-git text-2xl cursor-pointer" style={{ color: "#ffffff" }} ></i></a>
                    <a href="https://www.linkedin.com/in/gurudarshan-l-772a1b25b/" target="_blank"><i className="fa-brands fa-linkedin text-2xl cursor-pointer" style={{ color: "#ffffff" }}></i></a>
                </div>
                <div className='flex mt-2 sm:mt-0 tracking-wider font-medium place-content-center'>
                    Copyright © {new Date().toString().slice(10, 15)} GuruDarshan
                </div>
            </div>
        </div>
    )
}

export default Footer