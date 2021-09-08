import { createReducer, on } from '@ngrx/store';
import { Player } from '../models/player';
import { Stadium } from '../models/stadium';

import * as Actions from './players.actions';

export interface ClubState {
  allPlayers: ReadonlyArray<Player>;
  stadium: Stadium,
  selectedPlayer: string;
}

export const initialState: ClubState = {
    allPlayers: [],
    selectedPlayer: '',
    stadium: {
        id: 0,
        city:"",
        image:"",
        name:"",
        attendance: 0,
        description:""
    }
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
  ),
  on(Actions.setDislikeForPlayer, (state, { playerId, newValue }) => ({
    ...state,
    allPlayers: state.allPlayers.map((player) =>
      player.id === playerId ? { ...player, dislikes: newValue } : player
    ),
  })),
  on(Actions.loadPlayers, (state, {players}) =>
    ({...state, allPlayers: players})
  ),
  on(Actions.selectPlayer, (state, {playerId}) => 
      ({...state, selectedPlayer: playerId})
  ),
  on(Actions.loadStadium, (state, {stadium}) => ({...state, stadium: stadium}) )
);
