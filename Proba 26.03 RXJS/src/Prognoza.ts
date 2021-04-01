export class Prognoza{

    private temperatura:number;
    private vreme:string;
    private mesto:string;

    constructor(temp:number, vreme:string, mesto:string){
        this.setTemp(temp);
        this.setVreme(vreme);
        this.setMesto(mesto);
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