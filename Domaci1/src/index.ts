import {format} from "date-fns";
import { Klub } from "./Klub";
import { Takmicar } from "./Takmicar";

const klub = new Klub(10);

    const t1 = new Takmicar("Filip", "Trajkovic", 22);
    const t2 = new Takmicar("Marko", "Trifunovic", 12);
    const t3 = new Takmicar("Slavko", "Markovic", 32);
    const t4 = new Takmicar("Stanislav", "Stefanovic", 25);
    const t5 = new Takmicar("Stefan", "Trajkoic", 24);
    const t6 = new Takmicar("Nikola", "Slavkovic", 13);


    klub.addTakmicar(t1);
    klub.addTakmicar(t2);
    klub.addTakmicar(t3);
    klub.addTakmicar(t4);
    klub.addTakmicar(t5);
    klub.addTakmicar(t6);

    console.log(klub);

    let naslov = document.createElement("h1");
    naslov.className = "Naslov";
    naslov.innerHTML = "Aplikacija za selekciju takmicara";
document.body.appendChild(naslov);

    let div = document.createElement("div");
document.body.appendChild(div);
    div.className = "div1";
klub.draw(div);