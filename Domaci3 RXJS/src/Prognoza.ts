export class Prognoza{

    private temperatura:number;
    private vreme:string;
    private mesto:string;
    private _datum:Date;

    constructor(temp:number, vreme:string, mesto:string, datum:Date){
        this.setTemp(temp);
        this.setVreme(vreme);
        this.setMesto(mesto);
        this.datum = datum;
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
    set datum(vrednost:Date){
        this._datum = vrednost;
    }
    get datum():Date{
        return this._datum;
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