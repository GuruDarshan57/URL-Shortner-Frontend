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
            toast.error("Username or Email or Password can't be empty.")
        }
        else {
            const user = {
                username: uname,
                email: email,
                password: pass
            }
            try {
                const res = await fetch("http://localhost:3000/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                })
                const resp = await res.json()
                if (resp.msg == "created") {
                    toast.success("SignUp Successfull. Redirecting to SignIn")
                    setTimeout(() => {
                        return navigate('/signin')
                    }, 4000);
                }
                else if (resp.msg == "duplicate") {
                    toast.warning("Email exists already. Please SignIn")
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