"use client"

import {useResize} from "@/hooks/useResize";
import {BlogResponse} from "@/types";

interface Prop{
    handleCopy: (type: string) => void
    handleMDdownload: () => void
    handleHTMLdownload: () => void

}


export default function DownLoadComponent(prop: Prop){
    const { handleCopy, handleMDdownload, handleHTMLdownload } = prop


    let style

    const width = useResize()


    if(width >= 1775) style = "fixed right-[30px] bottom-[50px] shadow-[2px_5px_10px_0px_rgba(0,0,0,0.2)]"
    else style = "max-w-full !my-[10px] "



    



    return (
        <section className={`bg-[#fff] rounded-md dark:bg-[#101013] !p-[20px] ${style}`}>
            <ul>
                <li className="flex gap-2 cursor-pointer hover:text-[#12B886]" onClick={() => handleCopy("contentCopy")}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                        <path d="M760-200H320q-33 0-56.5-23.5T240-280v-560q0-33 23.5-56.5T320-920h280l240 240v400q0 33-23.5 56.5T760-200ZM560-640v-200H320v560h440v-360H560ZM160-40q-33 0-56.5-23.5T80-120v-560h80v560h440v80H160Zm160-800v200-200 560-560Z"/>
                    </svg>
                    <span>복사하기</span>
                </li>
                <li className="flex gap-2 !my-[20px] cursor-pointer hover:text-[#12B886]" onClick={handleMDdownload}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                        <path d="m640-360 120-120-42-43-48 48v-125h-60v125l-48-48-42 43 120 120ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Zm60-120h60v-180h40v120h60v-120h40v180h60v-200q0-17-11.5-28.5T440-600H260q-17 0-28.5 11.5T220-560v200Z"/>
                    </svg>
                    <span>MD 다운로드</span>
                </li>
                <li className="flex gap-2 cursor-pointer hover:text-[#12B886]" onClick={handleHTMLdownload}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                        <path d="m720-120 160-160-56-56-64 64v-167h-80v167l-64-64-56 56 160 160ZM560 0v-80h320V0H560ZM240-160q-33 0-56.5-23.5T160-240v-560q0-33 23.5-56.5T240-880h280l240 240v121h-80v-81H480v-200H240v560h240v80H240Zm0-80v-560 560Z"/>
                    </svg>
                    <span>HTML 다운로드</span>
                </li>
            </ul>
        </section>
    )
}