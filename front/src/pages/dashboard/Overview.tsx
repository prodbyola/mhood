import { Box, Card, OutlinedInput } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function DashboardOverview(){
    const demos = (length: number) => {
        const arr = []
        for (let i=0; i < length; i++) {
            arr.push(i)
        }

        return arr
    }

    return (
        <>
            <div className="items-header">
                <h3>Recent Campaigns</h3>
                <OutlinedInput placeholder="Search Campaign" margin="dense" endAdornment={ <SearchIcon /> } sx={{ height: "46px" }} />
            </div>
            <div className="dashboard-items">
                {
                    demos(6).map(() => (
                        <Card className="dash-item">
                            <img className="di-thumb" src="/thumbnail.jpg" alt="demo" />
                            <Box sx={{ padding: "8px" }}>
                                <h3 className="di-title">Campaign Title</h3>
                                <p>This is a short description of the campaign to easily remind users of what campaign is all about.</p>
                            </Box>
                        </Card>
                    ))
                }
                
            </div>
        </>
    )
}