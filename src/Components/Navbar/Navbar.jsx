import React, { useState } from 'react';
import useGetUserDetails from '../../hooks/useGetUserDetails';

const Navbar = () => {
    const { user_data } = useGetUserDetails();
    const path = window.location.pathname;
    const commonClasses = "flex-1 flex border-2 border-white p-2 place-content-center hover:bg-white hover:text-black uppercase font-bold tracking-wider";
    const getLinkClass = (linkPath) => `${commonClasses} ${path === linkPath ? 'bg-white text-black' : ''}`;
    const [toogle, setToggle] = useState("false")
    const links = [
        { path: '/', label: 'Home' },
        { path: '/generate', label: 'Generate S-URL' },
        { path: '/signin', label: 'Sign in', condition: !user_data },
        { path: '/signup', label: 'Sign Up', condition: !user_data },
        { path: '/analytics', label: 'Analytics', condition: user_data },
        { path: '/admin', label: 'Admin', condition: user_data?.role === 'Admin' },
        { path: '/profile', label: 'Profile', condition: user_data },
    ];

    return (
        <div className='flex p-4 place-content-center w-screen'>
            <div className='flex flex-col w-11/12 md:w-4/5 lg:w-3/5 xl:w-1/2 sm:border-2 sm:border-white'>
                <div className='sm:hidden flex text-xl tracking-normal m-2 place-content-between'>
                    <div className='font-playwrite'>
                        Shortify
                    </div>
                    <div>
                        {toogle ? <i className="fa-solid fa-x text-2xl" style={{ color: "#ffffff" }} onClick={() => { setToggle(false) }}></i> : <i className="fa-solid fa-bars text-2xl" style={{ color: "#ffffff" }} onClick={() => { setToggle(true) }}></i>}
                    </div>
                </div>
                <div className={`${toogle ? "flex-col" : "hidden"} sm:flex sm:flex-row w-full justify-evenly pt-2 sm:p-0`} >
                    {links.map(({ path, label, condition = true }) =>
                        condition ? (
                            <a key={path} className={getLinkClass(path)} href={path} >
                                {label}
                            </a>
                        ) : null
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
