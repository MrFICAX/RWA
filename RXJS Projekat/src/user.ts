export class User{
    private _name:string;
    private _address:string;
    private _iDCard:number;

    constructor(Iname:string, address:string, idCard:number){
        this.name = Iname;
        this.address = address;
        this.idcard = idCard;
    }

    set name(vrednost:string){
        this._name = vrednost;
    }
    get name():string{
        return this._name;
    }

    set address(vrednost:string){
        this._address = vrednost;
    }
    get address():string{
        return this._address;
    }

    set idcard(vrednost:number){
        this._iDCard = vrednost;
    }
    get idcard():number{
        return this._iDCard;
    }

    checkInputs():boolean {
        console.log(this);
        
        if(this.name===undefined || this.address ===undefined || this.idcard === 0)
            return false;
        return true;
    }

}