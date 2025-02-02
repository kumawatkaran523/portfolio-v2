import { DotPattern } from "@/components/ui/dot-pattern";
import Profile from "./components/Profile";
import About from "./components/About";
import Skills from "./components/Skills";
import Learning from "./components/Learning";

export default function Home() {
  return (
    <div className="overflow-hidden flex justify-center md:mx-64 items-center">
      <div className="z-10 flex flex-col justify-center items-center">
        <Profile ></Profile>
        <About></About>
        <Skills></Skills>
        <Learning></Learning>
        
      </div>
      <DotPattern className=''></DotPattern>
    </div>

  );
}
