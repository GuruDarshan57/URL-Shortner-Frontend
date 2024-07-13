import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const SignIn = () => {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !pass) {
            toast.error("All fields are Mandatory.")
        }
        else {
            const cred = {
                email: email,
                password: pass
            }
            try {
                const res = await fetch(import.meta.env.VITE_Backend + "/signin", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(cred),
                    credentials: 'include'
                })
                const resp = await res.json()
                if (resp.msg === "Log in Succesfull") {
                    const udata = jwtDecode(resp.token)
                    localStorage.setItem("user_data", JSON.stringify(udata))
                    toast.success(resp.msg + " .Redirecting to Home")
                    setTimeout(() => {
                        return navigate('/')
                    }, 4000);
                }
                else if (resp.msg == "Incorrect Password") {
                    toast.error(resp.msg)
                    setPass("")
                }
                else {
                    toast.error("Invalid Email.")
                    setPass("")
                    setEmail("")
                }
            }
            catch (err) {
                console.log(err)
            }
        }
    }
    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: 'column' }}>
                <input type="email" placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                <input type="password" placeholder='Password' value={pass} onChange={(e) => { setPass(e.target.value) }} />
                <button type='submit' >Sign In</button>
            </form>
        </div>
    )
}

export default SignIn