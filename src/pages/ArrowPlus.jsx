import GitHubIcon from '@mui/icons-material/GitHub';
import LinkTextIconButton from "../components/LinkTextIconButton.jsx";
import LanguageIcon from '@mui/icons-material/Language';
import VersionCard from "../components/VersionCard.jsx";
import FeatureCard from "../components/FeatureCard.jsx";

export default function ArrowPlus() {
    return (
        <main>
            <section className={`w-full relative bg-no-repeat bg-cover bg- bg-center h-fit`}>
                <div className="w-full absolute h-full bg-neutral-800/75 z-0"></div>
                <section className="w-10/12 grid lg:grid-cols-3 xl:grid-cols-2 mx-auto justify-center items-center relative py-10 z-10">
                    <div className="flex flex-col justify-between items-center lg:col-span-2 xl:col-span-1">
                        <div>
                            <span className="text-3xl md:text-5xl font-semibold tracking-wider">Arrow+</span>
                        </div>
                        <div className="mt-8 grid gap-6 lg:gap-1 xl:gap-4 grid-cols-2 md:grid-cols-4">
                            <LinkTextIconButton link="https://github.com/CoolerProYT/ArrowPlus" borderColor="#333333" bgcolor="#1e1e1e" color="#f8f9fa" hoverBgColor="#333333" icon={<GitHubIcon />} text="Github"/>
                            <LinkTextIconButton link="https://www.curseforge.com/minecraft/mc-mods/arrow" borderColor="#2e2e2e" bgcolor="#1e1e1e" color="#f8f9fa" hoverBgColor="#a3561f" icon={<img src="cf.png" className="h-6 w-6"/>} text="CurseForge"/>
                            <LinkTextIconButton link="https://modrinth.com/mod/arrow+" borderColor="#2e2e2e" bgcolor="#1e1e1e" color="#f8f9fa" hoverBgColor="#178b46" icon={<img src="modrinth.png" className="h-6 w-6"/>} text="Modrinth"/>
                            <LinkTextIconButton link="" borderColor="#2e2e2e" bgcolor="#1e1e1e" color="#f8f9fa" hoverBgColor="#997000" icon={<LanguageIcon />} text="Wiki"/>
                        </div>
                    </div>
                    <div className="justify-center items-center hidden lg:flex">
                        <img src="arrow+.png" className="w-6/12 shadow-lg rounded-2xl"/>
                    </div>
                </section>
            </section>
            <section className="w-full">
                <section className="w-10/12 py-10 mx-auto">
                    <div className="text-center">
                        <span className="text-3xl font-semibold">Minecraft Versions</span>
                    </div>
                    <div className="mt-5 flex justify-center flex-wrap">
                        <VersionCard from={"from-[#bdbdbd]"} to={"to-[#f5f5f5]"} version={"1.20.1"} forge={true} fabric={true}/>
                        <VersionCard from={"from-[#bdbdbd]"} to={"to-[#f5f5f5]"} version={"1.21.1"} forge={true} neoforge={true} fabric={true}/>
                        <VersionCard from={"from-[#bdbdbd]"} to={"to-[#f5f5f5]"} version={"1.21.4"} forge={true} neoforge={true} fabric={true}/>
                        <VersionCard from={"from-[#bdbdbd]"} to={"to-[#f5f5f5]"} version={"1.21.5"} forge={true} neoforge={true} fabric={true}/>
                        <VersionCard from={"from-[#bdbdbd]"} to={"to-[#f5f5f5]"} version={"1.21.6 - 1.21.8"} forge={true} neoforge={true} fabric={true}/>
                    </div>
                </section>
            </section>
            <section className="w-full">
                <section className="w-10/12 py-10 mx-auto">
                    <div className="text-center">
                        <span className="text-3xl font-semibold">Features</span>
                    </div>
                    <div className="mt-5 flex justify-center flex-wrap">
                        <FeatureCard img={"arrow_feature/more_arrows.png"} title={"More Arrows"} description={"There are 18 new arrows added to the game. They cna be crafted with Vanilla material."}/>
                        <FeatureCard img={"arrow_feature/different_damage.png"} title={"Different Damage"} description={"Every arrow has different damage based on their material used."}/>
                        <FeatureCard img={"arrow_feature/bow_pulling.png"} title={"Dynamic Bow Pulling Tetxure"} description={"Arrow texture on bow pulling will change color according to arrow used."}/>
                    </div>
                </section>
            </section>
        </main>
    )
}