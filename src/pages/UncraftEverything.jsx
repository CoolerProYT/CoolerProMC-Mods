import GitHubIcon from '@mui/icons-material/GitHub';
import LinkTextIconButton from "../components/LinkTextIconButton.jsx";
import LanguageIcon from '@mui/icons-material/Language';
import VersionCard from "../components/VersionCard.jsx";
import FeatureCard from "../components/FeatureCard.jsx";

export default function UncraftEverything() {
    return (
        <main>
            <section className={`w-full relative bg-[url(https://github.com/CoolerProYT/CoolerProMC-Mods/blob/master/src/assets/ue_gameplay.png?raw=true)] bg-no-repeat bg-contain bg-center h-fit`}>
                <div className="w-full absolute h-full bg-neutral-800/75 z-0"></div>
                <section className="w-10/12 grid lg:grid-cols-3 xl:grid-cols-2 mx-auto justify-center items-center relative py-10 z-10">
                    <div className="flex flex-col justify-between items-center lg:col-span-2 xl:col-span-1">
                        <div>
                            <span className="text-3xl md:text-5xl font-semibold tracking-wider">Uncraft Everything</span>
                        </div>
                        <div className="mt-8 grid gap-6 lg:gap-1 xl:gap-4 grid-cols-2 md:grid-cols-4">
                            <LinkTextIconButton link="https://github.com/CoolerProYT/UncraftEverything" borderColor="#333333" bgcolor="#1e1e1e" color="#f8f9fa" hoverBgColor="#333333" icon={<GitHubIcon />} text="Github"/>
                            <LinkTextIconButton link="https://www.curseforge.com/minecraft/mc-mods/uncraft-everything" borderColor="#2e2e2e" bgcolor="#1e1e1e" color="#f8f9fa" hoverBgColor="#a3561f" icon={<img src="cf.png" className="h-6 w-6"/>} text="CurseForge"/>
                            <LinkTextIconButton link="https://modrinth.com/mod/uncraft-everything" borderColor="#2e2e2e" bgcolor="#1e1e1e" color="#f8f9fa" hoverBgColor="#178b46" icon={<img src="modrinth.png" className="h-6 w-6"/>} text="Modrinth"/>
                            <LinkTextIconButton link="https://github.com/CoolerProYT/UncraftEverything/wiki" borderColor="#2e2e2e" bgcolor="#1e1e1e" color="#f8f9fa" hoverBgColor="#644A07" icon={<LanguageIcon />} text="Wiki"/>
                        </div>
                    </div>
                    <div className="justify-center items-center hidden lg:flex">
                        <img src="uncraft_everything.png" className="w-6/12 shadow-lg rounded-2xl"/>
                    </div>
                </section>
            </section>
            <section className="w-full">
                <section className="w-10/12 py-10 mx-auto">
                    <div className="text-center">
                        <span className="text-3xl font-semibold">Minecraft Versions</span>
                    </div>
                    <div className="mt-5 flex justify-center flex-wrap">
                        <VersionCard from={"from-[#644A07]"} to={"to-[#594100]"} version={"1.16.5"} forge={true} fabric={true}/>
                        <VersionCard from={"from-[#644A07]"} to={"to-[#594100]"} version={"1.18.2"} forge={true}/>
                        <VersionCard from={"from-[#644A07]"} to={"to-[#594100]"} version={"1.19.2"} forge={true}/>
                        <VersionCard from={"from-[#644A07]"} to={"to-[#594100]"} version={"1.20.1"} forge={true} fabric={true}/>
                        <VersionCard from={"from-[#644A07]"} to={"to-[#594100]"} version={"1.21.1"} neoforge={true} fabric={true} forge={true}/>
                        <VersionCard from={"from-[#644A07]"} to={"to-[#594100]"} version={"1.21.4"} neoforge={true} fabric={true}/>
                        <VersionCard from={"from-[#644A07]"} to={"to-[#594100]"} version={"1.21.5"} neoforge={true} fabric={true} forge={true}/>
                        <VersionCard from={"from-[#644A07]"} to={"to-[#594100]"} version={"1.21.6-1.21.8"} neoforge={true} fabric={true} forge={true}/>
                    </div>
                </section>
            </section>
            <section className="w-full">
                <section className="w-10/12 py-10 mx-auto">
                    <div className="text-center">
                        <span className="text-3xl font-semibold">Features</span>
                    </div>
                    <div className="mt-5 flex justify-center flex-wrap">
                        <FeatureCard img={"ue_feature/uncraft.png"} title={"Uncrafting"} description={"All crafting and smithing recipes can be uncrafted by using Uncrafting Table. (Recipe can be toggle in config file)"}/>
                    </div>
                </section>
            </section>
        </main>
    )
}