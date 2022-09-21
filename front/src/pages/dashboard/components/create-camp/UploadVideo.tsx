import { useState, DragEvent, ChangeEvent } from "react"
import { Box, Typography, Button } from "@mui/material"
import SwitchVideoIcon from '@mui/icons-material/SwitchVideo';
import { Icon as Iconify } from "@iconify/react"

import { capitalize } from "../../../../utils"

type DropboxProps = {
    onDropFile: (evt: DragEvent) => void, 
    onChangeFile: (evt: ChangeEvent) => void
}

const DropBox = (props: DropboxProps) => {
    const uiid = "upload-input"
    const clickInput = () => {
        const ui = document.getElementById(uiid)
        ui?.click()
    }

    return (
        <>
            <input id={uiid} type="file" accept="video/*" onChange={props.onChangeFile} hidden />
            <Box 
                className="upload-box"
                onDrop={props.onDropFile} 
                onDragEnter={e => e.preventDefault()}
                onDragOver={e => e.preventDefault()}
                onClick={clickInput}
            >
                <Iconify className="iconify" icon="fa-solid:upload" />
                <Typography className="desc">Click or Drag Files Here</Typography>
            </Box>
        </>
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
            <div className="upload-preview">
                <video className="preview-player" controls>
                    <source src={props.src} type="video/mp4" />
                    <source src={props.src} type="video/mkv" />
                    <source src={props.src} type="video/x-matroska" />
                </video>
                <div className="vid-details">
                    {
                        Object.keys(videoDetails).map((key) => {
                            const value = videoDetails[key as 'name']
                            return (
                                <div className="vid-meta">
                                    <Typography className="vd-key">{ capitalize(key) }: </Typography>
                                    <Typography className="vd-value ellipsis">{value}</Typography>
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

    /** Updates video states (file and src). */
    const updateVideo = (file: File) => {
        setVideo(file)

        const url = URL.createObjectURL(file)
        setDemoSrc(url)
    }

    /** Sets video states (file and src) to null */
    const removeVideo = () => {
        setVideo(null)
        setDemoSrc(null)
    }

    /** Event called when file is dropped on `DropBox` component */
    const dropFile = (evt: DragEvent) => {
        evt.preventDefault()
        const file = evt.dataTransfer.files[0]
        updateVideo(file)
    }

    /** Event called when file is changed when `DropBox` is clicked. */
    const changeFile = (evt: ChangeEvent) => {
        const input = evt.target as HTMLInputElement
        const files = input.files

        if(files) updateVideo(files[0])
    }

    const el = !demoSrc 
        ? <DropBox onDropFile={dropFile} onChangeFile={changeFile}  /> 
        : <PreviewPlayer src={demoSrc} video={videoFile} goBack={removeVideo} />
    return (el)
}