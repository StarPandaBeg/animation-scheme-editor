import {Player, Scene} from '@animation-scheme-editor/core';
import {createContext} from 'preact';
import {useContext} from 'preact/hooks';

export interface AppState {
  scene: Scene;
  player: Player;
}

const ApplicationContext = createContext<AppState>(null);

export const ApplicationProvider = ApplicationContext.Provider;
export function useApplicationContext() {
  return useContext(ApplicationContext);
}
