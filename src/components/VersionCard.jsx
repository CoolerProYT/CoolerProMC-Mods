export default function VersionCard({version, forge, neoforge, fabric, from, to, className}) {
    return (
        <div className={`relative group transition-all duration-300 ${className}`}>
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${from} ${to} rounded-xl opacity-75 blur-sm animate-pulse`}></div>
            <div className="relative border border-transparent rounded-xl px-3 py-5 flex flex-col items-center justify-center bg-neutral-800 h-full">
                <span className="text-2xl font-semibold">{version}</span>
                <div className="mt-5 flex">
                    {forge && <img src={"forge.png"} className="w-10 h-10 mx-1.5" />}
                    {neoforge && <img src={"neoforge.png"} className="w-10 h-10 mx-1.5" />}
                    {fabric && <img src={"fabric.png"} className="w-10 h-10 mx-1.5" />}
                </div>
            </div>
        </div>
    )
}