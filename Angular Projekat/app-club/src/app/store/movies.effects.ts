import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createEffects } from "@ngrx/effects/src/effects_module";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { PlayersService } from "../services/players.service";
import * as PlayerActions from "./players.actions"

@Injectable()
export class PlayersEffects {
    constructor(private playersService: PlayersService, private actions$: Actions ){ }

    loadEffects$ = createEffect(() => 
        this.actions$.pipe(
            ofType(PlayerActions.loadPlayersFromEffects),
            mergeMap(() => this.playersService.readPlayers()
                .pipe(
                    map((players) => (PlayerActions.loadPlayersSuccessFromEffects({players}))),
                    catchError(() => of({type: "load error"}))
                )
            )
        )
    )
    loadStadiumEffects$ = createEffect(() => 
        this.actions$.pipe(
            ofType(PlayerActions.loadStadiumFromEffects),
            mergeMap(() => this.playersService.getStadium()
                .pipe(
                    map((stadium) => (PlayerActions.loadStadiumSuccessFromEffects({stadium}))),
                    catchError(() => of({type: "load error"}))
                )
            )
        )
    )
}