import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Player } from '../models/player';
import { Stadium } from '../models/stadium';

import * as Actions from './players.actions';

// export interface ClubState {
//   //allPlayers: ReadonlyArray<Player>;
//   // allPlayers: EntityState<Player>;
//   stadium: Stadium,
//   selectedPlayer: string;
// }

export interface ClubState extends EntityState<Player> {
  stadium: Stadium;
  selectedPlayer: number;
}

const adapter = createEntityAdapter<Player>();

export const initialState: ClubState = adapter.getInitialState({
  selectedPlayer: 0,
  stadium: {
    id: 0,
    city: '',
    image: '',
    name: '',
    attendance: 0,
    description: '',
  },
});

export const playerReducer = createReducer(
  initialState,
  on(Actions.setLikeForPlayerSuccessful, (state, { player }) => {
    const targetPlayer = state.entities[player.id];
    if (!targetPlayer) return state;
    return adapter.setOne({ ...targetPlayer, likes: player.likes }, state);

    // ...state,
    // allPlayers: state.allPlayers.map((player) =>
    //   player.id === playerId ? { ...player, likes: newValue } : player
    // ),
  }),
  on(Actions.setDislikeForPlayerSuccessful, (state, { player }) => {
    const targetPlayer = state.entities[player.id];
    if (!targetPlayer) {
      return state;
    } else {
      return adapter.setOne({ ...targetPlayer, dislikes: player.dislikes }, state);
    }

    // ({
    //   ...state,
    //   allPlayers: state.allPlayers.map((player) =>
    //     player.id === playerId ? { ...player, dislikes: newValue } : player
    //   ),
    // })
  }),
  on(
    Actions.loadPlayersSuccessFromEffects,
    (state, { players }) => adapter.setAll(players, state)

    // ({...state, allPlayers: players})
  ),
  on(Actions.selectPlayer, (state, { playerId }) => ({
    ...state,
    selectedPlayer: playerId,
  })),
  on(Actions.loadStadiumSuccessFromEffects, (state, { stadium }) => ({
    ...state,
    stadium: stadium,
  })),
  on(Actions.addNewPlayerSuccessful, (state, { player }) => {
    return adapter.addOne(player, state);
  }),
  on(Actions.deletePlayerSuccessful, (state, { playerId }) => {
    return adapter.removeOne(playerId.toString(), state);
  }),
  on(Actions.updatePlayerSuccessful, (state, { player }) => {
    const targetPlayer = state.entities[player.id];
    if (!targetPlayer) return state;
    return adapter.setOne(
      {
        ...targetPlayer,
        fullname: player.fullname,
        position: player.position,
        likes: player.likes,
        dislikes: player.dislikes,
        image: player.image,
      },
      state
    );
  })
);
