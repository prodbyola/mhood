import { DragEvent, MouseEvent, useState } from 'react'

import { ThemeProvider } from '@mui/material/styles';
import { Container, Box, Card, TextField } from '@mui/material'
import { 
    Delete as DeleteIcon, 
} from '@mui/icons-material'
import TuneIcon from '@mui/icons-material/Tune';

import { theme } from '../../theme';
import { Campaign } from '../../models/impl/campaign';

import CampComponents from './components/edit-camp/CampNodeIcons'
import NodeIndex from '../../components/nodes/NodeIndex';

import { NodeBasicData, NodeInterface } from '../../models/interfaces/node';
import 'vlitejs/dist/vlite.css';

const Player = (props: {src: string, nodes: NodeInterface[], onDrop?: (e: DragEvent) => void}) => {

    return (
        <div 
            id="video-container"
            onDragEnter={(e) => e.preventDefault()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={props.onDrop}
        >
            {
                props.nodes.map((node, index) => (<NodeIndex node={node} key={index} />))
            }
            <video id="video-player" controls>
                <source src={props.src} type="video/mp4" />
            </video>
        </div>
    )
}

export default function EditCampaign(){
    const initCamp = new Campaign()
    
    initCamp.loadData('new')
    const [campaign, setCampaign] = useState(initCamp)
    const [nodes, setNodes] = useState(campaign.nodes)

    const alterNodes = (e: DragEvent | MouseEvent, action: 'add' | 'remove', node?: NodeBasicData) => {
        
        if(action === 'add'){
            const nd = (e as DragEvent).dataTransfer.getData('newNodeData')
            const nodeData = JSON.parse(nd) as NodeBasicData
            
            const position = {
                top: e.clientY,
                left: e.clientX,
            }
    
            campaign.addNode(nodeData, position)
        } else {
            if(node) campaign.removeNode(node)
        }

        setCampaign(campaign)
        const newNodes = Array.from(campaign.nodes)
        setNodes(newNodes)
    }

    const iconColor = theme.palette.secondary.dark
    return (
        <ThemeProvider theme={theme}>
            <Container className="campaign-editor" maxWidth='xl'>
                <div className='vertical-divider'></div>
                <Box className="column1">
                    <CampComponents />
                    <Player src={campaign.data?.src as string} nodes={nodes} onDrop={(e) => alterNodes(e, 'add')} />
                    <div className='added-nodes' style={{ background: iconColor }}>
                        {
                            campaign.nodes.map((node, index) => (
                                <Card className='added-node' key={index}>
                                    <div className='node-label'>
                                        { node.data?.type }
                                    </div>

                                    <div className='time-box'>
                                        <div className='time'><span className='time-label'>Time In:</span> 0:30</div>
                                        <div className='time'><span className='time-label'>Time Out:</span> 1:30</div>
                                    </div>
                                    <div className='actions'>
                                        <TuneIcon className='icon' />
                                        <DeleteIcon className='icon' onClick={(e) => alterNodes(e, 'remove', node.data)} />
                                    </div>
                                </Card>
                            ))
                        }
                    </div>
                </Box>
                <div className='vertical-divider'></div>
                <Box className="column2" style={{
                    flex: 1
                }}>
                    { campaign.nodes.length ? <TextField
                        id="camp-content"
                        label="Content"
                        multiline
                        rows={6}
                        defaultValue="Content Here"
                        style={{
                            width: '100%',
                        }}
                        color="secondary"
                    /> : <h3>Drag and drop elements on the video frame to start editing your campaign.</h3> }
                </Box>
            </Container>
        </ThemeProvider>
    )
}