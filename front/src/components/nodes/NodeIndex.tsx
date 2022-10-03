import { useEffect } from "react";
import Dynode from "dynamic-node";

import CountdownTimer from "./CountdownTimer";
import ImageNode from './ImageNode'
import CallToAction from './CallToAction'
import SubscriberNode from './SubscriberNode'
import ProductNode from './ProductNode'

import { 
    NodeData, 
    NodeInterface, 
    NodeStyle, 
    NodeType, 
    CTAContent, 
    SubscriberContent,
    ProductContent
} from "../../models/interfaces/node";
import { Typography, Box } from "@mui/material"

export default function NodeIndex(props: { node: NodeInterface, isEditor?: boolean }){
    const node = props.node
    const data = node.data
    const nodeType = data?.type as NodeType
    let styles = data?.styles as NodeStyle

    let isEditor = true
    if(typeof props.isEditor !== 'undefined') isEditor = props.isEditor

    useEffect(() => {
        if(isEditor){
            const dynode = new Dynode({
                element: data?.id as string,
                position: data?.position,
                dimension: data?.dimension
            })

            dynode.mount()
        }
    })

    const content = data?.content as NodeData['content']
    let campNode
    if(nodeType === 'Countdown Timer') campNode = <CountdownTimer date={content as Date} />
    else if(nodeType === 'Image') campNode = <ImageNode src={content as string} />
    else if(nodeType === 'CTA') campNode = <CallToAction content={content as CTAContent} />
    else if(nodeType === 'Subscriber') campNode = <SubscriberNode content={content as SubscriberContent} />
    else if(nodeType === 'Product') campNode = <ProductNode content={content as ProductContent} />
    else if(nodeType === 'Text') campNode = <Typography>{content as string}</Typography>
    
    return (
        <Box className="campaign-node" id={data?.id} style={styles}>
            { campNode }
        </Box>
    )

}