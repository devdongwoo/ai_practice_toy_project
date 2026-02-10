'use client'

import {useEffect} from "react";
import {useDarkModeStore} from "@/store/darkModeStore";

const useDarkMode = ():[boolean, () => void] => {
    const dark = useDarkModeStore(state => state.darkMode);
    const toggle = useDarkModeStore(state => state.toggle);



    useEffect(() => {
        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) && self.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [dark]);

    return [dark, toggle];
};

export default useDarkMode