"use client"
import dynamic from "next/dynamic";

const ContentComponent = dynamic(() => import("./ContentComponent"), {
    ssr: false,
});

export default function ContentComponentClient() {
    return <ContentComponent />;
}