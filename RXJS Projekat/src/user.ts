export class User{
    private _name:string;
    private _surname:string;
    private _iDCard:number;

    constructor(Iname:string, surname:string, idCard:number){
        this.name = Iname;
        this.surname = surname;
        this.idcard = idCard;
    }

    set name(vrednost:string){
        this._name = vrednost;
    }
    get name():string{
        return this._name;
    }

    set surname(vrednost:string){
        this._surname = vrednost;
    }
    get surname():string{
        return this._surname;
    }

    set idcard(vrednost:number){
        this._iDCard = vrednost;
    }
    get idcard():number{
        return this._iDCard;
    }

    checkInputs():boolean {
        console.log(this);
        
        if(this.name===undefined || this.surname ===undefined || this.idcard === 0)
            return false;
        return true;
    }

}