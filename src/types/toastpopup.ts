import {Dispatch, SetStateAction} from "react";

export interface Toastpopup{
    message: string
    setToast: Dispatch<SetStateAction<boolean>>
    position: 'top' | 'bottom'
    type: 'error' | 'normal'
}