import { User } from "./user.model";

export class Item {

    public id: number;
    public productname: string;
    public category: string;
    public unit: string;
    public price: number;
    public details: string;
    public image: string;
    public user: User;
    
}
