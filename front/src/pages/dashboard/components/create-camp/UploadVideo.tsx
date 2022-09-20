import { DragEvent, useState } from "react"
import { Box, Typography, Button } from "@mui/material"
import SwitchVideoIcon from '@mui/icons-material/SwitchVideo';
import { Icon as Iconify } from "@iconify/react"

import { capitalize } from "../../../../utils"

const DropBox = (props: {dropFile: (evt: DragEvent) => void}) => {
    return (
        <Box 
            className="upload-box"
            onDrop={props.dropFile} 
            onDragEnter={e => e.preventDefault()}
            onDragOver={e => e.preventDefault()}
        >
            <Iconify className="iconify" icon="fa-solid:upload" />
            <Typography className="desc">Click or Drag Files Here</Typography>
        </Box>
    )
}

const PreviewPlayer = (props: {src: string, video: File | null, goBack: () => void}) => {
    const video = props.video
    const videoDetails = {
        name: video?.name,
        size: video?.size,
        type: video?.type
    }
    return (
        <>
            <div className="preview">
                <video className="preview-player" controls>
                    <source src={props.src} type="video/mp4" />
                </video>
                <div className="vid-details">
                    {
                        Object.keys(videoDetails).map((key) => {
                            const value = videoDetails[key as 'name']
                            return (
                                <div className="vid-meta">
                                    <Typography className="vd-key">{ capitalize(key) }: </Typography>
                                    <Typography className="vd-value">{value}</Typography>
                                </div>
                            )
                        })
                    }

                    <Button 
                        className="change-video" 
                        variant="contained"
                        startIcon={<SwitchVideoIcon />}
                        onClick={props.goBack}
                    >Change Video</Button>
                </div>
            </div>
        </>
    )
}

export default function UploadVideo(){
    const [videoFile, setVideo] = useState<File | null>(null)
    const [demoSrc, setDemoSrc] = useState<string | null>(null)
    const dropFile = (evt: DragEvent) => {
        evt.preventDefault()
        const file = evt.dataTransfer.files[0]
        setVideo(file)

        const url = URL.createObjectURL(file)
        setDemoSrc(url)
    }

    const removeVideo = () => {
        setVideo(null)
        setDemoSrc(null)
    }

    const el = !demoSrc 
        ? <DropBox dropFile={dropFile} /> 
        : <PreviewPlayer src={demoSrc} video={videoFile} goBack={removeVideo} />
    return (el)
}