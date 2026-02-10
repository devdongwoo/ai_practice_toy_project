"use client"

import { ClipLoader } from "react-spinners";
import {CSSProperties} from "react";
import { BlogResponse } from "@/types"
import ToastUIEditor from "@/components/toastui-editor/ToastUIEditor";
import DataSection from "@/components/data-section/DataSection";
import Button from "@/components/button/Button";

interface Prop{
    loading: boolean
    response: BlogResponse | null
}


const OVERRIDE: CSSProperties = {
    display: "block",
    margin: "0 auto"
};

const STYLE =`cursor-pointer w-full text-left 
!px-[10px] !py-[5px] border rounded-[8px] border-[#e5e8eb] 
dark:border-[#3c3c47]  focus:ring-2 focus:ring-blue-200 outline-none !mb-[10px] !mt-[5px] min-h-[42px]`


export default function Bottom(prop:Prop){
    const { loading, response } = prop

    const hashtag = response?.hashtags.join(" ")


    return (
        <div className="!pt-[30px]">
            {
                loading ?
                    <div className="flex flex-col items-center gap-[10px]">
                        <ClipLoader
                        color={"#3182F6"}
                        loading={loading}
                        cssOverride={OVERRIDE}
                        size={40}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                        <div className="!pl-[5px]">블로그 글 생성중...</div>
                    </div> : <>{
                        response &&
                        <>
                          <div className="font-semibold text-[18px]">글 생성</div>
                          <DataSection>
                              <div className="font-medium">주제</div>
                              <Button text={response.title}
                                     disabled={true}
                                     func={() => {}}
                                     style={STYLE + ` text-[#a1a1a1]`}>
                              </Button>
                              <div className="font-medium">해시태그</div>
                              <Button text={hashtag || "해시태그가 없습니다."}
                                      disabled={true}
                                      func={() => {}}
                                      style={STYLE + ` text-[#12B886]`}>
                              </Button>
                              <div className="font-medium">SEO메타</div>
                              <Button text={response.description}
                                      disabled={true}
                                      func={() => {}}
                                      style={STYLE + ` text-[#a1a1a1]`}>
                              </Button>
                              <ToastUIEditor response={response}/>
                          </DataSection>
                        </>
                 }</>
            }
        </div>
    )
}