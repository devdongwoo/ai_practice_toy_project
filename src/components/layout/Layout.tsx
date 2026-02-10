import Header from "@/components/layout/header/Header";
import Content from "@/components/layout/content/Content";

export default function Layout ({ children }: Readonly<{
    children: React.ReactNode;
}>){
    return (
        <>
            <Header/>
            <Content>
                {children}
            </Content>
        </>
    );
};