import React from 'react'
import { toast } from 'react-hot-toast'
import { MdFileCopy } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const AURL = (props) => {
    const { _id, name, url, short_id, clicks } = props.data

    const copyLink = (url) => {
        navigator.clipboard.writeText(url)
        toast.success("Copied to Clipboard")
    }

    const handleDelete = async () => {
        const payload = { id: _id }
        try {
            const resp = await fetch(import.meta.env.VITE_Backend + "/s_url/delete", {
                method: "delete",
                headers: { 'content-type': "application/json" },
                body: JSON.stringify(payload),
            })
            const res = await resp.json()
            if (resp.status === 200) {
                toast.success(res.msg)
            }
            else {
                toast.error(res.msg)
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className='mt-6 flex w-full text-center p-1 tracking-wide text-white'>
            <div className='w-24 sm:w-28 border-2 border-r-0 rounded-sm rounded-r-none'>
                {name}
            </div>
            <div className='flex-1 border-r-0 sm:border-r-2 border-2  relative -z-0'>
                <a className=' text-lime-300 cursor-pointer' href={import.meta.env.VITE_Backend + "/" + short_id} target="_blank" style={{ pointerEvents: `${props.heading ? "none" : ''}` }}>Short URL</a>
                {props.heading ? "" : <span className="p-1 px-3 text-sm bottom-0 cursor-pointer absolute -right-2 sm:-right-2 " style={{ color: "#63E6BE" }} onClick={() => {
                    const link = import.meta.env.VITE_Backend + "/" + short_id;
                    copyLink(link)
                }}><MdFileCopy /></span>}
            </div>
            <div className='px-3 pr-6 sm:p-0 sm:w-40 lg:w-56 border-2 border-l-0 border-r-0 relative hidden sm:inline'>
                <a href={url} target="_blank" style={{ pointerEvents: `${props.heading ? "none" : ''}` }}>Original URL</a>
                {props.heading ? "" : <span className="p-1 px-3 text-sm bottom-0 cursor-pointer absolute -right-2 sm:-right-1 " style={{ color: "#63E6BE" }} onClick={() => {
                    const link = url;
                    copyLink(link)
                }}><MdFileCopy /></span>}
            </div>
            <div className='w-14 sm:w-28 border-2 border-r-0'>
                {clicks}
            </div>
            <div className='w-14 sm:w-28 border-2 rounded-sm rounded-l-none flex justify-center items-center'>
                <spam className="cursor-pointer" style={{ color: "#63E6BE" }} onClick={props.heading ? "" : handleDelete}><MdDelete /></spam>
            </div>
        </div>
    )
}

export default AURL