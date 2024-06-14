import {Player, Scene, StageSettings} from '@animation-scheme-editor/core';
import {createContext} from 'preact';
import {useContext} from 'preact/hooks';

export interface Settings extends StageSettings {}

export interface AppState {
  scene: Scene;
  player: Player;
  settings: Settings;
}

const ApplicationContext = createContext<AppState>(null);

export const ApplicationProvider = ApplicationContext.Provider;
export function useApplicationContext() {
  return useContext(ApplicationContext);
}
