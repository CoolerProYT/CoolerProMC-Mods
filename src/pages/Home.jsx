import ModCard from "../components/ModCard.jsx";

export default function Home(){
    return (
        <main className="w-full h-lvh flex items-center flex-col">
            <div className="w-full flex items-center justify-center mt-10 md:mt-20 lg:mt-15 xl:mt-40">
                <img src="coolerpromc_mods_nav.png" alt="mod" className="w-11/12 md:w-8/12 xl:w-6/12" />
            </div>
            <div className="w-10/12 grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 mt-20 pb-5">
                <ModCard logo={"uncraft_everything.png"} from={"from-[#644A07]"} to={"to-[#594100]"} name={"Uncraft Everything"} link={"uncraft-everything"}/>
                <ModCard logo={"better_campfire_pot.png"} from={"from-red-400"} to={"to-red-500"} name={"Better Campfire Pot"} link={"better-campfire-pot"}/>
                <ModCard logo={"more_gears.png"} from={"from-indigo-500"} to={"to-purple-600"} name={"More Gears"} link={"more-gears"}/>
                <ModCard logo={"resources_trees.png"} from={"from-green-400"} to={"to-green-500"} name={"Resources Trees"} link={"resources-trees"}/>
                <ModCard logo={"arrow+.png"} from={"from-[#bdbdbd]"} to={"to-[#f5f5f5]"} name={"Arrow+"} link={"arrow-plus"}/>
                <ModCard logo={"archery_things.png"} from={"from-orange-400"} to={"to-orange-500"} name={"Archery Things"} link={"archery-things"}/>
                <ModCard logo={"fletching_recipe.png"} from={"from-yellow-400"} to={"to-yellow-500"} name={"Fletching Recipe"} link={"fletching-recipe"}/>
                <ModCard logo={"easy_brewing.png"} from={"from-blue-400"} to={"to-blue-500"} name={"Easy Brewing"} link={"easy-brewing"}/>
                <ModCard logo={"lake_feature_fix.png"} from={"from-orange-500"} to={"to-orange-600"} name={"Lake Feature Fix"} link={"lake-feature-fix"}/>
                <ModCard logo={"unstrip_log.png"} from={"from-[#fcba03]"} to={"to-[#997000]"} name={"Unstrip Log"} link={"unstrip-log"}/>
                <ModCard logo={"productiveslimes.png"} from={"from-lime-500"} to={"to-lime-600"} name={"Productive Slimes"} link={"productive-slimes"}/>
            </div>
        </main>
    )
}