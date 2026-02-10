import { ContentComponent } from "./_components/";


export default function Main() {

  return (
    <div className="flex items-center justify-center ">
        <div className="wrapper w-[1400px]">
            <main className="flex w-full items-center !px-[30px] !py-[20px]">
                <ContentComponent/>
            </main>
        </div>
    </div>
  );
}
