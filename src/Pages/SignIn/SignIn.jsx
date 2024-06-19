import React, { useState } from 'react'

const SignIn = () => {
    const [uname, setUname] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const handleSubmit = async () => {

    }
    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: 'column' }}>
                <input type="text" placeholder='Username' value={uname} onChange={(e) => { setUname(e.value) }} />
                <input type="password" placeholder='Password' value={pass} onChange={(e) => { setPass(e.value) }} />
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default SignIn