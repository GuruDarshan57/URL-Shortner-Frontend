import React from 'react'
import useGetUserDetails from '../../hooks/useGetUserDetails'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user_data, setUser_data } = useGetUserDetails()
    const navigate = useNavigate()
    const handleSignout = async () => {
        try {
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
        } catch (err) {
            console.log(err.message)
        }
    }
    return (
        <div>
            {user_data ? <>
                <table>
                    <tr><td>Name</td><td>{user_data?.name}</td></tr>
                    <tr><td>Email</td><td>{user_data?.email}</td></tr>
                    <tr><td>Role</td><td>{user_data?.role}</td></tr>
                </table>
                <button onClick={handleSignout}>Sign Out</button></> : ""}
        </div>
    )
}

export default Profile