import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Player } from '../models/player';
import { environment } from 'src/environments/environment';
import { catchError} from 'rxjs/operators'
import { throwError } from 'rxjs';
import { Stadium } from '../models/stadium';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private httpClient: HttpClient) { }

  getPlayers(){
    return this.httpClient.get<Player[]>(environment.apiUrl + "club").pipe(
      catchError(errorHandler));
  }

  getStadium(){
    return this.httpClient.get<Stadium>(environment.apiUrl + "stadium").pipe(
      catchError(errorHandler));
  }


}


const errorHandler = (error: HttpErrorResponse) =>{
  const errorMessage = (error.status === 0) ? 
    `Can't connect to API ${error.error}` :
    `Backend returned code ${error.status}`;

    return throwError(errorMessage);
};