import {useEffect, useRef, useState} from "react";
import {Link, NavLink, useLocation} from "react-router-dom";
import {displayName, mods} from "../data/mods.js";
import {ChevronDown, CloseIcon, GitHubIcon, MenuIcon, SearchIcon} from "./Icons.jsx";
import {ModLogo} from "./ui.jsx";

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

export default function Navbar({onSearch}) {
    const [modsOpen, setModsOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const dropdownRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        setModsOpen(false);
        setMobileOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, {passive: true});
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!modsOpen) return;
        const onDown = (e) => !dropdownRef.current?.contains(e.target) && setModsOpen(false);
        const onKey = (e) => e.key === "Escape" && setModsOpen(false);
        document.addEventListener("mousedown", onDown);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onDown);
            document.removeEventListener("keydown", onKey);
        };
    }, [modsOpen]);

    const navLink = ({isActive}) =>
        `rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? "text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"}`;

    return (
        <header className={`sticky top-0 z-40 transition-colors ${scrolled || mobileOpen ? "border-b border-white/8 bg-ink-950/85 backdrop-blur-lg" : "border-b border-transparent"}`}>
            <nav className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:px-6" aria-label="Main">
                <Link to="/" className="mr-4 flex shrink-0 items-center gap-2.5" aria-label="CoolerProMC Mods home">
                    <img src="/coolerpromc_mods_logo.png" alt="" className="h-9 w-9 rounded-lg"/>
                    <span className="font-display text-xl font-bold tracking-wide text-white">
                        CoolerProMC <span className="text-diamond">Mods</span>
                    </span>
                </Link>

                <div className="hidden items-center gap-1 md:flex">
                    <div className="relative" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={() => setModsOpen((o) => !o)}
                            aria-expanded={modsOpen}
                            aria-haspopup="true"
                            className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                        >
                            Mods <ChevronDown width="16" height="16" className={`transition ${modsOpen ? "rotate-180" : ""}`}/>
                        </button>
                        {modsOpen && (
                            <div className="absolute left-0 top-full mt-2 w-[min(640px,calc(100vw-2rem))] rounded-2xl border border-white/10 bg-ink-900/95 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl">
                                <div className="grid grid-cols-2 gap-1">
                                    {mods.map((m) => (
                                        <Link key={m.slug} to={`/${m.slug}`} style={{"--accent": m.accent}} className="group flex items-center gap-3 rounded-xl px-2.5 py-2 transition hover:bg-white/5">
                                            <ModLogo mod={m} className="h-9 w-9 rounded-md object-cover"/>
                                            <span className="truncate text-sm font-medium text-slate-200 group-hover:text-white">{displayName(m)}</span>
                                            <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-(--accent) opacity-0 transition group-hover:opacity-100"/>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <NavLink to="/versions" className={navLink}>Version support</NavLink>
                </div>

                <div className="ml-auto flex items-center gap-2">
                    <button
                        type="button"
                        onClick={onSearch}
                        className="inline-flex h-9 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-muted transition hover:border-white/20 hover:text-white"
                        aria-label="Search mods"
                    >
                        <SearchIcon width="16" height="16"/>
                        <span className="hidden lg:inline">Search mods</span>
                        <kbd className="hidden rounded border border-white/10 px-1.5 text-[11px] lg:inline">{isMac ? "⌘" : "Ctrl"} K</kbd>
                    </button>
                    <a href="https://github.com/CoolerProYT" target="_blank" rel="noreferrer" className="hidden h-9 w-9 place-items-center rounded-lg text-slate-300 transition hover:bg-white/5 hover:text-white sm:grid" aria-label="CoolerProYT on GitHub">
                        <GitHubIcon/>
                    </a>
                    <button
                        type="button"
                        className="grid h-9 w-9 place-items-center rounded-lg text-slate-200 hover:bg-white/5 md:hidden"
                        onClick={() => setMobileOpen((o) => !o)}
                        aria-expanded={mobileOpen}
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                    >
                        {mobileOpen ? <CloseIcon/> : <MenuIcon/>}
                    </button>
                </div>
            </nav>

            {mobileOpen && (
                <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/8 px-4 pb-6 pt-3 md:hidden">
                    <NavLink to="/" end className="block rounded-lg px-3 py-2.5 text-base font-medium text-slate-200 hover:bg-white/5">Home</NavLink>
                    <NavLink to="/versions" className="block rounded-lg px-3 py-2.5 text-base font-medium text-slate-200 hover:bg-white/5">Version support</NavLink>
                    <div className="mt-3 px-3 pb-2 text-xs font-semibold uppercase tracking-widest text-muted">Mods</div>
                    <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                        {mods.map((m) => (
                            <Link key={m.slug} to={`/${m.slug}`} className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/5">
                                <ModLogo mod={m} className="h-8 w-8 rounded-md object-cover"/>
                                <span className="text-sm font-medium text-slate-200">{displayName(m)}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
