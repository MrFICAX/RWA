import { ta } from "date-fns/locale";
import { stderr } from "node:process";
import { from, fromEvent, Observable } from "rxjs";
import {
  debounce,
  debounceTime,
  filter,
  map,
  sampleTime,
  switchMap,
} from "rxjs/operators";
import { Driver } from "./driver";
import { TaxiLogic } from "./taxi-logic";
import { User } from "./user";

const API_URL = "http://localhost:3000";
var counter = 0;
var taxilogic:TaxiLogic;
const user = new User(undefined,undefined, 0);
// const taxilogic = new TaxiLogic(undefined, undefined);


createHeader();
createUserForm();
createReservations();


//createNameBox(docu);
//createYearBox();

// getStudentsByMark("0").subscribe((student: Student[]) => {
//   console.log(student);
//   WriteStudents(student);
// });

function createH2(text: string, element:HTMLElement) {
  const header = document.createElement("h2");
  header.innerHTML = text;
  element.appendChild(header);
}

function createH1(text: string, element:HTMLDivElement) {
  const header1Element = document.createElement("h1");
  header1Element.innerHTML = text;
  element.appendChild(header1Element);
}

function createH3(text: string, element:HTMLDivElement) {
  const header1Element = document.createElement("h3");
  if(text === undefined || parseInt(text) === 0)
  header1Element.innerHTML = "Niste uneli ovaj podatak";
else
header1Element.innerHTML = text;
  element.appendChild(header1Element);
}
function createH4(text: string, element:HTMLDivElement) {
  const header1Element = document.createElement("h4");
  if(text === undefined || parseInt(text) === 0)
  header1Element.innerHTML = "Niste uneli ovaj podatak";
else
header1Element.innerHTML = text;
  element.appendChild(header1Element);
}
function createUserForm(){
  const UserFormDiv = document.createElement("div");
  UserFormDiv.className = "UserFormDiv";
  document.body.appendChild(UserFormDiv);

  createInputDiv(UserFormDiv);
  createUserDataView(UserFormDiv);
}

function createHeader() {
  const divHeader = document.createElement("div");
  divHeader.className = "DivHeader";
  document.body.appendChild(divHeader);
  createH1(`FICAX TAXI ONLINE`, divHeader);
}

function createUserDataView(UserFormDiv: Element) {
var element = document.body.getElementsByClassName("DataViewDiv")[0];
    if(element != undefined)
      element.remove();

  const inputDiv = document.createElement("div");
  inputDiv.className = "DataViewDiv";
  UserFormDiv.appendChild(inputDiv);

  //WriteLabel("Vase ime:", inputDiv);
  createH3("Vase ime:", inputDiv);
  createH4(user.name, inputDiv);
  //WriteLabel(user.name, inputDiv);
  //WriteLabel("Vase prezime:", inputDiv);
  createH3("Adresa na kojoj taksi dolazi po vas:", inputDiv);
  createH4(user.address, inputDiv);
  //WriteLabel(user.surname, inputDiv);
  //WriteLabel("Broj licne karte:", inputDiv);
  createH3("Broj licne karte:", inputDiv);
  createH4(user.idcard.toString(), inputDiv); 
  //WriteLabel(user.idcard.toString(), inputDiv);
}


function createInputDiv(element:HTMLElement) {
  const inputDiv = document.createElement("div");
  inputDiv.className = "inputDiv";
  element.appendChild(inputDiv);
  createH2(`Unesite vase podatke:`, inputDiv);
  createNameBox(inputDiv);
  createSurNameBox(inputDiv);
  createIDCardBox(inputDiv);
}
function createNameBox(element:HTMLElement) {

  const label = document.createElement("label");
  label.innerHTML = "Unesite vase ime:";
  label.style.margin = "10px";
  element.appendChild(label);

  const input = document.createElement("input");
  input.type = "text";
  input.className = "inputName";
  element.appendChild(input);
  fromEvent(input, "input")
    .pipe(
      debounceTime(500),
      map((ev: InputEvent) => (<HTMLInputElement>ev.target).value),
      filter((text) => text.length >= 3),
      // switchMap(
      //   (student) => getStudentsByMark(student) //.pipe(
      //   //map(students => students.filter(p => p.avgMark > 9))
      // ) //))
      //map(movies => movies[0])
    )
    .subscribe((name: string) => {
      //console.log(name);
      //student = student.filter(p => p.avgMark > 9);
      user.name = name;
      var x = document.body.getElementsByClassName("UserFormDiv")[0];
      if(x!== undefined)
        createUserDataView(x);
      if(user.checkInputs())
          createTaxiLogic();
    });
}

function createSurNameBox(element:HTMLElement) {
    // const inputDiv = document.createElement("div");
    // element.appendChild(inputDiv);

    const label = document.createElement("label");
    label.innerHTML = "Unesite adresu na koju dolazi taksi:";
    label.style.margin = "10px";
    element.appendChild(label);

    const input = document.createElement("input");
    input.className = "inputSurname";
    input.type = "text";
    element.appendChild(input);

    fromEvent(input, "input")
    .pipe(
      debounceTime(500),
      map((ev: InputEvent) => (<HTMLInputElement>ev.target).value),
      filter((text) => text.length >= 3),
      // switchMap(
      //   (student) => getStudentsByMark(student) //.pipe(
      //   //map(students => students.filter(p => p.avgMark > 9))
      // ) //))
      //map(movies => movies[0])
    )
    .subscribe((surname: string) => {
      //console.log(surname);
      //student = student.filter(p => p.avgMark > 9);
      user.address = surname;
      var x = document.body.getElementsByClassName("UserFormDiv")[0];
      if(x!== undefined)
        createUserDataView(x);
      if(user.checkInputs())
        createTaxiLogic();
      
    });
}

function createIDCardBox(element:HTMLElement){
  const label = document.createElement("label");
  label.innerHTML = "Unesite broj licne karte:";
  label.style.margin = "10px";
  element.appendChild(label);

  const input = document.createElement("input");
  input.type = "number";
  input.className = "inputID";
  input.id = "input";
  element.appendChild(input);
  fromEvent(input, "input")
    .pipe(
      debounceTime(500),
      map((ev: InputEvent) => (<HTMLInputElement>ev.target).value),
      filter((text) => text.length == 9 ),
      map(el => parseInt(el))
      // switchMap(
      //   (student) => getStudentsByMark(student) //.pipe(
      //   //map(students => students.filter(p => p.avgMark > 9))
      // ) //))
      //map(movies => movies[0])
    )
    .subscribe((id: number) => {
      //console.log(id);
      //student = student.filter(p => p.avgMark > 9);
      user.idcard = id;
      var x = document.body.getElementsByClassName("UserFormDiv")[0];
      if(x!== undefined)
        createUserDataView(x);
      if(user.checkInputs()){

      
        createTaxiLogic();  
      }
      
    });
}

function createTaxiLogic() {
  var element = document.getElementsByClassName("TaxiLogicDiv")[0];
  if(element !== undefined){
    taxilogic.SetAndStartUser(user);
    return;
  }

  var prikazRezervacija = document.getElementsByClassName("prikazRezervacija")[0];
  if(prikazRezervacija !== undefined){

  const TaxiLogicDiv = document.createElement("div");
  TaxiLogicDiv.className = "TaxiLogicDiv";
  // document.body.appendChild(TaxiLogicDiv);

  document.body.insertBefore(TaxiLogicDiv, prikazRezervacija);


  taxilogic = new TaxiLogic(user, TaxiLogicDiv);
  taxilogic.draw();
}
}


function getStudentsByMark(mark: string): Observable<Driver[]> {
  console.log(`fetching movie with a mark ${mark}`);
  return from(
    fetch(`${API_URL}/students/`) //?title=${mark}``)
      .then((response) => {
        if (response.ok) {
          console.log(response);
          return response
            .json()
            .then((p) =>
              p.filter(
                (q: { avgMark: number }) => q.avgMark >= parseFloat(mark)
              )
            );
        } else {
          throw new Error("Response ain't ok");
        }
      })
      .catch((err) => console.log("Error" + err))
  );
}
// function createYearBox() {
//   const inputDiv = document.createElement("div");
//   document.body.appendChild(inputDiv);

//   const label = document.createElement("label");
//   label.innerHTML = "Unesite donju granicu godine rodjenja:";
//   label.style.margin = "10px";
//   inputDiv.appendChild(label);

//   const input = document.createElement("input");
//   input.type = "number";
//   input.id = "input";
//   inputDiv.appendChild(input);
//   fromEvent(input, "input")
//     .pipe(
//       debounceTime(500),
//       map((ev: InputEvent) => (<HTMLInputElement>ev.target).value),
//       filter((text) => text.length >= 4),
//       switchMap(
//         (student) => getStudentsByYear(student) //.pipe(
//         //map(students => students.filter(p => p.avgMark > 9))
//       ) //))
//       //map(movies => movies[0])
//     )
//     .subscribe((driverArray: Driver[]) => {
//      // console.log(student);
//       //student = student.filter(p => p.avgMark > 9);
//       WriteDrivers(driverArray);
//     });
// }

function getStudentsByYear(year: string): Observable<Driver[]> {
  console.log(`fetching movie with a mark ${year}`);
  return from(
    fetch(`${API_URL}/students/`) //?title=${mark}``)
      .then((response) => {
        if (response.ok) {
          console.log(response);
          return response
            .json()
            .then((p) =>
              p.filter((q: { year: number }) => q.year >= parseFloat(year))
            );
        } else {
          throw new Error("DB not found");
        }
      })
      .catch((err) => console.log("Error" + err))
  );
}

function WriteDrivers(students: Driver[]) {
  if (counter++ == 0) createH2("Tabela svih studenata", document.body);
  else createH2("Tabela selektovanih studenata br. " + `${counter - 1}`, document.body);

  const tableDiv = document.createElement("table");
  tableDiv.style.border = "1px solid black";
  //tableDiv.style.borderCollapse = "collapse";
  document.body.appendChild(tableDiv);
  createTable(tableDiv);

  students.forEach((p) => {
    createTr(p, tableDiv);
  });
}

function createTr(p: Driver, tableDiv: HTMLElement) {
  const tr = document.createElement("tr");
  tableDiv.appendChild(tr);
  createTd(p.name, tr);
  createTd(p.car.toString(), tr);
  createTd(p.avgMark.toString(), tr);
}

function createTable(tableDiv: HTMLTableElement) {
  // let th = document.createElement("th");
  // th.style.textAlign = "center";
  // tableDiv.appendChild(th);

  createTh("name", tableDiv);
  createTh("year", tableDiv);
  createTh("avgMark", tableDiv);
}

function createTh(text: string, element: HTMLElement) {
  let th = document.createElement("th");
  th.innerHTML = text;
  th.style.margin = "50%";
  element.appendChild(th);
}

function createTd(text: string, ThiliTd: HTMLElement) {
  let td = document.createElement("td");
  td.innerHTML = text;
  td.style.margin = "50%";
  ThiliTd.appendChild(td);
}


function createReservations() {
  
  let prikazRezervacija = document.createElement("div");
  prikazRezervacija.className = "prikazRezervacija";
  document.body.appendChild(prikazRezervacija);

  createH3("Rezervacije:", prikazRezervacija);




}
// fetch(`${API_URL}/drivers/Audi A4`) //?title=${mark}``)
//       .then(response => {
//         if(!response.ok)
//           throw new Error("RESPOSNE ISN'T OK");
//         else
//         return response.json();
//       })
//       .then(data=>{ console.log(data); })
//       .catch((err) => console.log("Error" + err))