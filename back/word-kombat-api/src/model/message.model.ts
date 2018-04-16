import {User} from "./user.model";

export class Message {

    public text: string;
    public user: User;
    public points: number;

    constructor(text: string, user: User, points: number) {
        this.text = text;
        this.user = user;
        this.points = points;
    }

    toString(): string {
        return JSON.stringify(this);
    }

}
