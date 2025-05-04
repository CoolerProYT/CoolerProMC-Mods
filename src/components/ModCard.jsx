import {Link} from "react-router-dom";

export default function ModCard({logo, from, to, name, link}) {
    return (
        <Link to={link}>
            <div className="relative group transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${from} ${to} rounded-xl opacity-75 blur-sm group-hover:opacity-100 animate-pulse`}></div>
                <div className="relative border border-transparent rounded-xl px-3 py-10 flex flex-col items-center justify-center bg-neutral-800 h-full">
                    <img src={logo} className="w-1/3" alt={logo} />
                    <div className="mt-5 relative">
                        <span className="text-xl">{name}</span>
                        <div className="relative h-0.5 mt-1 w-full">
                            <div className={`absolute h-0.5 bg-gradient-to-r ${from} ${to} left-1/2 right-1/2 group-hover:left-0 group-hover:right-0 transition-all duration-300`}></div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}