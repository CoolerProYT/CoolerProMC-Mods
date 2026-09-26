// Single source of truth for every mod on the site.
// To add a mod: drop its logo in /public, add an entry below. Routes, nav,
// search, the home grid and the version matrix all pick it up automatically.
//
// Version status:
//   "active"  – actively developed, gets new features
//   "lts"     – bug fixes only
//   "eol"     – no longer maintained
//
// Versions are detected automatically too: any Minecraft version you publish on Modrinth or
// CurseForge that is newer than everything listed here is added as "active" (see withAutoVersions).
// So you only need to edit `versions` to change a status. Set `autoVersions: false` to opt a mod out.

import psGameplay from "../assets/ps_gameplay.png";
import mgGameplay from "../assets/mg_gameplay.png";
import ueGameplay from "../assets/ue_gameplay.png";
import modrinthVersions from "./versions.json";
import curseforge from "./curseforge.json";

const v = (mc, loaders, status = "active") => ({mc, loaders, status});
const NF = ["neoforge", "fabric"];
const FF = ["forge", "fabric"];
const ALL = ["forge", "neoforge", "fabric"];

const manualMods = [
    {
        slug: "uncraft-everything",
        name: "Uncraft Everything",
        modrinth: "uncraft-everything",
        curseforge: "uncraft-everything",
        tagline: "Crafted the wrong item? Uncraft everything with this mod!",
        logo: "/uncraft_everything.png",
        banner: ueGameplay,
        accent: "#c4972f",
        categories: ["Game Mechanics", "Utility"],
        links: {
            github: "https://github.com/CoolerProYT/UncraftEverything",
            curseforge: "https://www.curseforge.com/minecraft/mc-mods/uncraft-everything",
            modrinth: "https://modrinth.com/mod/uncraft-everything",
            wiki: "https://uncrafteverything.coolerpromc.com/",
        },
        features: [
            {img: "/ue_feature/uncraft.png", title: "Uncrafting", description: "All crafting and smithing recipes can be uncrafted using the Uncrafting Table. Individual recipes can be toggled in the config file."},
        ],
        versions: [
            v("1.16.5", FF, "eol"),
            v("1.18.2", ["forge"], "eol"),
            v("1.19.2", ["forge"], "eol"),
            v("1.20.1", FF, "lts"),
            v("1.21.1", ALL, "lts"),
            v("1.21.4", NF, "eol"),
            v("1.21.5", ALL, "eol"),
            v("1.21.6-1.21.8", ALL, "eol"),
            v("1.21.9-1.21.10", ALL, "eol"),
            v("1.21.11", ALL, "eol"),
            v("26.1", NF),
            v("26.2", NF),
            v("26.3", NF),
        ],
    },
    {
        slug: "better-campfire-pot",
        name: "Cobblemon: Better Campfire Pot",
        shortName: "Better Campfire Pot",
        modrinth: "cobblemon-better-campfire-pot",
        curseforge: "cobblemon-better-campfire-pot",
        tagline: "A Cobblemon addon that makes the cooking pot faster and easier to automate.",
        logo: "/better_campfire_pot.png",
        accent: "#f87171",
        categories: ["Utility", "Cobblemon"],
        links: {
            github: "https://github.com/CoolerProYT/Better-Campfire-Pot",
            curseforge: "https://www.curseforge.com/minecraft/mc-mods/cobblemon-better-campfire-pot",
            modrinth: "https://modrinth.com/mod/cobblemon-better-campfire-pot",
            wiki: "https://bettercampfirepot.coolerpromc.com/",
        },
        features: [],
        versions: [
            v("1.21.1", NF),
        ],
    },
    {
        slug: "more-gears",
        name: "More Gears",
        modrinth: "more-gears",
        curseforge: "more-gears",
        tagline: "More tiers of tools, armor and weapons. The highest tier is indestructible.",
        logo: "/more_gears.png",
        banner: mgGameplay,
        accent: "#8b5cf6",
        categories: ["Equipment"],
        links: {
            github: "https://github.com/CoolerProYT/MoreGears",
            curseforge: "https://www.curseforge.com/minecraft/mc-mods/more-gears",
            modrinth: "https://modrinth.com/mod/more-gears",
            wiki: "https://moregears.coolerpromc.com/",
        },
        features: [
            {img: "/mg_feature/armor.png", title: "New Armors", description: "Six new tiers of armor to work your way through."},
            {img: "/mg_feature/sword.png", title: "New Tools & Weapons", description: "Six new tiers of tools and weapons."},
            {img: "/mg_feature/bow.png", title: "New Bows", description: "Six new tiers of bows."},
            {img: "/mg_feature/arrow.png", title: "New Arrows", description: "Six new tiers of arrows."},
        ],
        versions: [
            v("1.20.1", FF, "lts"),
            v("1.21.1", NF, "lts"),
            v("1.21.4", NF, "eol"),
            v("1.21.5", NF, "eol"),
            v("1.21.8", NF, "eol"),
            v("1.21.10", NF, "eol"),
            v("1.21.11", NF, "eol"),
            v("26.1", NF),
            v("26.2", NF),
            v("26.3", NF),
        ],
    },
    {
        slug: "resources-trees",
        name: "Resources Trees",
        modrinth: "resourcestrees",
        curseforge: "resourcestrees",
        tagline: "A new way to generate resources such as iron, gold and diamond — grow them on trees.",
        logo: "/resources_trees.png",
        accent: "#4ade80",
        categories: ["Economy", "Game Mechanics"],
        links: {
            github: "https://github.com/CoolerProYT/Resources-Trees",
            curseforge: "https://www.curseforge.com/minecraft/mc-mods/resourcestrees",
            modrinth: "https://modrinth.com/mod/resourcestrees",
            wiki: "https://resourcestrees.coolerpromc.com/",
        },
        features: [
            {img: "/rt_feature/resource.png", title: "Resources from Leaf Fragments", description: "Leaf Fragments drop when you farm trees and can be crafted into all sorts of resources."},
            {img: "/rt_feature/sapling.png", title: "Resource Saplings", description: "Many resource saplings are added to the game — farm them to collect Leaf Fragments."},
            {img: "/rt_feature/tree_simulator.png", title: "Tree Simulator", description: "Automate your tree farming with the Tree Simulator."},
        ],
        versions: [
            v("1.20.1", ["forge"], "lts"),
            v("1.21.1", NF, "lts"),
            v("1.21.10", ALL, "eol"),
            v("1.21.11", ALL, "eol"),
            v("26.1", NF),
            v("26.2", NF),
            v("26.3", NF),
        ],
    },
    {
        slug: "arrow-plus",
        name: "Arrow+",
        modrinth: "arrow+",
        curseforge: "arrow",
        tagline: "New arrow types with different damage levels, crafted from vanilla ingredients.",
        logo: "/arrow+.png",
        accent: "#d4d4d8",
        categories: ["Equipment", "Utility"],
        links: {
            github: "https://github.com/CoolerProYT/ArrowPlus",
            curseforge: "https://www.curseforge.com/minecraft/mc-mods/arrow",
            modrinth: "https://modrinth.com/mod/arrow+",
            wiki: "https://arrowplus.coolerpromc.com/",
        },
        features: [
            {img: "/arrow_feature/more_arrows.png", title: "More Arrows", description: "18 new arrows, all craftable with vanilla materials."},
            {img: "/arrow_feature/different_damage.png", title: "Different Damage", description: "Every arrow deals different damage based on the material it's made from."},
            {img: "/arrow_feature/bow_pulling.png", title: "Dynamic Bow Texture", description: "The arrow shown on a drawn bow changes color to match the arrow being used."},
        ],
        versions: [
            v("1.20.1", FF, "lts"),
            v("1.21.1", ALL, "lts"),
            v("1.21.4", ALL, "eol"),
            v("1.21.5", ALL, "eol"),
            v("1.21.8", ALL, "eol"),
            v("1.21.10", ALL, "eol"),
            v("1.21.11", ALL, "eol"),
            v("26.1", NF),
            v("26.2", NF),
            v("26.3", NF),
        ],
    },
    {
        slug: "archery-things",
        name: "Archery Things",
        modrinth: "archery-things",
        curseforge: "archery-things",
        tagline: "A quiver that binds to your chestplate or leggings and lets bows fire the arrow you select.",
        logo: "/archery_things.png",
        accent: "#fb923c",
        categories: ["Equipment"],
        links: {
            github: "https://github.com/CoolerProYT/Archery-Things",
            curseforge: "https://www.curseforge.com/minecraft/mc-mods/archery-things",
            modrinth: "https://modrinth.com/mod/archery-things",
            wiki: "https://archerythings.coolerpromc.com/",
        },
        features: [],
        versions: [
            v("1.21.10", NF, "eol"),
            v("1.21.11", NF, "eol"),
            v("26.1", NF),
            v("26.2", NF),
            v("26.3", NF),
        ],
    },
    {
        slug: "fletching-recipe",
        name: "Fletching Recipe",
        modrinth: "fletching-recipe",
        curseforge: "fletching-recipe",
        tagline: "Craft more arrows from the same ingredients, plus explosive arrows, at the Fletching Table.",
        logo: "/fletching_recipe.png",
        accent: "#facc15",
        categories: ["Game Mechanics"],
        links: {
            github: "https://github.com/CoolerProYT/FletchingRecipe",
            curseforge: "https://www.curseforge.com/minecraft/mc-mods/fletching-recipe",
            modrinth: "https://modrinth.com/mod/fletching-recipe",
            wiki: "https://fletchingrecipe.coolerpromc.com/",
        },
        features: [],
        versions: [
            v("1.20.1", FF, "lts"),
            v("1.21.1", NF, "lts"),
            v("1.21.10", ALL, "eol"),
            v("1.21.11", ALL, "eol"),
            v("26.1", NF),
            v("26.2", NF),
            v("26.3", NF),
        ],
    },
    {
        slug: "easy-brewing",
        name: "Easy Brewing",
        modrinth: "easy-brewing",
        curseforge: "easy-brewing",
        tagline: "An upgradeable Brewing Station with potion stacking and full Cobblemon brewing support.",
        logo: "/easy_brewing.png",
        accent: "#60a5fa",
        categories: ["Game Mechanics", "Utility", "Cobblemon"],
        links: {
            github: "https://github.com/CoolerProYT/EasyBrewing",
            curseforge: "https://www.curseforge.com/minecraft/mc-mods/easy-brewing",
            modrinth: "https://modrinth.com/mod/easy-brewing",
            wiki: "https://easybrewing.coolerpromc.com/",
        },
        features: [],
        versions: [
            v("1.20.1", FF, "lts"),
            v("1.21.1", NF, "lts"),
            v("1.21.11", NF, "eol"),
            v("26.1", NF),
            v("26.2", NF),
            v("26.3", NF),
        ],
    },
    {
        slug: "lake-feature-fix",
        name: "Lake Feature Fix",
        modrinth: "lake-feature-fix",
        curseforge: "lake-feature-fix",
        tagline: "A simple fix for crashes that happen while lake features are generating.",
        logo: "/lake_feature_fix.png",
        accent: "#f97316",
        categories: ["Bug Fix"],
        links: {
            github: "",
            curseforge: "https://www.curseforge.com/minecraft/mc-mods/lake-feature-fix",
            modrinth: "https://modrinth.com/mod/lake-feature-fix",
            wiki: "",
        },
        features: [
            {img: "/lff_feature/lake.png", title: "Crash Fix", description: "Fixes an occasional crash when generating custom lake features."},
        ],
        versions: [
            v("1.21.1", NF),
            v("1.21.3", NF),
            v("1.21.4", NF),
            v("1.21.5", NF),
            v("1.21.8", NF),
            v("1.21.10", NF),
            v("1.21.11", NF),
        ],
        versionNote: "Not needed on Minecraft 26.1 and newer — the crash is fixed in vanilla.",
        autoVersions: false, // 26.x builds exist, but vanilla fixed the crash
    },
    {
        slug: "unstrip-log",
        name: "Unstrip Log",
        modrinth: "unstriplog",
        curseforge: "unstriplog",
        tagline: "Accidentally stripped your log? Use bark to unstrip it!",
        logo: "/unstrip_log.png",
        accent: "#fcba03",
        categories: ["Game Mechanics", "Utility"],
        links: {
            github: "https://github.com/CoolerProYT/UnstripLogNeo",
            curseforge: "https://www.curseforge.com/minecraft/mc-mods/unstriplog",
            modrinth: "https://modrinth.com/mod/unstriplog",
            wiki: "https://unstriplog.coolerpromc.com/",
        },
        features: [
            {img: "/ul_feature/bark.png", title: "Unstrip", description: "Stripping wood or logs gives you bark — use it to put the bark back on."},
        ],
        versions: [
            v("1.21.1", NF, "lts"),
            v("1.21.3", NF, "eol"),
            v("1.21.4", NF, "eol"),
            v("1.21.5", NF, "eol"),
            v("1.21.8", NF, "eol"),
            v("1.21.10", NF, "eol"),
            v("1.21.11", NF, "eol"),
            v("26.1", NF),
            v("26.2", NF),
            v("26.3", NF),
        ],
    },
    {
        slug: "more-sponge",
        name: "More Sponge",
        modrinth: "more-sponge",
        curseforge: "more-sponge",
        tagline: "Compressed sponges plus lava, snow and fire variants — each with 5 compression tiers and a Freezer machine.",
        logo: "/more_sponge.png",
        accent: "#fbbf24",
        categories: ["Game Mechanics", "Utility"],
        links: {
            github: "https://github.com/CoolerProYT/More-Sponge",
            curseforge: "https://www.curseforge.com/minecraft/mc-mods/more-sponge",
            modrinth: "https://modrinth.com/mod/more-sponge",
            wiki: "https://moresponge.coolerpromc.com/",
        },
        features: [],
        versions: [
            v("26.1.2", NF),
            v("26.2", NF),
            v("26.3", NF),
        ],
    },
    {
        slug: "terracotta-things",
        name: "Terracotta Things",
        modrinth: "terracotta-things",
        curseforge: "terracotta-things",
        tagline: "Stairs, slabs, walls, pressure plates and buttons for every terracotta and glazed terracotta.",
        logo: "/terracotta_things.png",
        accent: "#d9643a",
        categories: ["Decoration"],
        links: {
            github: "https://github.com/CoolerProYT/TerracottaThings",
            curseforge: "https://www.curseforge.com/minecraft/mc-mods/terracotta-things",
            modrinth: "https://modrinth.com/mod/terracotta-things",
            wiki: "https://terracottathings.coolerpromc.com/",
        },
        features: [],
        versions: [
            v("26.1.2", ALL),
            v("26.2", NF),
            v("26.3", NF),
        ],
    },
    {
        slug: "restricted-inventory",
        name: "Restricted Inventory",
        modrinth: "restricted-inventory",
        curseforge: "restricted-inventory",
        tagline: "Restrict inventory slots to specific items or tags, configured server-wide or per client.",
        logo: "/restricted_inventory.png",
        accent: "#ef4444",
        categories: ["Game Mechanics", "Utility"],
        links: {
            github: "https://github.com/CoolerProYT/Restricted-Inventory",
            curseforge: "https://www.curseforge.com/minecraft/mc-mods/restricted-inventory",
            modrinth: "https://modrinth.com/mod/restricted-inventory",
            wiki: "https://restrictedinventory.coolerpromc.com/",
        },
        features: [],
        versions: [
            v("1.20.1", FF),
            v("1.21.1", NF),
            v("26.1.2", NF),
            v("26.2", NF),
            v("26.3", NF),
        ],
    },
    {
        slug: "experience-skills",
        name: "Experience Skills",
        modrinth: "experience-skills",
        curseforge: "experience-skills",
        tagline: "Earn separate experience for each skill just by playing, then level up for attribute bonuses that grow with every level.",
        logo: "/experience_skills.png",
        accent: "#7ed957",
        categories: ["Game Mechanics", "Library"],
        links: {
            github: "https://github.com/CoolerProYT/Experience-Skills",
            curseforge: "https://www.curseforge.com/minecraft/mc-mods/experience-skills",
            modrinth: "https://modrinth.com/mod/experience-skills",
            wiki: "https://experienceskills.coolerpromc.com/",
        },
        features: [],
        versions: [
            v("26.1.2", NF),
            v("26.2", NF),
            v("26.3", NF),
        ],
    },
    {
        slug: "craftulator",
        name: "Craftulator",
        modrinth: "craftulator-coolerpromc",
        curseforge: "craftulator",
        tagline: "A simple in-game calculator for Minecraft.",
        logo: "/craftulator.png",
        accent: "#f43f5e",
        categories: ["Utility"],
        links: {
            github: "https://github.com/CoolerProYT/Craftulator",
            curseforge: "https://www.curseforge.com/minecraft/mc-mods/craftulator",
            modrinth: "https://modrinth.com/mod/craftulator-coolerpromc",
            wiki: "https://craftulator.coolerpromc.com/",
        },
        features: [],
        versions: [
            v("1.20.1", FF),
            v("1.21.1", NF),
            v("26.1", NF),
            v("26.2", NF),
            v("26.3", NF),
        ],
    },
    {
        slug: "ancient-creature",
        name: "Ancient Creature",
        modrinth: null,
        modrinthReview: true,
        curseforge: "ancient-creature",
        badge: "Beta",
        tagline: "Dig up fossils, decode their DNA and hatch 23 prehistoric creatures you can raise, breed and ride.",
        logo: "/ancient_creature.png",
        accent: "#f59e0b",
        categories: ["Mobs", "World Gen"],
        links: {
            github: "https://github.com/CoolerProYT/Ancient-Creature",
            curseforge: "https://www.curseforge.com/minecraft/mc-mods/ancient-creature",
            modrinth: "",
            wiki: "https://ancientcreature.coolerpromc.com/",
        },
        features: [
            {title: "Fossils in every biome", description: "Fossil ore underground, rock piles on the surface and dig sites to brush. Where you find a fossil decides which creature it belongs to."},
            {title: "A lab to build", description: "Six machines take a dirty bone all the way to a fertilized egg. Better chisels and better fossils mean better DNA."},
            {title: "23 creatures", description: "Land, sea and sky, from Triceratops and Megalodon to Woolly Mammoths and Quetzalcoatlus."},
            {title: "Species Journal", description: "Press J to see every species you've identified, with its habitat, diet, size and stats."},
            {title: "Plays well with others", description: "JEI pages for every step, Jade tooltips for eggs and hunger, and hopper support on every machine."},
            {title: "Datapack driven", description: "Every creature is plain JSON plus a Blockbench model. Add your own with a datapack, no Java needed."},
        ],
        versions: [
            v("26.1.2", NF),
            v("26.2", NF),
            v("26.3", NF),
        ],
    },
    {
        slug: "fish-trap",
        name: "Fish Trap",
        modrinth: null,
        modrinthReview: true,
        curseforge: "fishtrap",
        tagline: "Place a trap underwater, bait it and let it fish for you — biome-based catches, net upgrades and six baits.",
        logo: "/fish_trap.png",
        accent: "#2dd4bf",
        categories: ["Farming", "Automation"],
        links: {
            github: "https://github.com/CoolerProYT/FishTrap",
            curseforge: "https://www.curseforge.com/minecraft/mc-mods/fishtrap",
            modrinth: "",
            wiki: "https://fishtrap.coolerpromc.com/",
        },
        features: [
            {title: "Fishes without you", description: "Works only while fully submerged. Every completed timer is a catch, and overflow drops into the water instead of stalling."},
            {title: "Six baits", description: "Each bait sets both the timer and the luck of the roll, from Plant Bait to the Nautilus Lure."},
            {title: "Net upgrades", description: "Five upgrades make the trap faster and luckier."},
        ],
        versions: [
            v("26.1.2", NF),
            v("26.2", NF),
            v("26.3", NF),
        ],
    },
    {
        slug: "skipping-stone",
        name: "Skipping Stone",
        modrinth: null,
        modrinthReview: true,
        curseforge: "skipping-stone",
        tagline: "Pick stones off the shoreline, time your throw on a power meter and watch them skip across the water.",
        logo: "/skipping_stone.png",
        accent: "#7dd3fc",
        categories: ["Game Mechanics"],
        links: {
            github: "https://github.com/CoolerProYT/SkippingStone",
            curseforge: "https://www.curseforge.com/minecraft/mc-mods/skipping-stone",
            modrinth: "",
            wiki: "https://skippingstone.coolerpromc.com/",
        },
        features: [
            {title: "Shoreline stones", description: "Sand and gravel at the water's edge hide skipping stones, in four qualities from Chipped to Perfect."},
            {title: "A power meter, not a button", description: "Hold to charge, release in the green. Better stones hit harder but give you a smaller window."},
            {title: "Records & leaderboards", description: "Best skips and distance are saved per world, with a firework when you beat your own record."},
        ],
        versions: [
            v("26.1.2", NF),
            v("26.2", NF),
            v("26.3", NF),
        ],
    },
    {
        slug: "configurable-sponge",
        name: "Configurable Sponge",
        modrinth: null,
        modrinthReview: true,
        curseforge: "configurable-sponge",
        tagline: "Change how far a sponge reaches and how much water it soaks up. Two settings, no new blocks.",
        logo: "/configurable_sponge.png",
        accent: "#d4c23a",
        categories: ["Utility"],
        links: {
            github: "https://github.com/CoolerProYT/ConfigurableSponge",
            curseforge: "https://www.curseforge.com/minecraft/mc-mods/configurable-sponge",
            modrinth: "",
            wiki: "https://configurablesponge.coolerpromc.com/",
        },
        features: [
            {title: "Reach", description: "maxDepth sets how many blocks away a sponge can pull water from. Vanilla is 6."},
            {title: "Capacity", description: "maxCount sets how many blocks the search can cover before the sponge is full. Vanilla is 65."},
            {title: "Live reload", description: "Edit the config while the game or server is running — the next sponge uses the new numbers."},
        ],
        versions: [
            v("26.1.2", NF),
            v("26.2", NF),
            v("26.3", NF),
        ],
    },
    {
        slug: "productive-slimes",
        name: "Productive Slimes",
        modrinth: "productiveslimes",
        curseforge: "productive-slimes",
        tagline: "Farm slimes that produce resources like iron, gold and diamond — and generate energy.",
        logo: "/productiveslimes.png",
        banner: psGameplay,
        accent: "#84cc16",
        categories: ["Game Mechanics", "Mobs"],
        links: {
            github: "https://github.com/CoolerProYT/ProductiveSlimes",
            curseforge: "https://www.curseforge.com/minecraft/mc-mods/productive-slimes",
            modrinth: "https://modrinth.com/mod/productiveslimes",
            wiki: "",
        },
        features: [
            {img: "/ps_feature/energy.png", title: "Energy Generation", description: "Generate energy compatible with every mod that uses Forge Energy."},
            {img: "/ps_feature/resource.png", title: "Resource Generation", description: "Get any vanilla resource by farming slimes, then process slimeballs in the Melting and Soliding Stations."},
            {img: "/ps_feature/crafting.png", title: "Crafting Recipes", description: "Every slimeball from Productive Slimes works in any recipe that needs a slimeball."},
        ],
        versions: [
            v("1.16.5", ["forge"], "eol"),
            v("1.18.2", ["forge"], "eol"),
            v("1.19.2", ["forge"], "eol"),
            v("1.20.1", FF, "eol"),
            v("1.21.1", NF, "eol"),
            v("1.21.3", ["neoforge"], "eol"),
            v("1.21.4", NF, "eol"),
            v("1.21.5", NF, "eol"),
            v("1.21.8", NF, "eol"),
            v("1.21.10", NF, "eol"),
            v("1.21.11", NF, "eol"),
        ],
    },
];

export const LOADERS = {
    forge: {name: "Forge", icon: "/forge.png"},
    neoforge: {name: "NeoForge", icon: "/neoforge.png"},
    fabric: {name: "Fabric", icon: "/fabric.png"},
};

export const STATUS = {
    active: {label: "Active", hint: "New features & fixes", color: "#34d399"},
    lts: {label: "Bug fixes", hint: "Bug fixes only", color: "#facc15"},
    eol: {label: "Unsupported", hint: "No longer maintained", color: "#f87171"},
};

export const displayName = (mod) => mod.shortName ?? mod.name;
export const modBySlug = (slug) => mods.find((m) => m.slug === slug);
export const thumbOf = (src) => src.replace(/^\/(.+)\.png$/, "/thumbs/$1.webp");

// "1.21.6-1.21.8" sorts by its first version; 26.x naturally sorts above 1.x.
export function compareMc(a, b) {
    const pa = a.split("-")[0].split(".").map(Number);
    const pb = b.split("-")[0].split(".").map(Number);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
        const d = (pa[i] ?? 0) - (pb[i] ?? 0);
        if (d) return d;
    }
    return a.length - b.length;
}

const minorOf = (mc) => mc.split(".").slice(0, 2).join(".");

// Adds Minecraft versions that were published on Modrinth/CurseForge but aren't listed yet.
// Only versions newer than the newest listed one are added (so old patch releases don't clutter
// the table), and patch releases are grouped under their minor version: 26.4 + 26.4.1 -> one "26.4" row.
function withAutoVersions(mod) {
    if (mod.autoVersions === false) return mod;
    const found = {};
    const sources = [modrinthVersions.mods[mod.modrinth], curseforge.mods[mod.curseforge]?.versions];
    for (const src of sources) {
        for (const [mc, loaders] of Object.entries(src ?? {})) {
            const set = (found[mc] ??= new Set());
            loaders.forEach((l) => set.add(l));
        }
    }

    const listed = mod.versions.flatMap((x) => x.mc.split("-"));
    const newest = [...listed].sort(compareMc).at(-1);
    const listedMinors = new Set(listed.map(minorOf));
    const extra = {};
    for (const [mc, loaders] of Object.entries(found)) {
        if (!loaders.size || (newest && compareMc(mc, newest) <= 0) || listedMinors.has(minorOf(mc))) continue;
        const row = (extra[minorOf(mc)] ??= {mc, loaders: new Set(), status: "active", auto: true});
        if (compareMc(mc, row.mc) < 0) row.mc = mc;
        loaders.forEach((l) => row.loaders.add(l));
    }
    const added = Object.values(extra).map((row) => ({...row, loaders: ["forge", "neoforge", "fabric"].filter((l) => row.loaders.has(l))}));
    return added.length ? {...mod, versions: [...mod.versions, ...added]} : mod;
}

export const mods = manualMods.map(withAutoVersions);

export const allMcVersions = [...new Set(mods.flatMap((m) => m.versions.map((x) => x.mc)))].sort(compareMc).reverse();

export const modLoaders = (mod) => Object.keys(LOADERS).filter((l) => mod.versions.some((x) => x.loaders.includes(l)));

export const latestMc = (mod) => mod.versions.map((x) => x.mc).sort(compareMc).at(-1);

export const isMaintained = (mod) => mod.versions.some((x) => x.status !== "eol");
