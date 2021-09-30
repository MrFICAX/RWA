import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Stadium } from 'src/app/models/stadium';
import { AppState } from 'src/app/store/app-state';
import { selectStadiums } from 'src/app/store/players.selectors';

@Component({
  selector: 'app-stadium',
  templateUrl: './stadium.component.html',
  styleUrls: ['./stadium.component.css']
})
export class StadiumComponent implements OnInit {

  MyStadiums: Observable<readonly Stadium[] | null> = of(null);
  // players: Observable<readonly Player[]> = of([]);
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.MyStadiums = this.store.select(selectStadiums);

  }

}
