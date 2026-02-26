'use client'

import DataSection from "@/components/data-section/DataSection";
import Button from "@/components/button/Button";
import Bottom from "@/app/(main)/_components/Bottom";
import { BlogResponse } from "@/types"
import {useState} from "react";
import {useDarkModeStore} from "@/store/darkModeStore";
import ToastPopup from "@/components/toast-popup/ToastPopup";



export default function ContentComponent () {
    const dark = useDarkModeStore(state => state.darkMode);

    const [val, setVal] = useState({
        topic: "",
        keywords: "",
        style: "tutorial"
    });

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<BlogResponse | null>(null);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("")
    const [active, setActive] = useState(false)

    const handlePost = async() => {
        if(!val.topic){
            setMessage("※ 주제를 입력해주세요")
            setError(true)
            setActive(true)
            return
        }

        if(!val.keywords){
            setMessage("※ 키워드를 입력해주세요")
            setError(true)
            setActive(true)
            return
        }


        setLoading(true);

        try {
            const {topic, keywords, style} = val
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    topic,
                    keywords: keywords.split(',').map((k) => k.trim()).filter(Boolean),
                    style,
                }),
            });

            if (!response.ok) throw new Error('생성 실패');

            const data = await response.json();
            setResult(data);
        } catch (err: unknown) {
            if(err instanceof Error){
                setError(true)
                setMessage(err.message);
            }
        } finally{
             setLoading(false);
        }

    }




    return (
        <section className="top w-full relative">
            {
                active && <ToastPopup setToast={setActive} message={message} position={"top"} type={error  ? "error" : "normal"}/>
            }
            <div className="font-semibold text-[18px]">글 스타일</div>
            {
                loading && <div className="opacity-50 rounded-md bg-[#f2f4f6] w-full h-[370px] absolute" />
            }
            <DataSection>
                <div className="font-medium">주제</div>
                <input placeholder="블로그 주제를 써주세요. (ex React하고 Vue차이점)"
                       value={val.topic}
                       onChange={(e) => setVal((prev) => {
                           return {
                               ...prev,
                               topic: e.target.value
                           }
                       })}
                    className="w-full !px-[10px] !py-[5px] border rounded-[8px] border-[#e5e8eb] dark:border-[#3c3c47]  focus:ring-2 focus:ring-blue-200 outline-none h-[42px] !mb-[10px] !mt-[5px]"/>
                <div className="font-medium">키워드(쉼표로 구분)</div>
                <input placeholder="ex) Vuex, LifeCycle"
                       value={val.keywords}
                       onChange={(e) => setVal((prev) => {
                           return {
                               ...prev,
                               keywords: e.target.value
                           }
                       })}
                       className="w-full !px-[10px] !py-[5px] border rounded-[8px] border-[#e5e8eb] dark:border-[#3c3c47]  focus:ring-2 focus:ring-blue-200 outline-none h-[42px] !mb-[10px] !mt-[5px]"/>
                <div className="font-medium">스타일</div>
                <div className="flex justify-around !mt-[20px]">
                    {
                        ["tutorial", "til", "troubleshooting"].map((item, idx) => {
                            return <Button text={item === "tutorial" ? "튜토리얼" : item === "til" ? "TIL" : "트러블슈팅" }
                                           key={idx}
                                           func={() =>
                                               setVal((prev) => {
                                                   return {
                                                       ...prev,
                                                       style: item
                                                   }
                                               })
                                           }
                                           style={`${dark && val.style === item ? "dark:bg-[#4d4d59]"  : val.style === item ? "bg-[#e7e7e7]/100" : "bg-[#f2f4f6]/70"} w-[30%]  hover:bg-[#e7e7e7]/100 !p-[10px] rounded-[8px] dark:bg-[#2c2c35]/70 dark:hover:bg-[#4d4d59]`}/>
                        })
                    }
                </div>
                <div className="flex justify-end !mt-[26px] !px-[20px] [@media(min-width:450px)_and_(max-width:580px)]:!p-[0px]">
                    <Button text="블로그 글 생성하기" style="w-[180px] bg-[#3485fa] !p-[10px] rounded-[8px] cursor-pointer text-[#fff]" func={handlePost} />
                </div>
            </DataSection>
            <Bottom loading={loading} response={result} setActive={setActive} setError={setError} setMessage={setMessage}/>
        </section>
    )
}