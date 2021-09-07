import { Component, Input, OnInit } from '@angular/core';
import { Stadium } from 'src/app/models/stadium';
import { faUsers, faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-club-details',
  templateUrl: './club-details.component.html',
  styleUrls: ['./club-details.component.css']
})
export class ClubDetailsComponent implements OnInit {

  // stadium: Stadium = {
  //   id: 1,
  //   name: "Rajko Mitic",
  //   description: "Rajko Mitić Stadium (Serbian: Стадион Рајко Митић / Stadion Rajko Mitić, previously known as Red Star Stadium (Serbian: Стадион Црвена звезда / Stadion Crvena zvezda), also known as Marakana (Serbian Cyrillic: Маракана) is a multi-use stadium in Belgrade, Serbia which has been the home ground of Red Star Belgrade since 1963. The stadium is located in Dedinje, municipality of Savski Venac.",
  //   image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Fk_Red_Star_stadium.jpg/300px-Fk_Red_Star_stadium.jpg",
  //   city: "Beograd",
  //   attendance: 53000
  // };
  // @Input() stadium: Stadium = {
  //   id: 0,
  //   name: "",
  //   description:"",
  //   image:"",
  //   city:"",
  //   attendance: 0
  // };
  
  @Input() stadium:Stadium | null = null;

  iconUsers = faUsers;
  iconHeart = faHeartBroken;
  constructor() { }

 Change(){
   if(this.iconHeart == faHeartBroken)
      this.iconHeart = faHeart;
   else
      this.iconHeart = faHeartBroken;
  }

  ngOnInit(): void {
  }

}
