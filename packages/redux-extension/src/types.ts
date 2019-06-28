import { Action, Reducer } from 'redux'
import { Configuration, ParsedFlow, Splitters } from '@flow/parser'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

export enum FlowActionType {
  updateConfig = 'update-config',
  executeFlow = 'execute-flow',
  advanceFlowGraph = 'advance-flow-graph',
}

export type UpdateConfigAction = Action<FlowActionType.updateConfig> & { payload: Configuration<ParsedFlow> }

export type UpdateConfigActionCreator = (payload: Configuration<ParsedFlow>) => UpdateConfigAction

export type ExecuteFlowPayload = { id: string; flowName: string }

export type ExecuteFlowAction = Action<FlowActionType.executeFlow> & { payload: ExecuteFlowPayload }

export type ExecuteFlowActionCreator = (payload: ExecuteFlowPayload) => ExecuteFlowAction

export type AdvanceFlowPayload = ExecuteFlowPayload &
  ({ toNodeIndex: number } | { fromNodeIndex: number; toNodeIndex: number })

export type AdvanceFlowAction = Action<FlowActionType.advanceFlowGraph> & { payload: AdvanceFlowPayload }

export type AdvanceFlowActionCreator = (payload: AdvanceFlowPayload) => AdvanceFlowAction

export type FlowAction = AdvanceFlowAction | ExecuteFlowAction | UpdateConfigAction

export type FlowDispatchedActions = FlowAction | AdvanceGraphThunk | ExecuteFlowThunk

export type AdvanceGraphThunk = ThunkAction<
  AdvanceFlowAction | PromiseLike<AdvanceFlowAction>,
  FlowState,
  undefined,
  AdvanceFlowAction
>

export type ExecuteFlowThunk = FlowThunkAction<FlowAction | PromiseLike<AdvanceFlowAction>>

export type ExecuteFlowThunkCreator = (reducerSelector: FlowReducerSelector) => (flowName: string) => ExecuteFlowThunk

export type FlowState = {
  activeFlows: ParsedFlow[]
  nonActiveWorkflows: ParsedFlow[]
  flows: ParsedFlow[]
} & ({} | { splitters: Splitters })

export type FlowReducer = Reducer<FlowState, FlowAction>

export type FlowReducerSelector<AppState = any> = (state: AppState) => FlowState

export type FlowThunkAction<ReturnValue> = ThunkAction<ReturnValue, FlowState, undefined, FlowAction>

export type FlowThunkDispatch = ThunkDispatch<FlowState, undefined, FlowAction>
