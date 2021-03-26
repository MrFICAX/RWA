import { getDate, startOfDay } from "date-fns";
import { el } from "date-fns/locale";

export class Takmicar {
  public name: string;
  public surname: string;
  public indeks: number;
  public age: number;
  public mapa: string[] = [
    "start",
    "ravnica",
    "brdo",
    "krivina levo",
    "most",
    "krivina desno",
    "tunel",
    "KRAJ",
  ];
  public num:number = 0;
  public container:HTMLElement;

  constructor(name: string, surname: string, age: number) {
    this.name = name;
    this.surname = surname;
    this.age = age;
  }
  getName(): string {
    return this.name;
  }
  getSurname(): string {
    return this.surname;
  }
  getAge(): number {
    return this.age;
  }
  async vratiPoziciju(broj: number, vreme: number) {

    return new Promise<string>((resolve, reject) => {

        setTimeout(() => {

          if (this.num < this.mapa.length) {
            resolve("Takmicar:"+this.getName()+" "+this.getSurname()+" se nalazi na mestu: "+this.mapa[this.num++]+" u trenutku: "+ (Date.now()-vreme)/1000);
            // this.num++;
        } else {
            reject("Takmicar: "+this.getName()+" "+this.getSurname()+" Zavrsio sam trku!"); // u resolve stavljas povratnu vrednost
          }
        }, broj * 1000);
    });
  }
  crtajKontejner(){
    const divElement=document.createElement("div");
    divElement.style.margin = "30px";
    this.container = divElement;

    document.body.appendChild(divElement);
  }

  crtajText(element: string){
    const labela=document.createElement("label");
    labela.innerHTML += element +"</br>";
    this.container.appendChild(labela);
  }

  async TrkajSe() {
    let broj: number = (Math.random() * 10) % 3;
    
    this.crtajKontejner();


    const start = Date.now();
    for( const el of this.mapa){
        const text = await this.vratiPoziciju(broj, start);
        this.crtajText(text);
        console.log(text);
        
    }

    // console.log(array);
        // const array = await Promise.all([
        //     console.log( await this.vratiPoziciju(broj)),
        //     console.log( await this.vratiPoziciju(broj)),
        //     console.log( await this.vratiPoziciju(broj)),
        //     console.log( await this.vratiPoziciju(broj)),
        //     console.log( await this.vratiPoziciju(broj)),
        //     console.log( await this.vratiPoziciju(broj)),
        //     console.log( await this.vratiPoziciju(broj)),
        //     console.log( await this.vratiPoziciju(broj))
        // ]);

    
  }
}
