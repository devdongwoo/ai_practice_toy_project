export default function DataSection ({children}: Readonly<{
    children: React.ReactNode;
}>){
    return (
        <section className="bg-[#fff] rounded-md max-w-full !my-[10px] dark:bg-[#101013] !p-[20px]">
            {children}
        </section>
    )
}