import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center bg-white px-6 py-24 text-center">
        <p className="font-display font-extrabold text-[#333] tracking-tight text-6xl md:text-8xl">
          404
        </p>
        <h1 className="mt-4 font-display font-bold text-xl md:text-2xl text-[#111] tracking-wide">
          This page could not be found
        </h1>
        <p className="mt-2 text-gray-500 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center px-8 py-3 bg-[#111] text-white font-display font-extrabold text-sm tracking-widest hover:bg-[var(--toyota-red)] transition-colors"
        >
          BACK TO HOME
        </Link>
      </main>

      <Footer />
    </div>
  );
}
