import React from 'react'

const useGetUserDetails = () => {
    const user_details = JSON.parse(localStorage.getItem("user_data"))
    return user_details
}

export default useGetUserDetails