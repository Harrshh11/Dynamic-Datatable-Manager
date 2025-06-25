import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Row {
  [key: string]: string | number;
}

interface DataState {
  rows: Row[];
}

const initialState: DataState = {
  rows: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setRows(state, action: PayloadAction<Row[]>) {
      state.rows = action.payload;
    },
    addRow(state, action: PayloadAction<Row>) {
      state.rows.push(action.payload);
    },
    updateRow(state, action: PayloadAction<{ index: number; newRow: Row }>) {
      state.rows[action.payload.index] = action.payload.newRow;
    },
    deleteRow(state, action: PayloadAction<number>) {
      state.rows.splice(action.payload, 1);
    },
  },
});

export const { setRows, addRow, updateRow, deleteRow } = dataSlice.actions;
export default dataSlice.reducer;
