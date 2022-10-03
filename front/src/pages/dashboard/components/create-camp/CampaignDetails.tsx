import { FormEvent, FocusEvent } from 'react'

import { Box, TextField } from '@mui/material'
import { theme } from '../../../../theme'

import { UpdateCampForm } from "../../../../models/interfaces/campaign";
import { slugify } from '../../../../utils'

type InputProps = {
    id: string
    label: string, 
    autoFocus?: boolean, 
    onInput: (e: FormEvent) => void, 
    onFocus?: (e: FocusEvent) => void
}

const Input = (props: InputProps) => (
    <TextField 
        id={props.id}
        className="field" 
        label={props.label} variant="outlined" 
        autoFocus={props.autoFocus}
        onInput={props.onInput}
        onFocus={props.onFocus}
        sx={{
            background: theme.palette.secondary.light,
            
            "& label.Mui-focused, .MuiOutlinedInput-input": {
                color: "white",
            },
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white"
            },
            "& label": {
                color: "white"
            },
            "& .Mui-focused:before": {
                borderColor: "white"
            }
        }}
    />
)

export default function CampaignDetails(props: {onValueUpdate: UpdateCampForm}){
    const updateValues = (e: FormEvent, key: 'title' | 'slug') => {
        const target = e.target as HTMLInputElement
        const value = target.value
        props.onValueUpdate(key, value)
    }

    const updateEmptySlug = (e: FocusEvent) => {
        const target = e.target as HTMLInputElement
        const slug = target.value

        const titleInput = document.getElementById('camp-title') as HTMLInputElement
        const title = titleInput.value

        const hasTitle = title && title !== ''
        const hasSlug = slug && slug !== ''

        if(hasTitle && !hasSlug){
            const st = slugify(title) as string // slugified title
            target.value = st
            props.onValueUpdate('slug', st)
        }
    }

    return (
        <Box className="camp-detail-form">
            <Input id="camp-title" label="Name" autoFocus={true} onInput={(e) => updateValues(e, 'title')} />
            <Input id="camp-slug" label="slug" onInput={(e) => updateValues(e, 'slug')} onFocus={updateEmptySlug} />
        </Box>
    )
}