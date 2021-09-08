import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Stadium } from 'src/app/models/stadium';
import { AppState } from 'src/app/store/app-state';
import { selectStadium } from 'src/app/store/players.selectors';

@Component({
  selector: 'app-stadium',
  templateUrl: './stadium.component.html',
  styleUrls: ['./stadium.component.css']
})
export class StadiumComponent implements OnInit {

  MyStadium: Observable<Stadium | null> = of(null);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.MyStadium = this.store.select(selectStadium);

  }

}
