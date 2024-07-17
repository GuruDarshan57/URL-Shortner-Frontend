import React from 'react';
import useGetUserDetails from '../../hooks/useGetUserDetails';

const Navbar = () => {
    const { user_data } = useGetUserDetails();
    const path = window.location.pathname;
    const commonClasses = "flex-1 flex border-2 border-white p-2 place-content-center hover:bg-white hover:text-black uppercase font-bold tracking-wider";

    const getLinkClass = (linkPath) => `${commonClasses} ${path === linkPath ? 'bg-white text-black' : ''}`;

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
            <div className='flex w-1/2 border-2 border-white'>
                <div className='flex w-full justify-evenly'>
                    {links.map(({ path, label, condition = true }) =>
                        condition ? (
                            <a key={path} className={getLinkClass(path)} href={path}>
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
