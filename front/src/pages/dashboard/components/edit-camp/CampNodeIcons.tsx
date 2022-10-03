import { v4 as uuid4 } from 'uuid'

import { DragEvent } from 'react'
import { Chip } from '@mui/material'

import {
    SvgIconComponent,
    Rtt,
    AccessAlarms,
    Image as ImageIcon,
    TouchApp as TouchAppIcon,
    Loyalty as LoyaltyIcon,
    ShoppingCart as ShoppingCartIcon,
    BrandingWatermark,
    Share as ShareIcon
} from '@mui/icons-material';

import { NodeType, NodeBasicData } from '../../../../models/interfaces/node';

export default function CampNodeIcons(){
    const icons = new Map<NodeType, SvgIconComponent>()
    icons.set('Text', Rtt)
    icons.set('Countdown Timer', AccessAlarms)
    icons.set('Image', ImageIcon)
    icons.set('CTA', TouchAppIcon)
    icons.set('Subscriber', LoyaltyIcon)
    icons.set('Product', ShoppingCartIcon)
    icons.set('Watermark', BrandingWatermark)
    icons.set('Social Share', ShareIcon)

    const startDrag = (e: DragEvent, data: NodeBasicData) => {
        e.dataTransfer.setData('newNodeData', JSON.stringify(data))
    }
    
    return (
        <div className="components">
            {
                Array.from(icons.keys()).map((label, index) => {
                    const Icon = icons.get(label) as SvgIconComponent
                    return (
                        <Chip 
                            className="comp" 
                            key={index}
                            icon={<Icon />} 
                            label={label} 
                            onDragStart={(e) => startDrag(e, {id: uuid4(), type: label})}
                            color='primary'
                            draggable 
                        />
                    )
                })
            }    
        </div>
    )
    
}