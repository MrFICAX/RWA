import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createEffects } from "@ngrx/effects/src/effects_module";
import { of } from "rxjs";
import { catchError, exhaustMap, map, mergeMap } from "rxjs/operators";
import { PlayersService } from "../services/players.service";
import * as PlayerActions from "./players.actions"

@Injectable()
export class PlayersEffects {
    constructor(private playersService: PlayersService, private actions$: Actions ){ }

    loadPlayersEffects$ = createEffect(() => 
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
            mergeMap(() => this.playersService.readStadiums()
                .pipe(
                    map((stadium) => (PlayerActions.loadStadiumSuccessFromEffects({stadium}))),
                    catchError(() => of({type: "load error"}))
                )
            )
        )
    )
    addNewPlayerEffects$ = createEffect(() => 
        this.actions$.pipe(
            ofType(PlayerActions.addNewPlayer),
            exhaustMap((action) => this.playersService.createPlayer(action.player)
                .pipe(
                    map((player) => (PlayerActions.addNewPlayerSuccessful({player}))),
                    catchError(() => of({type: "load error"}))
                )
            )
        )
    )
    deletePlayerEffects$ = createEffect(() => 
        this.actions$.pipe(
            ofType(PlayerActions.deletePlayer),
            exhaustMap((action) => this.playersService.deletePlayer(action.playerId)
                .pipe(
                    map((playerId) => (PlayerActions.deletePlayerSuccessful({playerId}))),
                    catchError(() => of({type: "load error"}))
                )
            )
        )
    )
    updatePlayerEffects$ = createEffect(() => 
        this.actions$.pipe(
            ofType(PlayerActions.updatePlayer),
            exhaustMap((action) => this.playersService.updatePlayer(action.player)
                .pipe(
                    map((player) => (PlayerActions.updatePlayerSuccessful({player}))),
                    catchError(() => of({type: "load error"}))
                )
            )
        )
    )
    setLikeToPlayerEffects$ = createEffect(() => 
        this.actions$.pipe(
            ofType(PlayerActions.setLikeForPlayer),
            exhaustMap((action) => this.playersService.updatePlayer(action.player)
                .pipe(
                    map((player) => (PlayerActions.setLikeForPlayerSuccessful({player}))),
                    catchError(() => of({type: "load error"}))
                )
            )
        )
    )
    setDislikeToPlayerEffects$ = createEffect(() => 
        this.actions$.pipe(
            ofType(PlayerActions.setDislikeForPlayer),
            exhaustMap((action) => this.playersService.updatePlayer(action.player)
                .pipe(
                    map((player) => (PlayerActions.setDislikeForPlayerSuccessful({player}))),
                    catchError(() => of({type: "load error"}))
                )
            )
        )
    )
}