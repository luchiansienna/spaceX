import { SET_LAUNCHES, SET_SEARCH_TERM, SET_CACHED_LAUNCHES } from "../actions/types";
import { PayloadAction } from '@reduxjs/toolkit'

const intitialState: any[] = [];

export const mainReducer = function (state = intitialState, action: PayloadAction<any>) {
    const { type, payload } = action;
    switch (type) {
        case SET_LAUNCHES:
            return {...state, launches: payload};
        case SET_CACHED_LAUNCHES:
            return {...state, launches: payload, cachedLaunches: payload};
        case SET_SEARCH_TERM:
            return {...state, searchTerm: payload};
        default:
            return [...state];
    }
};
