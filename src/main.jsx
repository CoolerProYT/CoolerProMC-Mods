import {StrictMode, useEffect, useState} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import CommandPalette from "./components/CommandPalette.jsx";
import Home from "./pages/Home.jsx";
import ModPage from "./pages/ModPage.jsx";
import Versions from "./pages/Versions.jsx";
import NotFound from "./pages/NotFound.jsx";

function ScrollManager() {
    const {pathname, hash} = useLocation();
    useEffect(() => {
        if (hash) {
            document.getElementById(hash.slice(1))?.scrollIntoView();
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);
    return null;
}

function App() {
    const [paletteOpen, setPaletteOpen] = useState(false);

    useEffect(() => {
        const onKey = (e) => {
            const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName);
            if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
                e.preventDefault();
                setPaletteOpen((o) => !o);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <div className="flex min-h-dvh flex-col">
            <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-diamond focus:px-4 focus:py-2 focus:text-ink-950">
                Skip to content
            </a>
            <ScrollManager/>
            <Navbar onSearch={() => setPaletteOpen(true)}/>
            <div id="content" className="flex-1">
                <Routes>
                    <Route index element={<Home/>}/>
                    <Route path="/versions" element={<Versions/>}/>
                    <Route path="/:slug" element={<ModPage/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </div>
            <Footer/>
            <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)}/>
        </div>
    );
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </StrictMode>,
);
