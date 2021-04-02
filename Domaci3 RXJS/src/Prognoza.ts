export class Prognoza{

    private temperatura:number;
    private vreme:string;
    private mesto:string;
    private datum:Date;

    constructor(temp:number, vreme:string, mesto:string, datum:Date){
        this.setTemp(temp);
        this.setVreme(vreme);
        this.setMesto(mesto);
        this.setDatum(datum);
    }
    setMesto(mesto: string) {
       this.mesto = mesto;
    }

    setTemp(vrednost:number){
        this.temperatura = vrednost;
    }
    setVreme(vrednost:string){
        this.vreme = vrednost;
    }
    setDatum(vrednost:Date){
        this.datum = vrednost;
    }
    getDatum():Date{
        return this.datum;
    }
    getTemp():number{
       return this.temperatura; 
    }
    getVreme():string{
        return this.vreme;
    }
    getMesto():string{
        return this.mesto;
    }

}