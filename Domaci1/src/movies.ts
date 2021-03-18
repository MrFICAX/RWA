export class Movie{

    public title:string;
    public year:number;
    public score:number;

    constructor(title:string, year:number, score:number){
        this.title = title;
        this.year = year;
        this.score = score;
    }

    showInfo(){
        console.log(`Title: ${this.title}, Year: ${this.year}, Score: ${this.score}`);
    }
}