import Button from "@mui/material/Button";

export default function LinkTextIconButton({link, borderColor, bgcolor, color, hoverBgColor, icon, text}) {
    return (
        <Button
            href={link}
            target="_blank"
            sx={{
                bgcolor: bgcolor,
                color: color,
                '&:hover': {
                    bgcolor: hoverBgColor,  // hover background
                },
                py: '.75rem',
                px: '.5rem',
                cursor: link === "" ? "not-allowed" : "pointer",
            }}
        >
            {icon} <span className="ms-2">{text}</span>
        </Button>

    )
}