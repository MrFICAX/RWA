import { createAction, props } from "@ngrx/store";


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