import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function ViewBtn({ label, onclick ,size}) {
    return (
        <>
            <Button variant="outlined" size={size} onClick={onclick}>
                <VisibilityIcon /> View {label}
            </Button>
        </>
    );
}