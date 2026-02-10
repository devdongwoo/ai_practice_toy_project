
export default function Content ({ children }: Readonly<{
    children: React.ReactNode;
}>){
    return (
        <main>
            {children}
        </main>
    );
};