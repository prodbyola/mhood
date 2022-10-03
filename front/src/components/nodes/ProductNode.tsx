import { Typography } from '@mui/material'
import { ProductContent } from "../../models/interfaces/node";

export default function ProductNode(props: {content: ProductContent}){
    const content = props.content

    return (
        <div className='product-node'>
            <div 
                style={{
                    background: 'url('+content.img+')',
                    height: 180,
                    width: 180,
                    backgroundSize: 'cover'
                }} 
                className='img' 
            />
            <Typography className='name'>{content.name}</Typography>
            <Typography className='price'>${content.price}</Typography>
        </div>
    )
}