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

  //Ova metoda radi sa JSON serverom
  getPlayers(){
    return this.httpClient.get<Player[]>(environment.apiUrl + "/club").pipe(
      catchError(errorHandler));
  }
  //Metode koje rade sa backendOm
  public readPlayers(){
    return this.httpClient.get<Player[]>(`${environment.apiUrl}/players`);
  }

  public createPlayer(player: Player){
    return this.httpClient.post<Player>(`${environment.apiUrl}/players/create`, player);
  }

  public updatePlayer(player: Player){
    return this.httpClient.put<Player>(`${environment.apiUrl}/players/${player.id}/update`, player);
  }

  public deletePlayer(id: number){
    return this.httpClient.delete(`${environment.apiUrl}/players/${id}/delete`);
  }

  public readStadiums(){
    return this.httpClient.get<Player[]>(`${environment.apiUrl}/stadiums`);
  }



  getStadium(){
    return this.httpClient.get<Stadium>(environment.apiUrl + "/stadium").pipe(
      catchError(errorHandler));
  }


}


const errorHandler = (error: HttpErrorResponse) =>{
  const errorMessage = (error.status === 0) ? 
    `Can't connect to API ${error.error}` :
    `Backend returned code ${error.status}`;

    return throwError(errorMessage);
};