import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !pass) {
            toast.error("Email or Password can't be empty.")
        }
        else {
            const cred = {
                email: email,
                password: pass
            }
            console.log(cred)
            try {
                const res = await fetch("http://localhost:3000/signin", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(cred)
                })
                const resp = await res.json()
                console.log(resp.accessToken)
                if (resp.msg == "logged in") {
                    toast.success("SignIn Successfull.")
                    setTimeout(() => {
                        return navigate('/home')
                    }, 4000);
                }
                else if (resp.msg == "incorrect password") {
                    toast.error("Incorrect Password.")
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