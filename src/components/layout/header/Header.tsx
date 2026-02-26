import ToggleClient from "@/components/button/toggle/ToggleClient";
import Link from 'next/link'

export default function Header(){
    return (
        <nav className="header h-[52px] w-full flex items-center justify-center border-b border-solid border-gray-200 dark:border-gray-800">
            <div className="wrapper w-[1400px] flex justify-between !px-[30px] ">
                <div className="logo font-bold text-[22px] cursor-pointer">
                    <Link href="/">WriteNow</Link>
                </div>
                <div>
                    <ToggleClient/>
                </div>
            </div>
        </nav>
    );
};