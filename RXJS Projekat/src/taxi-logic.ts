import { User } from "./user";
import { Driver } from "./driver";
import { from, fromEvent, Observable } from "rxjs";
import { debounceTime, filter, map, switchMap } from "rxjs/operators";

const API_URL = "http://localhost:3000";
var counter = 0;

export class TaxiLogic{

    private _user:User;
    private _container:HTMLElement;

    constructor(tmpUser:User , container:HTMLElement){
        this.user = tmpUser;
        this.container = container;
    }

    set user(vrednost:User){
        this._user = vrednost;
    }
    get user():User{
        return this._user;
    }

    set container(vrednost:HTMLElement){
        this._container = vrednost;
    }
    get container():HTMLElement{
        return this._container;
    }

    draw() {
        this.createCarNameBox();
      }

    
     getStudentsByMark(mark: string): Observable<Driver[]> {
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
 createCarNameBox() {
    const inputDiv = document.createElement("div");
    inputDiv.className = "TaxiLogic";
    this.container.appendChild(inputDiv);
  
    const label = document.createElement("label");
    label.innerHTML = "Unesite marku automobila koji zelite:";
    label.style.margin = "10px";
    inputDiv.appendChild(label);
  
    const input = document.createElement("input");
    input.type = "text";
    input.className = "input";
    input.id = "input";
    inputDiv.appendChild(input);
    fromEvent(input, "input")
      .pipe(
        debounceTime(500),
        map((ev: InputEvent) => (<HTMLInputElement>ev.target).value),
        filter((text) => text.length >= 4),
        switchMap(
          (student) => this.getDriversByCar(student) //.pipe(
          //map(students => students.filter(p => p.avgMark > 9))
        ) //))
        //map(movies => movies[0])
      )
      .subscribe((student: Driver[]) => {
        console.log(student);
        //student = student.filter(p => p.avgMark > 9);
        this.WriteDrivers(student);
      });
  }
  
 getDriversByCar(carName: string): Observable<Driver[]> {
    console.log(`fetching Drivers who drive ${carName}`);
    return from(
      fetch(`${API_URL}/drivers/`+carName) //?title=${mark}``)
        .then((response) => {
          if (response.ok) {
            console.log(response);
            return response.json();     
          } 
          else {
            throw new Error("DB not found");
          }
        })
        .catch((err) => console.log("Error" + err))
    );
  }
  
  WriteDrivers(drivers: Driver[]) {
    var element = this.container.getElementsByClassName("tabela")[0];
    if(element != undefined)
      element.remove();

    const tableDiv = document.createElement("table");
    tableDiv.className = "tabela";
    tableDiv.style.border = "1px solid black";
    //tableDiv.style.borderCollapse = "collapse";
    this.container.appendChild(tableDiv);
    this.createTable(tableDiv);
  
    drivers.forEach((p) => {
      this.createTr(p, tableDiv);
    });
  }
  
 createTr(p: Driver, tableDiv: HTMLElement) {
    const tr = document.createElement("tr");
    tableDiv.appendChild(tr);
    this.createTd(p.name, tr);
    this.createTd(p.car.toString(), tr);
    this.createTd(p.avgMark.toString(), tr);
    this.createTd(p.priceCoefficient.toString(), tr);

  }
  
   createTable(tableDiv: HTMLTableElement) {
    // let th = document.createElement("th");
    // th.style.textAlign = "center";
    // tableDiv.appendChild(th);
  
    this.createTh("Ime", tableDiv);
    this.createTh("Vozilo", tableDiv);
    this.createTh("Prosecna ocena", tableDiv);
    this.createTh("Koeficijent po minutu", tableDiv);
  }
  
   createTh(text: string, element: HTMLElement) {
    let th = document.createElement("th");
    th.innerHTML = text;
    th.style.margin = "50%";
    element.appendChild(th);
  }
  
   createTd(text: string, ThiliTd: HTMLElement) {
    let td = document.createElement("td");
    td.innerHTML = text;
    td.style.margin = "50%";
    ThiliTd.appendChild(td);
  }
  
   createH2(text: string, element:HTMLElement) {
    const header = document.createElement("h2");
    header.innerHTML = text;
    element.appendChild(header);
  }



}