import { User } from "./user";
import { Driver } from "./driver";
import { from, fromEvent, interval, Observable, of, range, zip } from "rxjs";
import {
  debounceTime,
  filter,
  map,
  scan,
  switchMap,
  take,
} from "rxjs/operators";

const API_URL = "http://localhost:3000";
var counter = 0;

export class TaxiLogic {
  public obs$: Observable<User>;
  public obs2$: Observable<Driver>;

  public drivers: Driver[];

  private _user: User;
  private _container: HTMLElement;
  private _imageList: Array<string> = [];

  constructor(tmpUser: User, container: HTMLElement) {
    this.container = container;
    this._imageList = new Array<string>();
    this.SetAndStartUser(tmpUser);
  }

  set user(vrednost: User) {
    this._user = vrednost;
  }
  get user(): User {
    return this._user;
  }

  set container(vrednost: HTMLElement) {
    this._container = vrednost;
  }
  get container(): HTMLElement {
    return this._container;
  }

  set imageList(vrednost: Array<string>) {
    this._imageList = vrednost;
  }
  get imageList(): Array<string> {
    return this._imageList;
  }

  draw() {
    this.createCarNameBox();
  }

  SetAndStartUser(newUser: User) {
    this.user = newUser;
    this.obs$ = of(
        this.user
        // new User(this.user.name, this.user.address, this.user.idcard)
    );
  }

  zipInputs() {
    console.log("ZIPOVANJE OBSERVABLE OBJEKATA");

    if (this.obs$ === undefined || this.obs2$ === undefined) return;
    console.log("ZIP VALIDACIJA ISPRAVNA");

    zip(this.obs$, this.obs2$)
    .subscribe((val) => {
      console.log(val);
      this.inputReservation(val);
    });
  }

  inputReservation(listOfObjects: any) {

    let user = listOfObjects[0] as User;
    let driver = listOfObjects[1] as Driver;

    const element =
      document.body.getElementsByClassName("prikazRezervacija")[0];
    if (element === undefined) return;

    const divElement = this.createDiv(element as HTMLElement);

    this.WriteLabel("Korisnik:", divElement);
    this.WriteLabel(user.name, divElement);
    this.WriteLabel("Adresa:", divElement);
    this.WriteLabel(user.address, divElement);
    this.WriteLabel("Licna karta:", divElement);
    this.WriteLabel(user.idcard.toString(), divElement);

    this.WriteLabel("Vozac:", divElement);
    this.WriteLabel(driver.name, divElement);
    this.WriteLabel("Automobil:", divElement);
    this.WriteLabel(driver.car, divElement);
    this.WriteLabel("Prosecna ocena:", divElement);
    this.WriteLabel(driver.avgMark.toString(), divElement);

    var cena: number;
    let rangeLevel = Math.round(((Math.random() * 100) % 20) + 10);
    let randomNumber: number = Math.round((Math.random() * 100) % rangeLevel);
    let counter: number = 0;

    console.log("RangeLevel:" + rangeLevel);
    console.log("randomNumber" + randomNumber);

    range(10, rangeLevel) //Od 10 do 10+rangeLevel-1
      .pipe(map((x) => x * x))
      .subscribe((x) => {
        console.log("counter" + counter);
        if (counter++ === randomNumber) {
          console.log(x);
          cena = x as number;
          console.log("Povratna vrd. je:" + cena);
          this.WriteLabel("Cena:", divElement);
          this.WriteLabel(
            (driver.priceCoefficient * cena).toString(),
            divElement
          );
        }
      });
  }

  createDiv(parentDiv: HTMLElement): HTMLDivElement {
    const inputDiv = document.createElement("div");
    inputDiv.className = "reservation";
    parentDiv.appendChild(inputDiv);
    return inputDiv;
  }

  WriteLabel(params: string, element: HTMLElement) {
    const label = document.createElement("label");
    label.innerHTML = params;
    label.style.margin = "10px";
    element.appendChild(label);
  }

  createCarNameBox() {
    const inputDiv = document.createElement("div");
    inputDiv.className = "TaxiLogic";
    this.container.appendChild(inputDiv);

    const label = document.createElement("label");
    label.innerHTML = "Izaberite marku automobila koji zelite:";
    label.style.margin = "10px";
    inputDiv.appendChild(label);

    this.createComboBox(inputDiv);
  }

  createComboBox(parentElement: HTMLElement) {
    var opcija;
    var cbx = document.createElement("select");
    cbx.className = "selekcija";
    parentElement.appendChild(cbx);
    from(
      fetch(`${API_URL}/cars`) //?title=${mark}``)
        .then((response) => {
          if (response.ok) {
            console.log(response);
            return response.json();
          } else {
            throw new Error("DB not found");
          }
        })
        .catch((err) => console.log("Error" + err))
    ).subscribe((car: string[]) => {
      console.log(car);

      opcija = document.createElement("option");
      opcija.innerHTML = "";
      opcija.classList.add("opcija");
      opcija.value = "";
      cbx.appendChild(opcija);
      
      car.forEach((element) => {
        opcija = document.createElement("option");
        opcija.innerHTML = element;
        opcija.classList.add("opcija");
        opcija.value = element;
        cbx.appendChild(opcija);
      });
    });
    fromEvent(cbx, "click")
      .pipe(
        map((ev: Event) => (<HTMLInputElement>ev.target).value),
        filter(vrednost => vrednost !== ""),
        switchMap((selected) => this.getDriversByCar(selected))
      )
      .subscribe((driverArray: Driver[]) => {
        this.drivers = driverArray;
        this.WriteDrivers();
        this.createImage(parentElement);
      });
  }

  createImage(inputDiv: HTMLElement) {
    var element = this.container.getElementsByClassName("image")[0];
    if (element !== undefined) element.remove();

    const image = document.createElement("img");
    counter = counter % 4;
    image.src = "../" + this.imageList[counter];
    image.className = "image";
    inputDiv.appendChild(image);

    fromEvent(image, "click")
      .pipe()
      .subscribe(() => {
        image.src = "../" + this.imageList[++counter % 4];
      });
  }

  getDriversByCar(carName: string): Observable<Driver[]> {
    this.imageList = new Array<string>();
    console.log(`fetching Car photos of ${carName}`);
    fetch(`${API_URL}/photos/` + carName)
      .then((response) => {
        if (response.ok) {
          var el = response.json();
          el.then((item) =>
            this.imageList = item
            // item.forEach((element: string) => {
            //   this.imageList.push(element);
            // })
          );
        } else {
          throw new Error("DB not found");
        }
      })
      .catch((err) => console.log("Error" + err));

    return from(
      fetch(`${API_URL}/drivers/` + carName)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("DB not found");
          }
        })
        .catch((err) => console.log("Error" + err))
    );
  }

  WriteDrivers() {
    var element = this.container.getElementsByClassName("tabela")[0];
    if (element !== undefined) element.remove();

    const tableDiv = document.createElement("table");
    tableDiv.className = "tabela";
    this.container.appendChild(tableDiv);
    this.createTable(tableDiv);

    this.drivers.forEach((p) => {
      this.createTr(p, tableDiv);
    });
  }
  
  createTable(tableDiv: HTMLTableElement) {
    this.createTh("Ime", tableDiv);
    this.createTh("Vozilo", tableDiv);
    this.createTh("Prosecna ocena", tableDiv);
    this.createTh("Koeficijent po minutu", tableDiv);
    this.createTh("Dugme za selekciju", tableDiv);
  }

  createTh(text: string, element: HTMLElement) {
    let th = document.createElement("th");
    th.innerHTML = text;
    th.style.margin = "50%";
    element.appendChild(th);
  }

  createTr(p: Driver, tableDiv: HTMLElement) {
    const tr = document.createElement("tr");
    tableDiv.appendChild(tr);
    this.createTd(p.name, tr);
    this.createTd(p.car.toString(), tr);
    this.createTd(p.avgMark.toString(), tr);
    this.createTd(p.priceCoefficient.toString(), tr);
    this.createTdButton(p, "Selektuj ovog vozaca", tr);
  }
  createTdButton(driver: Driver, arg0: string, tr: HTMLTableRowElement) {
    let td = document.createElement("td");

    let btn = document.createElement("button");
    td.appendChild(btn);

    btn.innerHTML = arg0;
    td.style.margin = "50%";
    btn.className = "dugmeUTabeli";
    tr.appendChild(td);

    fromEvent(btn, "click")
      .subscribe(() => {
        this.obs2$ = of(driver);
        console.log("OBS2 EMITTED, GOING INTO ZIPINPUTS");
        this.zipInputs();
      });
  }

  createTd(text: string, ThiliTd: HTMLElement) {
    let td = document.createElement("td");
    td.innerHTML = text;
    td.style.margin = "50%";
    ThiliTd.appendChild(td);
  }

  createH2(text: string, element: HTMLElement) {
    const header = document.createElement("h2");
    header.innerHTML = text;
    element.appendChild(header);
  }
}
