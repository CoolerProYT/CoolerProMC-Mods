import {Link} from "react-router-dom";
import {displayName, mods} from "../data/mods.js";
import {GitHubIcon} from "./Icons.jsx";

export default function Footer() {
    return (
        <footer className="mt-24 border-t border-white/8 bg-ink-950/60">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_2fr]">
                <div>
                    <Link to="/" className="flex items-center gap-2.5">
                        <img src="/coolerpromc_mods_logo.png" alt="" className="h-10 w-10 rounded-lg"/>
                        <span className="font-display text-2xl font-bold text-white">CoolerProMC <span className="text-diamond">Mods</span></span>
                    </Link>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                        Minecraft mods for Forge, NeoForge and Fabric. Free to use and available on CurseForge and Modrinth.
                    </p>
                    <div className="mt-5 flex gap-2">
                        <a href="https://github.com/CoolerProYT" target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white" aria-label="GitHub">
                            <GitHubIcon width="18" height="18"/>
                        </a>
                        <a href="https://modrinth.com/user/CoolerProMC" target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 hover:bg-white/10" aria-label="Modrinth">
                            <img src="/modrinth.png" alt="" className="h-4.5 w-4.5"/>
                        </a>
                        <a href="https://www.curseforge.com/members/coolerpromc/projects" target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 hover:bg-white/10" aria-label="CurseForge">
                            <img src="/cf.png" alt="" className="h-4.5 w-4.5"/>
                        </a>
                    </div>
                </div>
                <div>
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">Mods</h2>
                    <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
                        {mods.map((m) => (
                            <li key={m.slug}>
                                <Link to={`/${m.slug}`} className="text-sm text-slate-300 hover:text-diamond">{displayName(m)}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="border-t border-white/6">
                <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <span>© {new Date().getFullYear()} CoolerProMC. Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.</span>
                    <span>Download stats from Modrinth and CurseForge</span>
                </div>
            </div>
        </footer>
    );
}
