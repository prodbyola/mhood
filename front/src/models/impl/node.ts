import { NodeData, NodeInterface } from "../interfaces/node";

export class CampaignNode implements NodeInterface {
    data: NodeData | undefined
    delete(){
        console.log(this.data)
    };
    editContent(){
        console.log(this.data)
    };
    updateStyle(){
        console.log(this.data)
    }
}