import { Takmicar } from "./Takmicar";

export class Klub{

    private arr: Takmicar[];
    private numOf: number;
    private maxNum: number;
    private i:number;
    private container: HTMLDivElement;

    constructor(maxNum: number) {
        this.arr = [];
        this.numOf = 0;
        this.i = this.numOf;
        this.maxNum  = maxNum; 
    }
    addTakmicar(clan: Takmicar){
        if(this.numOf < this.maxNum)
            {   
                this.numOf++;
                this.arr.push(clan);
            }
    }
    getArr(): Takmicar[]{
        return this.arr;
    }
    UpisiTakmicara(div: HTMLDivElement){
        if(this.i==this.numOf)
            this.i = 0;

            let polje = this.container.querySelector(".l1");
            polje.innerHTML= this.arr[this.i].getName();
                polje = this.container.querySelector(".l2");
            polje.innerHTML= this.arr[this.i].getSurname();
                polje = this.container.querySelector(".l3");
            polje.innerHTML= this.arr[this.i].getAge().toString();
        this.i++;

    }

    draw(div: HTMLDivElement) {
        this.container = div;


        let label1 = document.createElement("label");
        label1.innerHTML = "IME TAKMICARA:";
        label1.className = "labela";
            div.appendChild(label1);
            label1 = document.createElement("label");
        label1.className = "l1";
            div.appendChild(label1);

            label1 = document.createElement("label");
            label1.innerHTML = "PREZIME TAKMICARA:";
            label1.className = "labela";
                div.appendChild(label1);
            label1 = document.createElement("label");
            label1.className = "l2";
            div.appendChild(label1);

            label1 = document.createElement("label");
            label1.innerHTML = "GODINE:";
            label1.className = "labela";
                div.appendChild(label1);
            label1 = document.createElement("label");
            label1.className = "l3";
            div.appendChild(label1);

          let dugme = document.createElement("button");
          dugme.innerHTML="Promeni takmicara";
          dugme.onclick = (ev)=>{
            this.UpisiTakmicara(div);
            }
            div.appendChild(dugme);
        }


}