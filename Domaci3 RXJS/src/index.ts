import { interval, Observable, range, Subject } from "rxjs";
//import { filter, map, take, takeUntil } from "rxjs/operators";
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
CrtajKontrole();

let SavTekst = document.body.querySelector(".tekst");

// subscriber 1
subjectA.subscribe((data: Prognoza) => {
  console.log("SUBSCRIBER 1");
  console.log("Subjektivni osecaj je: " + data.getVreme() + "<br>");

  SavTekst.innerHTML += "SUBSCRIBER 1 <br>";
  SavTekst.innerHTML +=
    "Subjektivni osecaj je: " + data.getVreme() + "<br> <br>";
});

// subscriber 2
subjectA.subscribe((data: Prognoza) => {
  console.log("SUBSCRIBER 2");
  console.log("Trenutna temperatura je: " + data.getTemp() + "*C");

  SavTekst.innerHTML += "SUBSCRIBER 2 <br>";
  SavTekst.innerHTML +=
    "Trenutna temperatura je: " + data.getTemp() + "<br> <br>";
});

// subscriber 3
subjectA.subscribe((data: Prognoza) => {
  console.log("SUBSCRIBER 3");
  console.log("Lokacija je: " + data.getMesto());

  SavTekst.innerHTML += "SUBSCRIBER 3 <br>";
  SavTekst.innerHTML += "Lokacija je: " + data.getMesto() + "<br> <br>";
});

// subscriber 4
subjectA.subscribe((data: Prognoza) => {
  console.log("SUBSCRIBER 4");
  console.log("Datum je: " + data.getDatum().toLocaleString());

  SavTekst.innerHTML += "SUBSCRIBER 4 <br>";
  SavTekst.innerHTML +=
    "Datum je: " + data.getDatum().toLocaleString() + "<br>";
  SavTekst.innerHTML +=
    "____________________________________________________________ <br> <br>";
});

function PokreniUnos(uneto: number, granica: number) {
  let x: number = 0;

  while (x !== uneto) {
    if (x++ === granica) {
      //subjectA.complete();
      break;
    }
    console.log(x);
    SavTekst.innerHTML += "NOVA VREMENSKA PROGNOZA!!! <br> Redni broj: "+x+"<br>";

    subjectA.next(
      new Prognoza(
        (Math.random() * 100) % 50,
        NizVremena[x % NizVremena.length],
        NIzLokacija[x % NIzLokacija.length],
        new Date()
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

  let divElement = document.createElement("div");
  document.body.appendChild(divElement);

  let naslov = document.createElement("h1");
  divElement.appendChild(naslov);
  naslov.innerHTML = "Podaci o Vremenskoj prognozi";

  labela = document.createElement("label");
  divElement.appendChild(labela);
  labela.className = "tekst";
  labela.innerHTML = "____________________________________________________________<br>";
}

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
