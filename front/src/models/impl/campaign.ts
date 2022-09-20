import { CampaignData, CampaignInterface } from "../interfaces/campaign";
import { NodeInterface, NodeData } from '../interfaces/node'

export class Campaign implements CampaignInterface {
    data?: CampaignData | undefined;
    nodes: NodeInterface[] = [];
    addNode(node: NodeData){
        console.log(node)
    };
    save(){
        console.log(this.data)
    }
}