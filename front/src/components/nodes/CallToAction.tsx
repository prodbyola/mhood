import { Button, Typography } from '@mui/material'
import { CTAContent } from '../../models/interfaces/node'

export default function CallToAction(props: { content: CTAContent }){
    const content = props.content
    return (
        <div className='cta-node'>
            <Typography className='cta-text'>{content.text}</Typography>
            <Button className='cta-btn' variant='contained'>{content.btnText}</Button>
        </div>
    )
}