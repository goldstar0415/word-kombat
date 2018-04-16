export class Rank {

    public id: number;
    public name: string;
    public minScore: number;
    public image: string;

    constructor(id: number, name: string, minScore: number, image: string) {
        this.id = id;
        this.name = name;
        this.minScore = minScore;
        this.image = image;
    }

    toString(): string {
        return JSON.stringify(this);
    }

}
