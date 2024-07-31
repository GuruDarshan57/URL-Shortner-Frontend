import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

const SignUp = () => {
    const [uname, setUname] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        toast.info('Tryout Credentials \n Email : test123@gmail.com \n Password : test', {
            autoClose: 6000,
        });
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!uname || !email || !pass) {
            toast.error("All fields are Mandatory.")
        }
        else {
            const user = {
                username: uname,
                email: email,
                password: pass
            }
            try {
                setLoader(true)
                let resp;
                setTimeout(() => {
                    resp ? "" : toast.warning("Server has started Now.\nPlease wait for few seconds", { autoClose: 4000 })
                }, 6000);
                const res = await fetch(import.meta.env.VITE_Backend + "/user/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user),
                    credentials: 'include'
                })
                resp = await res.json()
                if (res.status === 200) {
                    toast.success(resp.msg)
                    setTimeout(() => {
                        navigate('/signin')
                    }, 2000);
                }
                else {
                    toast.warning(resp.msg)
                }
                setLoader(false)
            }
            catch (err) {
                console.log(err)
                setLoader(false)
            }
        }
    }
    return (
        <div className='flex place-content-center w-screen'>
            {loader ? <div className="loader"></div> : <div className='flex-col w-11/12 px-3 sm:px-0 sm:w-1/2'>
                <div><h2 className='uppercase mt-3 text-4xl font-bold tracking-wider'>Sign Up</h2></div>
                <form className='flex-col gap-5' onSubmit={handleSubmit} style={{ display: "flex", flexDirection: 'column' }}>
                    <input className='border-2 bg-black h-10 p-2 mt-3 focus:outline-none' type="text" placeholder='Enter Your Name' value={uname} onChange={(e) => { setUname(e.target.value) }} />
                    <input className='border-2 bg-black h-10 p-2 focus:outline-none' type="email" placeholder='Enter Your Email ID' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <input className='border-2 bg-black h-10 p-2 focus:outline-none' type="password" placeholder='Enter Your Password' value={pass} onChange={(e) => { setPass(e.target.value) }} />
                    <button className='uppercase w-40 h-10 text-center border-4 border-white hover:bg-white hover:text-black font-bold' type='submit' >Sign Up</button>
                </form>
            </div>}
        </div>

    )
}

export default SignUp