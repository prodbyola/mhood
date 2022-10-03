export const NODE_TYPE_LIST = [
    'Text', 'Countdown Timer', 
    'Image', 'CTA', 'Subscriber', 
    'Product', 'Watermark', 'Social Share'
] as const

export const ALIGN_POSITION_LIST = ['start', 'center', 'end'] as const

export type NodeType = typeof NODE_TYPE_LIST[number]
export type AlignPosition = typeof ALIGN_POSITION_LIST[number]

export type NodePosition = {
    left: number
    top: number
}

export type NodeDimension = {
    width: number
    height: number
}

type BasicNodeStyle = {
    alignItems: AlignPosition
    justifyContent: AlignPosition
    backgroundColor?: string
}

type TextNodeStyle = BasicNodeStyle & {
    fontSize?: number,
    color?: string
}

export type NodeStyle = TextNodeStyle

export interface NodeBasicData { id: string, type: NodeType }
export type CTAContent = {
    text?: string
    btnText: string
    link?: string
    newTab?: boolean
}

export type SubscriberContent = {
    name: {
        disabled?: boolean
        value: string
    },
    email: {
        disabled?: boolean
        value: string
    },
    btnText: string
}

export type ProductContent = {
    img: string
    name: string
    price: number
    btnText: string
}
export interface NodeData extends NodeBasicData {
    content: string | Date | CTAContent | SubscriberContent | ProductContent
    position: NodePosition
    dimension: NodeDimension
    styles: NodeStyle
    timeIn: number
    timeOut: number
}

export interface NodeInterface {
    data?: NodeData
    // move: () => void
    // resize: () => void
    delete: () => void
    editContent: () => void
    updateStyle: () => void
}