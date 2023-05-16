import { CampaignData, CampaignInterface } from "../interfaces/campaign";
import { NodeBasicData, NodeData, NodeInterface } from '../interfaces/node'
import { CampaignNode } from "./node";

import { getDefaults } from "../defaults/node-data";

const findNode = (node: NodeBasicData, nodeList: NodeBasicData[] | NodeInterface[], objectType: 'data' | 'interface'): number | 'NotFound' => {
    let nodes = nodeList as NodeBasicData[]
    if(objectType === 'interface') {
        nodes = (nodeList as NodeInterface[]).map(ni => {
            const data = ni.data as NodeData
            return {
                id: data.id,
                type: data.type
            }
        })
    }
    const fn = nodes.find(nd => nd.id === node.id && nd.type === node.type)
    if(fn) return nodes.indexOf(fn)

    return 'NotFound'
}

export class Campaign implements CampaignInterface {
    data?: CampaignData | undefined;
    nodes: NodeInterface[] = [];
    loadData(id: string){
        const demoCamp: CampaignData = {
            id: "new",
            nodeData: [],
            slug: "santa-ma",
            src : "http://localhost:3000/demo.mp4",
            srcType: "Direct Upload",
            title: "Santa Man"
        } // we'll load camp data here

        console.log('load data using id: '+id)
        this.data = demoCamp

    }
    addNode(node: NodeBasicData, pos?: {top: number, left: number}){
        const data: NodeData = getDefaults(node, pos)
        
        // add node data which will later be saved in our database
        if(this.data){
            this.data.nodeData.push(data)
        }

        // create new node
        const newNode = new CampaignNode()
        newNode.data = data
        this.nodes.push(newNode)
    };

    removeNode(node: NodeBasicData){
        const nodeData = this.data?.nodeData
        if(nodeData?.length){
            const index = findNode(node, nodeData, 'data')
            if(index !== 'NotFound') nodeData.splice(index, 1)
        }

        const nodes = this.nodes
        if(nodes.length) {
            const index = findNode(node, nodes, 'interface')
            if(index !== 'NotFound') nodes.splice(index, 1)

            console.log('int ', index)
        }
    }
    save(){
        console.log(this.data)
    }
}