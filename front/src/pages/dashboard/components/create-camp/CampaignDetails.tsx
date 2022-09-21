import { Box, TextField } from '@mui/material'
import { theme } from '../../../../theme'

const Input = (props: {label: string, autoFocus?: boolean}) => (
    <TextField 
        className="field" 
        label={props.label} variant="outlined" 
        autoFocus={props.autoFocus}
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

export default function CampaignDetails(){
    return (
        <Box className="camp-detail-form">
            <Input label="Name" autoFocus={true} />
            <Input label="slug" />
        </Box>
    )
}