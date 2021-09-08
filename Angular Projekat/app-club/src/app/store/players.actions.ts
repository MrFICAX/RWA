import { createAction, props } from "@ngrx/store";
import { Player } from "../models/player";
import { Stadium } from "../models/stadium";


export const setLikeForPlayer = createAction(
    "Set Like",
    props<{
        playerId: string,
        newValue: number
    }>()
)

export const setDislikeForPlayer = createAction(
    "Set Dislike",
    props<{
        playerId: string,
        newValue: number
    }>()
)

export const loadPlayersSuccessFromEffects = createAction(
    "Load Players",
    props<{
        players: Player[]
    }>()
)

export const loadStadiumFromEffects = createAction(
    "Trying to load stadium"
)

export const loadStadiumSuccessFromEffects = createAction(
    "Load Stadium",
    props<{
        stadium: Stadium
    }>()
)

export const selectPlayer = createAction(
    "Select Player",
    props<{
        playerId: string
    }>()
)

export const loadPlayersFromEffects = createAction(
    "Load Players from Effects"
)
