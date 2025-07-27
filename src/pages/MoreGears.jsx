import GitHubIcon from '@mui/icons-material/GitHub';
import LinkTextIconButton from "../components/LinkTextIconButton.jsx";
import LanguageIcon from '@mui/icons-material/Language';
import VersionCard from "../components/VersionCard.jsx";
import FeatureCard from "../components/FeatureCard.jsx";

export default function MoreGears() {
    return (
        <main>
            <section className={`w-full relative bg-[url(https://github.com/CoolerProYT/CoolerProMC-Mods/blob/master/src/assets/mg_gameplay.png?raw=true)] bg-no-repeat bg-cover bg- bg-center h-fit`}>
                <div className="w-full absolute h-full bg-neutral-800/75 z-0"></div>
                <section className="w-10/12 grid lg:grid-cols-3 xl:grid-cols-2 mx-auto justify-center items-center relative py-10 z-10">
                    <div className="flex flex-col justify-between items-center lg:col-span-2 xl:col-span-1">
                        <div>
                            <span className="text-3xl md:text-5xl font-semibold tracking-wider">More Gears</span>
                        </div>
                        <div className="mt-8 grid gap-6 lg:gap-1 xl:gap-4 grid-cols-2 md:grid-cols-4">
                            <LinkTextIconButton link="https://github.com/CoolerProYT/MoreGears" borderColor="#333333" bgcolor="#1e1e1e" color="#f8f9fa" hoverBgColor="#333333" icon={<GitHubIcon />} text="Github"/>
                            <LinkTextIconButton link="https://www.curseforge.com/minecraft/mc-mods/more-gears" borderColor="#2e2e2e" bgcolor="#1e1e1e" color="#f8f9fa" hoverBgColor="#a3561f" icon={<img src="cf.png" className="h-6 w-6"/>} text="CurseForge"/>
                            <LinkTextIconButton link="https://modrinth.com/mod/more-gears" borderColor="#2e2e2e" bgcolor="#1e1e1e" color="#f8f9fa" hoverBgColor="#178b46" icon={<img src="modrinth.png" className="h-6 w-6"/>} text="Modrinth"/>
                            <LinkTextIconButton link="https://moregears.coolerpromc.com/Home" borderColor="#2e2e2e" bgcolor="#1e1e1e" color="#f8f9fa" hoverBgColor="#7a64e8" icon={<LanguageIcon />} text="Wiki"/>
                        </div>
                    </div>
                    <div className="justify-center items-center hidden lg:flex">
                        <img src="more_gears.png" className="w-6/12 shadow-lg rounded-2xl"/>
                    </div>
                </section>
            </section>
            <section className="w-full">
                <section className="w-10/12 py-10 mx-auto">
                    <div className="text-center">
                        <span className="text-3xl font-semibold">Minecraft Versions</span>
                    </div>
                    <div className="mt-5 flex justify-center flex-wrap">
                        <VersionCard from={"from-indigo-500"} to={"to-purple-600"} version={"1.20.1"} forge={true} fabric={true}/>
                        <VersionCard from={"from-indigo-500"} to={"to-purple-600"} version={"1.21.1"} neoforge={true} fabric={true}/>
                        <VersionCard from={"from-indigo-500"} to={"to-purple-600"} version={"1.21.4"} neoforge={true} fabric={true}/>
                        <VersionCard from={"from-indigo-500"} to={"to-purple-600"} version={"1.21.5"} neoforge={true} fabric={true}/>
                        <VersionCard from={"from-indigo-500"} to={"to-purple-600"} version={"1.21.8"} neoforge={true} fabric={true}/>
                    </div>
                </section>
            </section>
            <section className="w-full">
                <section className="w-10/12 py-10 mx-auto">
                    <div className="text-center">
                        <span className="text-3xl font-semibold">Features</span>
                    </div>
                    <div className="mt-5 flex justify-center flex-wrap">
                        <FeatureCard img={"mg_feature/armor.png"} title={"New Armors"} description={"More Gears bring you 6 new tier of armors."}/>
                        <FeatureCard img={"mg_feature/sword.png"} title={"New Tools & Weapons"} description={"More Gears bring you 6 new tier of tools & weapons."}/>
                        <FeatureCard img={"mg_feature/bow.png"} title={"New Bows"} description={"More Gears bring you 6 new tier of bows."}/>
                        <FeatureCard img={"mg_feature/arrow.png"} title={"New Arrows"} description={"More Gears bring you 6 new tier of arrows."}/>
                    </div>
                </section>
            </section>
        </main>
    )
}