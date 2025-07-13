import { createSlice } from '@reduxjs/toolkit';

// Load theme from localStorage or default to 'light'
const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
const initialState = {
  theme: storedTheme ?? 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      // Save to localStorage on change
      localStorage.setItem('theme', state.theme);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;