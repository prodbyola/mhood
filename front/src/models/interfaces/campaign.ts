import { NodeData, NodeInterface } from "./node"

export type SourceType = 'Direct Upload' | 'YouTube' | 'Vimeo'

export interface CampaignData {
    id: string
    title: string
    slug: string
    srcType?: SourceType
    src: string
    nodeData: NodeData[]
}

export interface CampaignInterface {
    data?: CampaignData
    nodes: NodeInterface[]
    addNode: (node: NodeData) => void
    save: () => void
}