import { Component } from '@angular/core';
import { Player } from './models/player';
import { Stadium } from './models/stadium';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-club';
  selectedPlayer: Player | null = null;
  MyStadium: Stadium = {
    id: 1,
    name: "Rajko Mitic",
    description: "Rajko Mitić Stadium (Serbian: Стадион Рајко Митић / Stadion Rajko Mitić, previously known as Red Star Stadium (Serbian: Стадион Црвена звезда / Stadion Crvena zvezda), also known as Marakana (Serbian Cyrillic: Маракана) is a multi-use stadium in Belgrade, Serbia which has been the home ground of Red Star Belgrade since 1963. The stadium is located in Dedinje, municipality of Savski Venac.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Fk_Red_Star_stadium.jpg/300px-Fk_Red_Star_stadium.jpg",
    city: "Beograd",
    attendance: 53000
  };
  // MyPlayer:Player = {
  //   id: 1,
  //   fullname: "Milan Pavkov",
  //   position: "Napad",
  //   image: "https://www.kurir.rs/data/images/2021/02/19/15/2467747_pavkov1_ls.jpg",
  //   likes: 30,
  //   dislikes: 9
  // };

  handlePlayerSelection(player: Player){
    this.selectedPlayer = player;
  }
}
