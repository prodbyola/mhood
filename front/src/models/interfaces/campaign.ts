import { NodeData, NodeInterface, NodeBasicData } from "./node"

export type SourceType = 'Direct Upload' | 'YouTube' | 'Vimeo'

export interface CampaignData {
    id: string
    title: string
    slug: string
    srcType?: SourceType
    src: string
    nodeData: NodeData[]
}

export type CampFormData = CampaignData & { file: File | null }
export type UpdateCampForm = (key: keyof CampFormData, value: CampFormData[keyof CampFormData]) => void

export interface CampaignInterface {
    data?: CampaignData
    nodes: NodeInterface[]
    loadData: (id: string) => void
    addNode: (node: NodeBasicData, pos?: {top: number; left: number}) => void
    removeNode: (node: NodeBasicData) => void
    save: () => void
}