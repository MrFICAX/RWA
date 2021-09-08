import { createSelector } from "@ngrx/store";
import { Player } from "../models/player";
import { AppState } from "./app-state";

export const selectPlayersFeature = (state: AppState) => state.club;

export const selectAllPlayers = createSelector(
    selectPlayersFeature,
    (state) => Object
    .values(state.entities)
    .filter(player => player != null)
    .map(player => <Player>player)  
)

export const selectAllPlayersAsDict = createSelector(
    selectPlayersFeature,
    (state) => state.entities
)

export const selectSelectedPlayerId = createSelector(
    selectPlayersFeature,
    (state) => state.selectedPlayer
)

export const selectStadium = createSelector(
    selectPlayersFeature,
    (state) => state.stadium
)

export const selectSelectedPlayer = createSelector(
    selectAllPlayersAsDict,
    selectSelectedPlayerId,
    (allPlayers, playerId) => 
        allPlayers[playerId] ?? null    
    //allPlayers.find(player => player.id === playerId) ?? null
)