import { interval, Observable, range, Subject } from "rxjs";
import { filter, map, take, takeUntil } from "rxjs/operators";
import * as Rx from "rxjs";
import { Prognoza } from "./Prognoza";

let NizVremena: string[] = ["ladno", "toplo", "vruce", "zima", "prohladno"];
let NIzLokacija: string[] = [
  "Nis",
  "Aleksinac",
  "Leksovac",
  "Vranje",
  "Beograd",
  "Velimirovci",
  "Podujevo",
];

const subjectA = new Subject();

// subscriber 1
subjectA.subscribe((data: Prognoza) => {
  console.log("SUBSCRIBER 1");

  console.log("Subjektivni osecaj je: " + data.getVreme());
});

// subscriber 2
subjectA.subscribe((data: Prognoza) => {
  console.log("SUBSCRIBER 2");
  console.log("Trenutna temperatura je: " + data.getTemp() + "*C");
});
subjectA.subscribe((data: Prognoza) => {
  console.log("SUBSCRIBER 3");
  console.log("Lokacija je: " + data.getMesto());
});

function PokreniUnos(uneto: number, granica: number) {
  let x: number = 0;

  while (x !== uneto) {
    if (x++ === granica) {
      //subjectA.complete();
      break;
    }

    console.log(x);
    subjectA.next(
      new Prognoza(
        Math.random() * 100,
        NizVremena[x % NizVremena.length],
        NIzLokacija[x % NIzLokacija.length]
      )
    );
  }
}

function CrtajKontrole() {
  let labela = document.createElement("label");
  labela.innerHTML = "Unesite broj iteracija";
  document.body.appendChild(labela);

  let numBox = document.createElement("input");
  numBox.type = "number";
  numBox.className = "unos";
  document.body.appendChild(numBox);

  labela = document.createElement("label");
  labela.innerHTML = "Unesite do kog broja iteracija da se prikazuje";
  document.body.appendChild(labela);

  let numGranicaBox = document.createElement("input");
  numBox.type = "number";
  numBox.className = "unos";
  document.body.appendChild(numGranicaBox);

  let dugme = document.createElement("button");
  dugme.innerHTML = "Unesi broj iteracija";
  document.body.appendChild(dugme);
  dugme.onclick = () => {
    let granica = parseInt(numGranicaBox.value);
    let uneto = parseInt(numBox.value);
    if (uneto > 0) {
      PokreniUnos(uneto, granica);
      alert("Proveri konzolu!");
    } else alert("Niste uneli validne podakte");
  };
}
CrtajKontrole();

//   const observable = Rx.Observable.create((observer: Subject<unknown>) => {
//     observer.next(Math.random());
// });

// const subjectB = new Rx.Subject();

// // subscriber 1
// subjectB.subscribe((data) => {
//     console.log(data); // 0.24957144215097515 (random number)
// });

// // subscriber 2
// subjectB.subscribe((data) => {
//     console.log(data); // 0.24957144215097515 (random number)
// });

// observable.subscribe(subjectB);
