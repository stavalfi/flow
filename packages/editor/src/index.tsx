import 'fonts/my-symphony.font.js'

import React from 'react'
import ReactDOM from 'react-dom'
import App from 'app'

// @ts-ignore
ReactDOM.render(<App />, document.getElementById('app'))

import {
  updateConfigActionCreator,
  executeFlowThunkCreator,
  reducer,
  FlowAction,
  FlowReducerSelector,
  FlowState,
} from '@flow/redux-extention'
import { parse } from '@flow/parser'
import { logger } from 'redux-logger'
import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunk, { ThunkDispatch } from 'redux-thunk'

const middleware = applyMiddleware<ThunkDispatch<FlowState, undefined, FlowAction>, FlowState>(thunk, logger)
const store = createStore(combineReducers({ libReducer: reducer }), middleware)

const libSelector: FlowReducerSelector = state => state.libReducer
const config = parse({
  name: 'flow1',
  graph: 'a:b:c',
})

store.dispatch(updateConfigActionCreator(config))
store.dispatch(executeFlowThunkCreator(libSelector)('flow1'))
