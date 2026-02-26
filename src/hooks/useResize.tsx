"use client"

import { useEffect, useState } from "react";

export function useResize() {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => setWidth(self.innerWidth);

        handleResize();
        self.addEventListener("resize", handleResize);

        return () => self.removeEventListener("resize", handleResize);
    }, []);

    return width;
}
