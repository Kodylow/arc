import { ThemeName } from 'tamagui'

export interface UiState {
  themeName: ThemeName
}

const initialUiState: UiState = {
  themeName: 'dark',
}

export const createUiStore = (set: any) => ({
  themeName: initialUiState.themeName,
  setThemeName: (themeName: ThemeName) => set({ themeName }),
})
