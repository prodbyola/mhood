import { TextField, Button } from '@mui/material'

import { SubscriberContent } from '../../models/interfaces/node'

export default function SubscriberNode(props: {content: SubscriberContent}){
    const content = props.content

    return (
        <div className='sub-node'>
            {
                !content.email.disabled && 
                <TextField
                className='sub-field'
                label="Name"
                value={content.name.value}
            />
            }
            {
                !content.name.disabled && 
                <TextField
                    className='sub-field'
                    label="Email"
                    value={content.email.value}
                />
            }
            <Button className='sub-btn' variant='contained'>{content.btnText}</Button>
        </div>
    )
}
