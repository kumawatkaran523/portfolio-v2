import { DotPattern } from "@/components/ui/dot-pattern";
import Profile from "./components/Profile";
import About from "./components/About";
import Skills from "./components/Skills";
import Learning from "./components/Learning";
import Projects from "./components/Projects";
import Workexp from "./components/Workexp";
import Footer from "./components/Footer";
import GitHubCalendar from "react-github-calendar";

export default function Home() {
  return (
    <div className="relative">
      <div className="absolute inset-0">
        <DotPattern className="w-full h-full" />
      </div>
      <div className="overflow-hidden flex justify-center md:mx-64 items-center">
        <div className="z-10 flex flex-col justify-center items-center">
          <Profile ></Profile>
          {/* <div className="dark hidden xl:block pt-4">
            <GitHubCalendar username="ganeshkondaka" colorScheme="dark"/>
          </div> */}
          <About></About>
          <Skills></Skills>
          <Learning></Learning>
          <Workexp></Workexp>
          <Projects></Projects>
          <Footer></Footer>
        </div>
        <DotPattern ></DotPattern>
      </div>
    </div>

  );
}
