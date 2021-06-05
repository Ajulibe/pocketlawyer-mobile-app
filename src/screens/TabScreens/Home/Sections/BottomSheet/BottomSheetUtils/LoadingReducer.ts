
interface IState {
    isVisible?: boolean;
    content?: string;
  }
  
  export const loadingInitialState: IState = {
    isVisible: false,
    content: "Loading...",
  };
  
  export enum LoadingActionType {
    SHOW = "SHOW_SPINNER",
    HIDE = "HIDE_SPINNER",
    SHOW_WITH_CONTENT = "SHOW_WITH_CONTENT",
  }
  
  type Action = {
    type: LoadingActionType;
    payload?: IState;
  };
  
  export function loadingReducer(state: IState, action: Action) {

    switch (action.type) {
      case LoadingActionType.SHOW:
        return { ...state, isVisible: true };
      case LoadingActionType.HIDE:
        return { ...state, isVisible: false };
      case LoadingActionType.SHOW_WITH_CONTENT:
        return { ...state, isVisible: true, content: action.payload?.content };
      default:
        return state;
    }
  }
  