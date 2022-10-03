import { NodeBasicData, NodeData, NodePosition, NodeType } from "../interfaces/node";
import { getNextMonth } from "../../utils";

const transformData = (nodeType: NodeType, data: NodeData): NodeData => {
    if(nodeType === 'Countdown Timer'){
        data.content = getNextMonth()
        data.dimension = {
            width: 302,
            height: 188
        }
    } else if(nodeType === 'Image') {
        data.content = '/demo.png'
        data.dimension = {
            width: 300,
            height: 300
        }
    } else if(nodeType === 'CTA') {
        data.content = {
            btnText: 'Click Now',
            text: 'Add your call to action text here or you can delete this text to leave just the button.'
        }

        data.dimension.height = 166
    } else if(nodeType === 'Subscriber'){
        data.content = {
            email: { value: '' },
            name: { value: '' },
            btnText: 'Subscribe'
        }

        data.dimension = {
            width: 378,
            height: 250
        }
    } else if(nodeType === 'Product'){
        data.content = {
            img: '/demo.png',
            name: 'Demo Product',
            price: 100,
            btnText: 'Buy Now'
        }

        data.dimension.height = 338
    }

    return data
}

export const getDefaults = (node: NodeBasicData, position?: NodePosition, timeIn=0): NodeData => {
    let data: NodeData = {
        ...node,
        content: 'Content Here',
        position: {
            left: 0,
            top: 0,
        },
        dimension: {
            height: 60,
            width: 300
        },
        styles: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white'
        },
        timeIn,
        timeOut: 30
    }


    if(position) data.position = position

    const nodeType = node.type
    if(nodeType !== 'Text') data = transformData(nodeType, data)
    
    return data
}