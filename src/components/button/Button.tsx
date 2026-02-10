'use client'

interface PropImpl{
    text: string
    style: string
    func: () => void
    disabled?: boolean
}

export default function Button(prop:PropImpl){
    const { text, func, style, disabled } = prop

    return (
        <button onClick={func} className={style} disabled={disabled}>
            {text}
        </button>
    )
}