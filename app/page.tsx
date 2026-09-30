import Image from "next/image";
import Link from "next/link";
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

            <div className="col-span-12 mt-10 mb-20">
              <Link
                href="/ingetdiwa"
                className="block rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur transition-colors hover:border-emerald-400/60 md:p-8"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
                  Produk
                </p>
                <h2 className="mt-2 text-3xl font-bold">IngetDiWA</h2>
                <p className="mt-2 max-w-2xl">
                  Bot pengingat dan daftar tugas yang berjalan sepenuhnya di WhatsApp.
                  Catat jadwal cukup dengan chat, dapatkan pengingat tepat waktu, dan
                  bayar hanya Rp3.000 per bulan setelah masa coba gratis 7 hari.
                </p>
                <p className="mt-4 font-semibold text-emerald-300">
                  Selengkapnya &rarr;
                </p>
              </Link>
            </div>
        </div>
      </div>
    </ClickSpark>
    </div>
  );
}
