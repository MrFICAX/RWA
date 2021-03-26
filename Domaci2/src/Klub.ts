import { Takmicar } from "./Takmicar";

export class Klub {
  private arr: Takmicar[];
  private numOf: number;
  private maxNum: number;
  private i: number;
  private container: HTMLDivElement;
  private izabraniTakmicari: Takmicar[];

  constructor(maxNum: number) {
    this.arr = [];
    this.numOf = 0;
    this.i = this.numOf;
    this.maxNum = maxNum;
    this.izabraniTakmicari = [];
  }
  addTakmicar(clan: Takmicar) {
    if (this.numOf < this.maxNum) {
      clan.indeks = this.numOf++;
      this.arr.push(clan);
    }
  }
  getIzabraniTakmicari(): Takmicar[] {
    return this.izabraniTakmicari;
  }
  getArr(): Takmicar[] {
    return this.arr;
  }
  UpisiTakmicara(div: HTMLDivElement) {
    if (this.i == this.numOf) this.i = 0;

    let polje = this.container.querySelector(".l1");
    polje.innerHTML = this.arr[this.i].getName();
    polje = this.container.querySelector(".l2");
    polje.innerHTML = this.arr[this.i].getSurname();
    polje = this.container.querySelector(".l3");
    polje.innerHTML = this.arr[this.i].getAge().toString();
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
    dugme.innerHTML = "Promeni takmicara";
    dugme.onclick = (ev) => {
      this.UpisiTakmicara(div);
      this.i++;
    };
    div.appendChild(dugme);

    dugme = document.createElement("button");
    dugme.innerHTML = "Izaberi takmicara";
    dugme.onclick = (ev) => {
      this.IzaberiTakmicara();
    };
    div.appendChild(dugme);
    dugme = document.createElement("button");
    dugme.innerHTML = "Pokreni trku takmicara";
    dugme.onclick = (ev) => {
      this.PokreniTrku();
    };
    div.appendChild(dugme);

    const labela=document.createElement("label");
    labela.className = "labelaListe";
    labela.innerHTML = "Lista izabranih takmicara:";
    this.container.appendChild(labela);
  }
  crtajText(element: Takmicar){
    const elementX = document.querySelector(".labelaListe");
    elementX.innerHTML += element.getName()+" "+element.getSurname() +"</br>";

  }

  IzaberiTakmicara() {
    let polje = this.container.querySelector(".l1");
    if(polje.innerHTML === "")
    {
        alert("Promenite takmicara");
        return;
    }
    if (this.i == this.numOf) this.i = 0; //i je indeks sledeceg takmicara u nizu, zato ovakva logika
    if (this.i === 0)
    {
        this.getIzabraniTakmicari().push(this.arr[this.numOf-1]);
        this.crtajText(this.arr[this.numOf-1]);
    }
    //  this.getIzabraniTakmicari().push(this.arr[this.numOf-1]);
        else
        {
            this.getIzabraniTakmicari().push(this.arr[this.i - 1]);
            this.crtajText(this.arr[this.i - 1]);
        }
    //this.getIzabraniTakmicari().push(new Takmicar(this.arr[this.i].getName(),this.arr[this.i].getSurname(),this.arr[this.i++].getAge()));
    console.log(this.izabraniTakmicari);
  }
  PokreniTrku() {
    this.izabraniTakmicari.forEach((el) => {
      el.TrkajSe();
    });
  }
}
