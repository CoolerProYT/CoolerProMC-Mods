import MenuItem from "@mui/material/MenuItem";
import {Link} from "react-router-dom";
import * as React from "react";
import ModCard from "./ModCard.jsx";

export default function ModDropdownCard({handleClose, from, to, name, image, link}){
    return (
        <Link to={link}>
            <MenuItem
                onClick={handleClose}
                disableRipple
                sx={{
                    p: 0,
                    bgcolor: 'transparent',
                    '&:hover': {
                        bgcolor: 'transparent'
                    }
                }}
            >
                <div className="relative group w-full px-2 my-1.5">
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${from} ${to} rounded-md opacity-75 blur-sm group-hover:opacity-100 animate-pulse`}></div>
                    <div className="relative flex items-center space-x-2 bg-[#1e1e1e] px-3 py-2 rounded-md w-f">
                        <img src={image} className="w-8 h-8" />
                        <span className="text-white">{name}</span>
                    </div>
                </div>
            </MenuItem>
        </Link>
    )
}