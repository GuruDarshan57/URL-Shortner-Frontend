import React, { useState } from 'react'

//custom hook to fetch stored user data
const useGetUserDetails = () => {
    const [user_data, setUser_data] = useState(JSON.parse(localStorage.getItem("user_data")) || "")
    console.log(user_data.expiry)
    if (Date.now() > user_data.expiry) {
        setUser_data("")
        localStorage.removeItem(user_data)
    }
    return { user_data, setUser_data }
}

export default useGetUserDetails