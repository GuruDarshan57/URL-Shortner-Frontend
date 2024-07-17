import React, { useEffect, useState } from 'react'
import useGetUserDetails from '../../hooks/useGetUserDetails'

const Analytics = () => {
    const { user_data } = useGetUserDetails()
    const [data, setData] = useState()
    useEffect(() => {
        getAnalyticsData()
    }, [])
    const getAnalyticsData = async (e) => {
        if (user_data) {
            try {
                const resp = await fetch(import.meta.env.VITE_Backend + "/s_url/analytics", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include'
                })
                const res = await resp.json()
                if (resp.status === 200) {
                    setData(res)
                }
            } catch (err) {
                console.log(err.message)
            }
        }
    }
    return (
        <div>
            {data?.url_data?.length != 0 ? <>
                <div>Total URL's generated : {data?.urls}</div>
                <div>Total clicks : {data?.clicks}</div>
                <div>Most clicks : {data?.most_clicks}</div>

                <div>
                    <table>
                        <th><td>Name</td><td>Short ID</td><td>URL</td><td>Clicks</td></th>
                        {data?.url_data?.map((ele) =>
                            <tr><td>{ele.name}</td><td>{ele.short_id}</td><td>{ele.url}</td><td>{ele.clicks}</td></tr>)}
                    </table>
                </div></> : ""}
        </div>
    )
}

export default Analytics