"use client"

import { Toastpopup } from "@/types"
import {useEffect} from "react";

export default function ToastPopup({ message, setToast, position, type}: Toastpopup) {

    useEffect(() => {
        const timer = setTimeout(() => {
            setToast(false);
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [setToast]);


    return (
        <div
            className={`fixed left-1/2  z-20 flex h-[32px] !p-[20px] max-w-[73rem] items-center justify-center rounded-[1rem] ${type === 'error' ? 'bg-red-500 ':'bg-green-500'} opacity-[97%] shadow-[0px_2px_8px_rgba(0,0,0,0.25)] ${
                position === 'top'
                    ? 'top-10  custom-slide-down'
                    : 'bottom-10 custom-slide-up'
            }`}
        >
            <p className="text-white">{message}</p>
        </div>
    );
}