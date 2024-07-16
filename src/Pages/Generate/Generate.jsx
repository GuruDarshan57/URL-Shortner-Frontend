import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Generate = () => {
    const [long_url, setLong_url] = useState("")
    const [url_name, setUrl_name] = useState("")
    const [s_url, setS_url] = useState("")
    const [recentURL, setRecentURL] = useState([])

    useEffect(() => {
        getRecent()
    }, [])

    const getRecent = async () => {
        try {
            const resp = await fetch(import.meta.env.VITE_Backend + "/s_url/getRecent", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: 'include'
            })
            const res = await resp.json()
            if (resp.status === 200) {
                setRecentURL(res.data)
            }
            else {
                setRecentURL([])
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    const handleCreatesurl = async (e) => {
        e.preventDefault()
        const payload = {
            l_url: long_url,
            name: url_name
        }
        if (!url_name || !long_url) {
            toast.error("Fill all fields")
        }
        else {
            try {
                const res = await fetch(import.meta.env.VITE_Backend + "/s_url/generate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                    credentials: 'include'
                })
                const resp = await res.json()
                if (res.status === 200) {
                    toast.success(resp.msg)
                    setLong_url("")
                    setUrl_name("")
                    setS_url(import.meta.env.VITE_Backend + "/shorturl/" + resp.s_id)
                }
                else {
                    toast.warning(resp.msg);
                }

            } catch (err) {
                console.log(err.message)
            }
        }
    }
    return (
        <div>
            <form style={{ display: 'flex', flexDirection: "column" }}>
                <input type="text" name="long_url" id="long_url" placeholder='URL' value={long_url} onChange={(e) => { setLong_url(e.target.value) }} />
                <input type="text" name="url_name" id="url_name" placeholder='Name' value={url_name} onChange={(e) => { setUrl_name(e.target.value) }} />
                <button onClick={handleCreatesurl}>Create Short URL</button>
            </form>
            <div>
                <a href={s_url} target='_blank'>{s_url}</a>
            </div>
            <div>
                <h2>Short URL's [{recentURL.length}]</h2>
                <table> {recentURL.length != 0 ? recentURL.map(ele => {
                    return <tr><td>{ele.name}</td><td>{ele.short_id}</td><td>{ele.url}</td></tr>
                }) : <h4>No URL's to display</h4>}</table>
                <h5>For More detalied view visit Analytics page</h5>
            </div>
        </div>
    )
}

export default Generate