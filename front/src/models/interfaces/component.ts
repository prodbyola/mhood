export interface ComponentData {
    id: string
    type: string
    content: string
    styles: string
    timeIn: number
    timeOut: number
}

export interface ComponentInterface {
    data: ComponentData
    drag: () => void
    resize: () => void
    delete: () => void
    editContent: () => void
    updateStyle: () => void
}