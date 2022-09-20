export interface NodeData {
    id: string
    type: string
    content: string
    styles: string
    timeIn: number
    timeOut: number
}

export interface NodeInterface {
    data: NodeData
    drag: () => void
    resize: () => void
    delete: () => void
    editContent: () => void
    updateStyle: () => void
}