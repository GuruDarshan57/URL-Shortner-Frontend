import React, { useState } from 'react'

//custom hook to fetch stored user data
const useGetUserDetails = () => {
    const [user_data, setUser_data] = useState(JSON.parse(localStorage.getItem("user_data")) || "")
    if (user_data?.exp) {
        if (Date.now() > user_data.exp) {
            setUser_data("")
        }
    }
    return { user_data, setUser_data }
}

export default useGetUserDetails