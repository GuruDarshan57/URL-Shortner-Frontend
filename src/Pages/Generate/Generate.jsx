import React, { useState } from 'react'
import { toast } from 'react-toastify';

const Generate = () => {
    const [long_url, setLong_url] = useState("")
    const [url_name, setUrl_name] = useState("")
    const [s_url, setS_url] = useState("")
    const handleCreatesurl = async (e) => {
        e.preventDefault()
        const payload = {
            l_url: long_url,
            name: url_name
        }
        try {
            const res = await fetch(import.meta.env.VITE_Backend + "/s_url/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                credentials: 'include'
            })
            const resp = await res.json()
            if (resp.msg === "try again") {
                toast.warning("Try again")
            }
            else {
                toast.success("Short URL successfully created")
                setLong_url("")
                setUrl_name("")
                setS_url(import.meta.env.VITE_Backend + "/shorturl/" + resp.msg)
            }

        } catch (err) {
            console.log(err.message)
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
                {s_url}
            </div>
        </div>
    )
}

export default Generate