import GitHubIcon from '@mui/icons-material/GitHub';
import Button from "@mui/material/Button";
import LinkTextIconButton from "../components/LinkTextIconButton.jsx";
import LanguageIcon from '@mui/icons-material/Language';
import VersionCard from "../components/VersionCard.jsx";

export default function ProductiveSlimes() {
    return (
        <main>
            <section className="w-full relative bg-[url(/ps_gameplay.png)] bg-no-repeat bg-bottom bg-fixed h-fit">
                <div className="w-full absolute h-full bg-neutral-800/75 z-0"></div>
                <section className="w-10/12 grid grid-cols-2 mx-auto justify-center items-center relative py-10 z-10">
                    <div className="flex flex-col justify-between items-center">
                        <div>
                            <span className="text-5xl font-semibold tracking-wider">Productive Slimes</span>
                        </div>
                        <div className="mt-8 grid gap-6 grid-cols-4">
                            <LinkTextIconButton link="https://github.com/CoolerProYT/ProductiveSlimes" borderColor="#333333" bgcolor="#1e1e1e" color="#f8f9fa" hoverBgColor="#333333" icon={<GitHubIcon />} text="Github"/>
                            <LinkTextIconButton link="https://www.curseforge.com/minecraft/mc-mods/productive-slimes" borderColor="#2e2e2e" bgcolor="#1e1e1e" color="#f8f9fa" hoverBgColor="#a3561f" icon={<img src="cf.png" className="h-6 w-6"/>} text="CurseForge"/>
                            <LinkTextIconButton link="https://modrinth.com/mod/productiveslimes" borderColor="#2e2e2e" bgcolor="#1e1e1e" color="#f8f9fa" hoverBgColor="#178b46" icon={<img src="modrinth.png" className="h-6 w-6"/>} text="Modrinth"/>
                            <LinkTextIconButton link="https://coolerproyt.github.io/ProductiveSlimes-Wiki/" borderColor="#2e2e2e" bgcolor="#1e1e1e" color="#f8f9fa" hoverBgColor="#8dc29b" icon={<LanguageIcon />} text="Wiki"/>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <img src="productiveslimes.png" className="w-6/12 shadow-lg rounded-2xl"/>
                    </div>
                </section>
            </section>
            <section className="w-full">
                <section className="w-10/12 py-10 mx-auto">
                    <div className="text-center">
                        <span className="text-3xl font-semibold">Minecraft Versions</span>
                    </div>
                    <div className="mt-5 flex justify-center flex-wrap">
                        <VersionCard className={"w-[23%] mx-[1%] my-3"} from={"from-lime-500"} to={"to-lime-600"} version={"1.16.5"} forge={true}/>
                        <VersionCard className={"w-[23%] mx-[1%] my-3"} from={"from-lime-500"} to={"to-lime-600"} version={"1.18.2"} forge={true}/>
                        <VersionCard className={"w-[23%] mx-[1%] my-3"} from={"from-lime-500"} to={"to-lime-600"} version={"1.19.2"} forge={true}/>
                        <VersionCard className={"w-[23%] mx-[1%] my-3"} from={"from-lime-500"} to={"to-lime-600"} version={"1.20.1"} forge={true} fabric={true}/>
                        <VersionCard className={"w-[23%] mx-[1%] my-3"} from={"from-lime-500"} to={"to-lime-600"} version={"1.21.1"} neoforge={true} fabric={true}/>
                        <VersionCard className={"w-[23%] mx-[1%] my-3"} from={"from-lime-500"} to={"to-lime-600"} version={"1.21.3"} neoforge={true}/>
                        <VersionCard className={"w-[23%] mx-[1%] my-3"} from={"from-lime-500"} to={"to-lime-600"} version={"1.21.4"} neoforge={true} fabric={true}/>
                        <VersionCard className={"w-[23%] mx-[1%] my-3"} from={"from-lime-500"} to={"to-lime-600"} version={"1.21.5"} neoforge={true} fabric={true}/>
                    </div>
                </section>
            </section>
        </main>
    )
}