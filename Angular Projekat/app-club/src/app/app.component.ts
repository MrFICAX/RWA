import { Component } from '@angular/core';
import { Stadium } from './models/stadium';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-club';
  MyStadium: Stadium = {
    id: 1,
    name: "Rajko Mitic",
    description: "Rajko Mitić Stadium (Serbian: Стадион Рајко Митић / Stadion Rajko Mitić, previously known as Red Star Stadium (Serbian: Стадион Црвена звезда / Stadion Crvena zvezda), also known as Marakana (Serbian Cyrillic: Маракана) is a multi-use stadium in Belgrade, Serbia which has been the home ground of Red Star Belgrade since 1963. The stadium is located in Dedinje, municipality of Savski Venac.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Fk_Red_Star_stadium.jpg/300px-Fk_Red_Star_stadium.jpg",
    city: "Beograd",
    attendance: 53000
  };
}
