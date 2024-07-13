import React from 'react'

const Navbar = () => {
    const handleSignOut = async () => {
        const resp = await fetch(import.meta.env.VITE_Backend + "/signout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
        })
        localStorage.removeItem("user_data")
    }
    return (
        <div>
            <ul style={{
                display: "flex", gap: "20px"
            }}>
                <li><a href="/">Home</a></li>
                <li><a href="/generate">Generate S-URL</a></li>
                <li><a href="/signin">Sign in</a></li>
                <li><a href="/signup">Sign Up</a></li>
                <li><a href="/analytics">Analytics</a></li>
                <li><a href="/admin">Admin</a></li>
                <button onClick={handleSignOut}>signout</button>
            </ul>
        </div >
    )
}

export default Navbar