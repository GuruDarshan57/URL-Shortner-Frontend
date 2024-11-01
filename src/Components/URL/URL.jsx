import React from 'react'
import { toast } from 'react-hot-toast'
import { MdFileCopy } from "react-icons/md";

const URL = (props) => {
    const { _id, name, url, short_id } = props.data

    const copyLink = (url) => {
        navigator.clipboard.writeText(url)
        toast.success("Copied to Clipboard")
    }
    return (
        <div className='mt-6 flex w-full text-center p-1 tracking-wide text-white'>
            <div className='w-20 sm:w-28 border-2 border-r-0 rounded-sm rounded-r-none'>
                {name}
            </div>
            <div className='flex-1 border-2 relative hidden xl:inline'>
                <a className=' text-lime-300 sm:text-sm' href={import.meta.env.VITE_Backend + "/" + short_id} target="_blank" style={{ pointerEvents: `${props.heading ? "none" : ''}` }}>{props.heading ? "Short URL" : import.meta.env.VITE_Backend + "/" + short_id}</a>
                {props.heading ? "" : <span className='p-1 px-3 text-sm text-green-300 bottom-0 cursor-pointer absolute -right-1' onClick={() => {
                    const link = import.meta.env.VITE_Backend + "/" + short_id;
                    copyLink(link)
                }}><MdFileCopy /></span>}
            </div>
            <div className='flex-1 border-2 relative xl:hidden'>
                <a className=' text-lime-300' href={import.meta.env.VITE_Backend + "/" + short_id} target="_blank" style={{ pointerEvents: `${props.heading ? "none" : ''}` }}>Short Link</a>
                {props.heading ? "" : <span className='p-1 px-3 text-sm text-green-300 bottom-0 cursor-pointer absolute -right-1 sm:right-1 ' onClick={() => {
                    const link = import.meta.env.VITE_Backend + "/" + short_id;
                    copyLink(link)
                }}><MdFileCopy /></span>}
            </div>
            <div className='px-3 pr-6 sm:p-0 sm:w-40 lg:w-56 border-2 border-l-0 relative rounded-sm rounded-l-none'>
                <a href={url} target="_blank" style={{ pointerEvents: `${props.heading ? "none" : ''}` }}>Original URL</a>
                {props.heading ? "" : <span className='p-1 px-3 text-sm text-green-300 bottom-0 cursor-pointer absolute -right-1' onClick={() => {
                    const link = url;
                    copyLink(link)
                }}><MdFileCopy /></span>}
            </div>
        </div>
    )
}

export default URL