import {Link} from "react-router-dom";
import {useTitle} from "../components/ui.jsx";

export default function NotFound() {
    useTitle("Page not found");
    return (
        <main className="mx-auto flex max-w-xl flex-col items-center px-4 pt-24 text-center">
            <img src="/minecraft/item/minecraft__compass.png" alt="" className="pixelated h-20 w-20" onError={(e) => (e.currentTarget.style.display = "none")}/>
            <p className="mt-6 font-display text-7xl font-extrabold text-diamond">404</p>
            <h1 className="mt-2 font-display text-3xl font-bold text-white">This chunk hasn't generated</h1>
            <p className="mt-3 text-slate-300">The page you're looking for doesn't exist or has moved.</p>
            <Link to="/" className="pixel-corners mt-8 inline-flex items-center gap-2 bg-diamond px-5 py-3 font-semibold text-ink-950 hover:bg-white">
                Back to all mods
            </Link>
        </main>
    );
}
