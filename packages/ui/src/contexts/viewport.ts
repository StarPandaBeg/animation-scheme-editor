import {createContext} from 'preact';
import {useContext} from 'preact/hooks';

export interface ViewportState {
  x: number;
  y: number;
  rect: DOMRectReadOnly;
  zoom: number;
}

const ViewportContext = createContext<ViewportState>({
  x: 0,
  y: 0,
  zoom: 1,
  rect: new DOMRectReadOnly(),
});

export const ViewportProvider = ViewportContext.Provider;
export function useViewportContext() {
  return useContext(ViewportContext);
}
