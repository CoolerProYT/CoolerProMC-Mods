// Small inline SVG icon set (replaces @mui/icons-material).
const base = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
};

const make = (paths) =>
    function Icon(props) {
        return <svg {...base} {...props}>{paths}</svg>;
    };

export const SearchIcon = make(<><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></>);
export const MenuIcon = make(<path d="M4 6h16M4 12h16M4 18h16"/>);
export const CloseIcon = make(<path d="M6 6l12 12M18 6 6 18"/>);
export const ChevronDown = make(<path d="m6 9 6 6 6-6"/>);
export const ChevronRight = make(<path d="m9 6 6 6-6 6"/>);
export const ArrowRight = make(<path d="M5 12h14M13 6l6 6-6 6"/>);
export const ExternalIcon = make(<><path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></>);
export const DownloadIcon = make(<><path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/></>);
export const HeartIcon = make(<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/>);
export const ClockIcon = make(<><circle cx="12" cy="12" r="8"/><path d="M12 8v4l2.5 2.5"/></>);
export const BookIcon = make(<><path d="M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 1-4-4Z"/><path d="M5 16a4 4 0 0 1 4-4h10"/></>);
export const GridIcon = make(<><rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/></>);
export const TableIcon = make(<><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 4v16"/></>);
export const TagIcon = make(<><path d="M3 12V4h8l10 10-8 8Z"/><circle cx="7.5" cy="8.5" r="1.2"/></>);

export function GitHubIcon(props) {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/>
        </svg>
    );
}
