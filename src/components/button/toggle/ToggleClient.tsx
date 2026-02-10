"use client";

import dynamic from "next/dynamic";

const ToggleBtn = dynamic(() => import("./ToggleBtn"), {
    ssr: false,
});

export default function ToggleClient() {
    return <ToggleBtn />;
}
