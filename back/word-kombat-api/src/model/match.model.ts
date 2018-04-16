export class Match {

    public id: number;
    public startTime: Date;
    public endTime: Date;


    constructor(id: number, startTime: Date, endTime: Date) {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    toString(): string {
        return JSON.stringify(this);
    }

}
