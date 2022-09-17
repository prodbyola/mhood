export interface CampaignData {
    id: string
    title: string
    slug: string
    srcType: 'manual' | 'youtube' | 'vimeo'
    src: string
}

export interface CampaignInterface {
    data: CampaignData
    save: () => void
}