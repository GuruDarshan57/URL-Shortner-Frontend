import React from 'react'

const Navbar = () => {
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
            </ul>
        </div >
    )
}

export default Navbar