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
import ApiSource from "./components/create-camp/ApiSource";
import CampaignDetails from "./components/create-camp/CampaignDetails";

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
        if(step===3 && nav === 'next') return // remove this line soon

        let to = step+1
        if(nav==='prev') to =step-1

        navigateStep(to)
    }

    const Header = (): string => {
        const srcType = newCamp.srcType
        let h = 'Choose Your Source Type'
        if(step === 2){
            if(srcType === 'Direct Upload') h = 'Upload Your Video File' 
            else h = `Enter ${srcType} URL or Search ${srcType} videos`
        } else if (step === 3) {
            h = "Enter campaign details"
        }

        return h
    }

    const Selector = () => {
        if(step === 2){
            if(newCamp.srcType === 'Direct Upload') return <UploadVideo />
            else return <ApiSource />
        } else if(step === 3) {
            return <CampaignDetails />
        } else {
            return <SelectSource updateSrc={updateCampValue} />
        }
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
                { Header() }
            </Typography>
            <Grid 
                container 
                spacing={2} 
                className="create-camp-grid"
                sx={{
                    my: 2
                }}
            >
                { Selector() }
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