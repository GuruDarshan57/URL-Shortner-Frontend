import React, { useState } from 'react'
import useGetUserDetails from '../../hooks/useGetUserDetails'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user_data, setUser_data } = useGetUserDetails()
    const [loader, setLoader] = useState(false)

    const navigate = useNavigate()
    const handleSignout = async () => {
        try {
            setLoader(true)
            const resp = await fetch(import.meta.env.VITE_Backend + "/user/signout", {
                method: 'post',
                headers: { "Content-Type": "Application/json" },
                credentials: 'include'
            })
            const res = await resp.json()
            if (res.msg === "done") {
                toast.success("Signed Out succesfully.")
                localStorage.removeItem("user_data")
                setUser_data("")
                setTimeout(() => {
                    navigate("/")
                    window.location.reload()
                }, 2000);
            }
            setLoader(false)
        } catch (err) {
            console.log(err.message)
            setLoader(false)
        }
    }
    return (
        <div className='flex w-screen place-content-center'>
            <div className='flex-col gap-y-5 w-1/2 content-center text-center' >
                {user_data ? <>
                    <div><i className="fa-solid fa-user text-6xl mt-5" style={{ color: "#ffffff" }}></i></div>
                    <div>
                        <div className='text-xl uppercase mt-3 tracking-wider'>{user_data.name}</div>
                        <div className='mt-2'>{user_data.email}</div>
                        <div className='mt-2 uppercase'>{user_data.role}</div>
                    </div>
                    <button className='mt-2 uppercase w-40 h-10 text-center border-4 border-white hover:bg-white hover:text-black font-bold' onClick={handleSignout}>Sign Out</button></> : ""}
            </div>
        </div>

    )
}

export default Profile