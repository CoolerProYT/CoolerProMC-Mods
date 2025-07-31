import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {Link} from 'react-router-dom';
import ModDropdownCard from "../components/ModDropdownCard.jsx";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const pages = [
    {
        "name": "Home",
        "path": ""
    }
];

export default function NavBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="sticky" sx={{backgroundColor: '#1e1e1e', color: 'white'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link to={"/"} className={"hidden lg:flex w-2/12 me-5"}><img src="coolerpromc_mods_nav.png" /></Link>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Link to={"/"} className={"lg:hidden flex flex-col items-center"}><img className="flex grow justify-center w-6/12 md:w-3/12" src="coolerpromc_mods_nav.png" /></Link>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} className={"items-center"}>
                        <div>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                sx={{
                                    bgcolor: '#1e1e1e',
                                    color: '#f8f9fa',
                                    '&:hover': {
                                        bgcolor: '#333333',  // hover background
                                    },
                                    '&:active': {
                                        bgcolor: '#555555',  // active background
                                    },
                                }}
                            >
                                <span className="text-white flex items-center">Mods <KeyboardArrowDownIcon className={"ms-1"}/></span>
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                                slotProps={{
                                    paper: {
                                        sx: {
                                            bgcolor: "#1e1e1e",
                                            color: "#f8f9fa"
                                        },
                                    }
                                }}
                            >
                                <ModDropdownCard handleClose={handleClose} from={"from-lime-500"} to={"to-lime-600"} name={"Productive Slimes"} image={"productiveslimes.png"} link={"productive-slimes"}/>
                                <ModDropdownCard handleClose={handleClose} from={"from-indigo-500"} to={"to-purple-600"} name={"More Gears"} image={"more_gears.png"} link={"more-gears"}/>
                                <ModDropdownCard handleClose={handleClose} from={"from-orange-500"} to={"to-orange-600"} name={"Lake Feature Fix"} image={"lake_feature_fix.png"} link={"lake-feature-fix"}/>
                                <ModDropdownCard handleClose={handleClose} from={"from-[#644A07]"} to={"to-[#594100]"} name={"Uncraft Everything"} image={"uncraft_everything.png"} link={"uncraft-everything"}/>
                                <ModDropdownCard handleClose={handleClose} from={"from-[#fcba03]"} to={"to-[#997000]"} name={"Unstrip Log"} image={"unstrip_log.png"} link={"unstrip-log"}/>
                                <ModDropdownCard handleClose={handleClose} from={"from-[#bdbdbd]"} to={"to-[#f5f5f5]"} name={"Arrow+"} image={"arrow+.png"} link={"arrow-plus"}/>
                            </Menu>
                        </div>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}