import {
    Card,
    CardActions,
    CardContent,
} from "@mui/material";

import { Box } from "@mui/system";
import Title from "./Title";
import ViewBtn from "./ViewBtn";

export default function ReportCard({ name, number, onClick }) {
    return (
        <Box onClick={onClick} sx={{ cursor: "pointer" }}>
            <Card>
                <CardContent>
                    <Title
                        label={name}
                        caption={`Stock: ${number}`}
                        variant="h6"
                    />
                </CardContent>

                <CardActions sx={{ justifyContent: "center" }}>
                    <ViewBtn label={`View ${name}`} size="small" onClick={onClick} />
                </CardActions>
            </Card>
        </Box>
    );
}