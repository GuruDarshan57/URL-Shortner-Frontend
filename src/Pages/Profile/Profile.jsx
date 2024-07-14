import React from 'react'
import useGetUserDetails from '../../hooks/useGetUserDetails'
import { toast } from 'react-toastify';

const Profile = () => {
    const { user_data, setUser_data } = useGetUserDetails()

    const handleSignout = async () => {
        try {
            const resp = await fetch(import.meta.env.VITE_Backend + "/signout", {
                method: 'post',
                headers: { "Content-Type": "Application/json" },
                credentials: 'include'
            })
            const res = await resp.json()
            if (res.msg === "done") {
                toast.success("Signed Out succesfully.")
                localStorage.removeItem("user_data")
                setUser_data("")
            }
        } catch (err) {
            console.log(err.message)
        }
    }
    return (
        <div>
            <table>
                <tr><td>Name</td><td>{user_data?.name}</td></tr>
                <tr><td>Email</td><td>{user_data?.email}</td></tr>
                <tr><td>Role</td><td>{user_data?.role}</td></tr>
            </table>
            <button onClick={handleSignout}>Sign Out</button>
        </div>
    )
}

export default Profile