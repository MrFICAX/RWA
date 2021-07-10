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
import { Student } from "./student";

const API_URL = "http://localhost:3000";
var counter = 0;

createHeader();
createAvgMarkBox();
createYearBox();

// getStudentsByMark("0").subscribe((student: Student[]) => {
//   console.log(student);
//   WriteStudents(student);
// });

function createH2(text: string) {
  const header = document.createElement("h2");
  header.innerHTML = text;
  document.body.appendChild(header);
}

function createHeader() {
  const divHeader = document.createElement("div");
  divHeader.style.textAlign = "center";
  document.body.style.textAlign = "center";
  document.body.appendChild(divHeader);
  const header = document.createElement("h2");
  header.innerHTML = `Selekcija studenata`;
  divHeader.appendChild(header);
}

function createAvgMarkBox() {
  const inputDiv = document.createElement("div");
  document.body.appendChild(inputDiv);

  const label = document.createElement("label");
  label.innerHTML = "Unesite donju granicu proseka(pr. 8.0):";
  label.style.margin = "10px";
  inputDiv.appendChild(label);

  const input = document.createElement("input");
  input.type = "number";
  input.id = "input";
  inputDiv.appendChild(input);
  fromEvent(input, "input")
    .pipe(
      debounceTime(500),
      map((ev: InputEvent) => (<HTMLInputElement>ev.target).value),
      filter((text) => text.length >= 3),
      switchMap(
        (student) => getStudentsByMark(student) //.pipe(
        //map(students => students.filter(p => p.avgMark > 9))
      ) //))
      //map(movies => movies[0])
    )
    .subscribe((student: Student[]) => {
      console.log(student);
      //student = student.filter(p => p.avgMark > 9);
      WriteStudents(student);
    });
}

function getStudentsByMark(mark: string): Observable<Student[]> {
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
function createYearBox() {
  const inputDiv = document.createElement("div");
  document.body.appendChild(inputDiv);

  const label = document.createElement("label");
  label.innerHTML = "Unesite donju granicu godine rodjenja:";
  label.style.margin = "10px";
  inputDiv.appendChild(label);

  const input = document.createElement("input");
  input.type = "number";
  input.id = "input";
  inputDiv.appendChild(input);
  fromEvent(input, "input")
    .pipe(
      debounceTime(500),
      map((ev: InputEvent) => (<HTMLInputElement>ev.target).value),
      filter((text) => text.length >= 4),
      switchMap(
        (student) => getStudentsByYear(student) //.pipe(
        //map(students => students.filter(p => p.avgMark > 9))
      ) //))
      //map(movies => movies[0])
    )
    .subscribe((student: Student[]) => {
      console.log(student);
      //student = student.filter(p => p.avgMark > 9);
      WriteStudents(student);
    });
}

function getStudentsByYear(year: string): Observable<Student[]> {
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

function WriteStudents(students: Student[]) {
  if (counter++ == 0) createH2("Tabela svih studenata");
  else createH2("Tabela selektovanih studenata br. " + `${counter - 1}`);

  const tableDiv = document.createElement("table");
  tableDiv.style.border = "1px solid black";
  //tableDiv.style.borderCollapse = "collapse";
  document.body.appendChild(tableDiv);
  createTable(tableDiv);

  students.forEach((p) => {
    createTr(p, tableDiv);
  });
}

function createTr(p: Student, tableDiv: HTMLElement) {
  const tr = document.createElement("tr");
  tableDiv.appendChild(tr);
  createTd(p.name, tr);
  createTd(p.year.toString(), tr);
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

fetch(`${API_URL}/students/1999`) //?title=${mark}``)
      .then(response => {
        if(!response.ok)
          throw new Error("RESPOSNE ISN'T OK");
        else
        return response.json();
      })
      .then(data=>{ console.log(data); })
      .catch((err) => console.log("Error" + err))