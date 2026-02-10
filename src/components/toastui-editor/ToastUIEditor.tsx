'use client'

import dynamic from 'next/dynamic';
import { BlogResponse } from "@/types";
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import 'prismjs/themes/prism.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import Prism from 'prismjs';
import { useDarkModeStore } from "@/store/darkModeStore";
import {useResize} from "@/hooks/useResize";

const Editor = dynamic(
    () => import('@toast-ui/react-editor').then((m) => m.Editor),
    { ssr: false }
);

interface ToastUIEditorProps {
    response: BlogResponse;
}

export default function ToastUIEditor({ response }: ToastUIEditorProps) {
    const dark = useDarkModeStore(state => state.darkMode);
    const { content } = response;


    const width = useResize()
    const previewStyle: 'vertical' | 'tab' =
        width <= 600 ? 'tab' : 'vertical';


    const desktopToolbar = [
        ['heading', 'bold', 'italic'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task'],
        ['link', 'image'],
        ['code', 'codeblock'],
    ];

    const mobileToolbar = [
        ['bold', 'italic'],
        ['link', 'image'],
    ];




    return (
        <div className="w-full p-4 bg-white dark:bg-zinc-900 rounded-lg">
            <Editor
                key={`${dark}-${previewStyle}`}
                initialValue={content}
                previewStyle={previewStyle}
                height="600px"
                initialEditType="markdown"
                useCommandShortcut
                theme={dark ? "dark" : "light"}
                toolbarItems={previewStyle === "tab" ? mobileToolbar : desktopToolbar}
                hideModeSwitch={false}
                usageStatistics={false}
                plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
            />
        </div>
    );
}
