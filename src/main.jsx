import {StrictMode, useState, useEffect} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {Routes, Route, HashRouter, useLocation} from "react-router-dom";
import Home from './pages/Home'
import NavBar from "./layouts/NavBar.jsx";
import ProductiveSlimes from "./pages/ProductiveSlimes.jsx";
import MoreGears from "./pages/MoreGears.jsx";

function App() {
    const location = useLocation();
    const [shouldShowNav, setShouldShowNav] = useState(false);

    useEffect(() => {
        const currentPath = location.pathname.slice(1);
        setShouldShowNav(currentPath !== "");
    }, [location]);

    return (
        <>
            {shouldShowNav && <NavBar />}
            <Routes>
                <Route index element={<Home />}/>
                <Route path="/productive-slimes" element={<ProductiveSlimes />}/>
                <Route path="/more-gears" element={<MoreGears />}/>
            </Routes>
        </>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <HashRouter>
            <App />
        </HashRouter>
    </StrictMode>
);