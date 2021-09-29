import { createAction, props } from "@ngrx/store";
import { Player } from "../models/player";
import { Stadium } from "../models/stadium";


export const setLikeForPlayer = createAction(
    "Set Like",
    props<{
        player: Player
    }>()
)
export const setLikeForPlayerSuccessful = createAction(
    "Set Like Successful",
    props<{
        player: Player
    }>()
)

export const setDislikeForPlayer = createAction(
    "Set Dislike",
    props<{
        player: Player
    }>()
)
export const setDislikeForPlayerSuccessful = createAction(
    "Set Dislike Successful",
    props<{
        player: Player
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
        playerId: number
    }>()
)

export const loadPlayersFromEffects = createAction(
    "Load Players from Effects"
)

export const addNewPlayer = createAction(
    "Add new Player",
    props<{
        player: Player
    }>()
)
export const updatePlayer = createAction(
    "Update Player",
    props<{
        playerId: number,
        player: Player
    }>()
)
export const updatePlayerSuccessful = createAction(
    "Update Player Successful",
    props<{
        player: Player
    }>()
)
export const addNewPlayerSuccessful = createAction(
    "Add new Player - Successful",
    props<{
        player: Player
    }>()
)
export const deletePlayer = createAction(
    "Delete Player",
    props<{
        playerId:number
    }>()
)
export const deletePlayerSuccessful = createAction(
    "Delete Player - Successful",
    props<{
        playerId:Object
    }>()
)
