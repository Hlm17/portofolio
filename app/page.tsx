import Image from "next/image";
import Lanyard from "./components/Lanyard/Lanyard";
import ClickSpark from './components/ClickSpark/ClickSpark';
import Aurora from './components/Aurora/Aurora';
import ScrollVelocity from './components/ScrollVelocity/ScrollVelocity';
import RotatingText from './components/RotatingText/RotatingText';
import formal from './components/img/formalmirrored.jpg';

export default function Home() {

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={0.23}
        speed={0.5}
        />
      <ClickSpark
        sparkColor='#fff'
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
        >

      <div className="mx-auto container h-screen">
        <div className="grid grid-cols-12">
            <div className="col-span-6 content-center pl-4">
              <h1 className="font-bold text-4xl">Empowering your business through
                 <div className="mt-1 mb-2"><RotatingText
                    texts={['Creativity', 'Websites']}
                    mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 justify-center text-bold inline-flex rounded-lg"
                    staggerFrom={"last"}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={2000}
                  />
                 </div>
              </h1>
              <h2>With me, Muhammad Hilmi Rajwandhika</h2>
            </div>
            <div className="col-span-6">
              <Lanyard position={[0, 0, 17]} gravity={[0, -40, 0]} />
            </div>
            <div className="col-span-12 flex justify-center">
              <ScrollVelocity
                texts={['About me', 'About me']} 
                velocity={60} 
                className="custom-scroll-text"
              />
            </div>
            <div className="col-span-4 justify-center item-center">
                <Image src={formal} alt="Me"/>
            </div>
            <div className="col-span-6">

            </div>
        </div>
      </div>
    </ClickSpark>
    </div>
  );
}
