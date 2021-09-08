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

export const loadPlayers = createAction(
    "Load Players",
    props<{
        players: Player[]
    }>()
)

export const loadStadium = createAction(
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