import { Divider, Typography } from "@mui/material";

export default function Title({ label, caption, variant }) {
    return (
        <>
            <Typography variant={variant} sx={{ mt: 2, fontWeight: 700 }}>
                {label}
            </Typography>
            <Typography variant="caption">{caption}</Typography>
            <Divider sx={{ mb: 2 }} />
        </>
    );
}