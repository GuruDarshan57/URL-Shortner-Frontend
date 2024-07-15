import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

const SignUp = () => {
    const [uname, setUname] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const navigate = useNavigate();

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
                const res = await fetch(import.meta.env.VITE_Backend + "/user/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user),
                    credentials: 'include'
                })
                const resp = await res.json()
                if (res.status === 200) {
                    toast.success(resp.msg)
                    setTimeout(() => {
                        navigate('/signin')
                    }, 2000);
                }
                else {
                    toast.warning(resp.msg)
                }
            }
            catch (err) {
                console.log(err)
            }
        }
    }
    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: 'column' }}>
                <input type="text" placeholder='Username' value={uname} onChange={(e) => { setUname(e.target.value) }} />
                <input type="email" placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                <input type="password" placeholder='Password' value={pass} onChange={(e) => { setPass(e.target.value) }} />
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp