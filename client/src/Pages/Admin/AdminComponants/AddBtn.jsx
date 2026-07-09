import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function AddBtn({ label, onclick ,size}) {
    return (
        <>
            <Button variant="contained" size={size} onClick={onclick}>
                <AddIcon /> Add {label}
            </Button>
        </>
    );
}