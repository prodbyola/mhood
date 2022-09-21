import { useState } from "react";
import {  Avatar, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { Icon as Iconify } from "@iconify/react"

import { CampaignData } from "../../../../models/interfaces/campaign";

export default function SelectSource(props: {updateSrc: (key: keyof CampaignData, value: CampaignData[keyof CampaignData]) => void}) {
    // const iw = 130
    const [selectedSrc, selectSrc] = useState('')
    const [hovered, hover] = useState('')

    const selections = [
        { label: 'Direct Upload', icon: 'fa-solid:upload' },
        { label: 'YouTube', icon: 'fa-brands:youtube' },
        { label: 'Vimeo', icon: 'fa-brands:vimeo-square' },
    ]

    return (
        <>
            { selections.map((src, index) => {
                let avatarClass = "avatar"
                let labelClass = "label"
                if(selectedSrc === src.label){
                    avatarClass += " selected"
                }

                if(hovered === src.label){
                    labelClass += " selected"
                }
                return (
                    <Grid xs={4} key={index} className="vid-src">
                        <Avatar 
                            className={avatarClass}
                            onClick={() => {
                                hover('')
                                selectSrc(src.label)
                                props.updateSrc('srcType', src.label)
                            }} 
                            onMouseEnter={() => hover(src.label)}
                            onMouseLeave={() => hover('')}
                        >
                            <Iconify 
                                icon={src.icon} 
                                className="iconify"
                            />
                        </Avatar>
                        <Typography className={labelClass}>
                            {src.label}
                        </Typography>
                    </Grid>
                )
            })}
        </>
    )
}