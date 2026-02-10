import { create } from 'zustand'

interface DarkModeState {
    darkMode: boolean;
    toggle: () => void;
}

export const useDarkModeStore = create<DarkModeState>((set, get) => {
    const isBrowser = typeof self !== 'undefined';
    const initialDarkMode = isBrowser ? localStorage.getItem('theme') === 'dark' : false;

    return {
        darkMode: initialDarkMode,
        toggle: () => {
            const state = get();

            if(isBrowser){
                localStorage.theme = !state.darkMode ?  'dark' : 'light';
                set({
                    darkMode: !state.darkMode
                })
            }
        }
    }
})