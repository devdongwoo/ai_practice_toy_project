"use client"

import { ClipLoader } from "react-spinners";
import {CSSProperties, Dispatch, SetStateAction, useRef} from "react";
import { BlogResponse } from "@/types"
import ToastUIEditor from "@/components/toastui-editor/ToastUIEditor";
import DataSection from "@/components/data-section/DataSection";
import Button from "@/components/button/Button";
import DownLoadComponent from "@/app/(main)/_components/DownLoadComponent";
import {Editor} from "@toast-ui/react-editor";
import {marked} from "marked";

interface Prop{
    loading: boolean
    response: BlogResponse | null
    setActive: Dispatch<SetStateAction<boolean>>
    setError: Dispatch<SetStateAction<boolean>>
    setMessage: Dispatch<SetStateAction<string>>
}


const OVERRIDE: CSSProperties = {
    display: "block",
    margin: "0 auto"
};

const STYLE =`cursor-pointer w-full text-left 
!px-[10px] !py-[5px] border rounded-[8px] border-[#e5e8eb] 
dark:border-[#3c3c47]  focus:ring-2 focus:ring-blue-200 outline-none !mb-[10px] !mt-[5px] min-h-[42px]`


export default function Bottom(prop:Prop){
    const { loading, response, setMessage, setError, setActive } = prop

    const editorRef = useRef<Editor>(null)

    const hashtag = response?.hashtags.join(" ")


    const handleCopy = async (type: string) => {
        try{
            let message = ""
            let currentContent = ""

            if(type === "titleCopy") {
                message = "주제가 복사 되었습니다."
                currentContent = response?.title || ""
            }
            if(type === "hashtagCopy") {
                message = "해쉬태그가 복사 되었습니다"
                currentContent = response?.hashtags.join(" ") || ""
            }
            if(type === "seoCopy") {
                message = "seo메타가 복사 되었습니다"
                currentContent = response?.description || ""
            }


            if(type === "contentCopy" && editorRef.current){
                message = "글내용이 복사 되었습니다."
                currentContent = editorRef.current.getInstance().getMarkdown();
            }

            setActive(true)
            setMessage(message)
            setError(false)

            await navigator.clipboard.writeText(currentContent);
        }catch(err){
            if(err instanceof  Error){
                setActive(true)
                setMessage(err.message)
                setError(true)
            }
        }


    }

    const download = (array: BlobPart[], type: string) => {
        const blob = new Blob(array, { type });

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;

        const extension = type.split('/')[1] === "markdown" ? "md" : "html"
        link.download = `${response?.title || '빈 제목'}.${extension}`;

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    const handleMDdownload = () => {
        if(editorRef.current){
            const currentContent = editorRef.current.getInstance().getMarkdown();

            download([currentContent], 'text/markdown')
        }
    }

    const handleHTMLdownload = () => {
        if(editorRef.current){
            const currentContent = editorRef.current.getInstance().getMarkdown();
            const parseContent = marked.parse(currentContent, { async: false }) as string;

            const html = `
          <!DOCTYPE html>
          <html lang="ko">
            <head>
            <meta charset="UTF-8">
            <title>${response?.title}</title>
            </head>
            <body>
              <div>${parseContent}</div>
            </body>
          </html>
        `;
            download([html], 'text/html')
        }
    }


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
                              <div className="font-medium">주제
                                  <span className="text-gray-400 text-[10px]">(클릭시 복사가 됩니다)</span>
                              </div>
                              <Button text={response.title}
                                     disabled={false}
                                     func={() => handleCopy("titleCopy")}
                                     style={STYLE + ` text-[#a1a1a1]`}>
                              </Button>
                              <div className="font-medium">해시태그
                                  <span className="text-gray-400 text-[10px]">(클릭시 복사가 됩니다)</span>
                              </div>
                              <Button text={hashtag || "해시태그가 없습니다."}
                                      disabled={false}
                                      func={() => handleCopy("hashtagCopy")}
                                      style={STYLE + ` text-[#12B886]`}>
                              </Button>
                              <div className="font-medium">SEO메타
                                  <span className="text-gray-400 text-[10px]">(클릭시 복사가 됩니다)</span>
                              </div>
                              <Button text={response.description}
                                      disabled={false}
                                      func={() => handleCopy("seoCopy")}
                                      style={STYLE + ` text-[#a1a1a1]`}>
                              </Button>
                              <ToastUIEditor response={response} editorRef={editorRef} />
                          </DataSection>
                          <DownLoadComponent handleCopy={handleCopy} handleMDdownload={handleMDdownload} handleHTMLdownload={handleHTMLdownload}/>
                        </>
                 }</>
            }
        </div>
    )
}