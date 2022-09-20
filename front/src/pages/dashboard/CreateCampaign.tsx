import { Container, Box, Button, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { theme } from "../../theme"

import { CampaignData, SourceType } from "../../models/interfaces/campaign";
import { NodeData } from "../../models/interfaces/node";
import { useState } from "react";

import SelectSource from "./components/create-camp/SelectSource";
import UploadVideo from "./components/create-camp/UploadVideo";

export default function CreateCampaign(){
    const palette = theme.palette
    const campData: CampaignData = {
        id: 'new',
        title: 'New Campaign',
        slug: '',
        srcType: undefined,
        src: '',
        nodeData: []
    }

    const [newCamp, updateCamp] = useState(campData)
    const [step, navigateStep] = useState(1)

    const updateCampValue = (key: keyof CampaignData, value: CampaignData[keyof CampaignData]) => {
        newCamp[key] = value as string & (SourceType | undefined) & NodeData[]
        updateCamp(newCamp)
    }

    const navTo = (nav: 'prev' | 'next') => {
        if(step===1 && !newCamp.srcType) return

        let to = step+1
        if(nav==='prev') to =step-1
        navigateStep(to)
    }
    
    return (
        <Container 
            style={{
                background: `linear-gradient( 
                    135deg, ${palette.secondary.light}, ${palette.secondary.dark}
                )`,
                padding: '10% 15%',
            }}
            className="create-camp-content"
        >
            <Typography 
                className={"title step-"+step}
                variant="h3" 
            >
                Choose Your Video Source
            </Typography>
            <Grid 
                container 
                spacing={2} 
                className="create-camp-grid"
                sx={{
                    my: 2
                }}
            >
                {
                    newCamp.srcType === 'Direct Upload' && step === 2 
                    ? <UploadVideo />
                    : <SelectSource updateSrc={updateCampValue} />
                }
            </Grid>
            <Box className="action-box">
                {
                    step > 1 &&
                    <Button 
                        variant="outlined" 
                        startIcon={<ArrowBackIcon />}
                        className="action-btn"
                        onClick={() => navTo('prev')}
                    >Back</Button>
                }
                <Button 
                    variant="outlined" 
                    endIcon={<ArrowForwardIcon />}
                    className="action-btn"
                    onClick={() => navTo('next')}
                >Continue</Button>
            </Box>
        </Container>
    )
}