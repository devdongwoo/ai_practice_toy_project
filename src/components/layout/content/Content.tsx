export default function Content ({ children }: Readonly<{
    children: React.ReactNode;
}>){
    return (
        <main className="flex items-center justify-center">
            <div className="wrapper w-[1400px]">
                <div className="flex w-full items-center !px-[30px] !py-[20px]">
                    {children}
                </div>
            </div>
        </main>
    );
};