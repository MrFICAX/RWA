import { createSelector } from "@ngrx/store";
import { AppState } from "./app-state";

export const selectPlayersFeature = (state: AppState) => state.club;

export const selectAllPlayers = createSelector(
    selectPlayersFeature,
    (state) => state.allPlayers
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
    selectAllPlayers,
    selectSelectedPlayerId,
    (allPlayers, playerId) => 
        allPlayers.find(player => player.id === playerId) ?? null
)