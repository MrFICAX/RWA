import { createReducer, on } from '@ngrx/store';
import { Player } from '../models/player';

import * as Actions from './players.actions';

export interface ClubState {
  allPlayers: ReadonlyArray<Player>;
  selectedPlayer: string;
}

export const initialState: ClubState = {
  allPlayers: [],
  selectedPlayer: '',
};

export const playerReducer = createReducer(
  initialState,
  on(
    Actions.setLikeForPlayer,
    (state, { playerId, newValue }) => ({
      ...state,
      allPlayers: state.allPlayers.map((player) =>
        player.id === playerId ? { ...player, likes: newValue } : player
      ),
    })
    //OVAKO NE TREBA DA SE RADI
    //    const foundPlayer = state.allPlayers.find(player => player.id === playerId);
    //    if(!foundPlayer)
    //     return state;
    //    const newPlayer: Player = {...foundPlayer, likes: newValue};
    //    const newPlayersArray: ReadonlyArray<Player> = state.allPlayers.map(
    //        player => player.id === playerId ?
    //        newPlayer :
    //        player
    //    );
    //    return {...state, allPlayers: newPlayersArray};
  ),
  on(Actions.setDislikeForPlayer, (state, { playerId, newValue }) => ({
    ...state,
    allPlayers: state.allPlayers.map((player) =>
      player.id === playerId ? { ...player, likes: newValue } : player
    ),
  }))
);
