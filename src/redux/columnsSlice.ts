import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Column {
  field: string;
  headerName: string;
  visible: boolean;
}

interface ColumnsState {
  columns: Column[];
}

const initialState: ColumnsState = {
  columns: [
    { field: 'name', headerName: 'Name', visible: true },
    { field: 'email', headerName: 'Email', visible: true },
    { field: 'age', headerName: 'Age', visible: true },
    { field: 'role', headerName: 'Role', visible: true },
  ],
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    toggleColumnVisibility(state, action: PayloadAction<string>) {
      const column = state.columns.find(c => c.field === action.payload);
      if (column) column.visible = !column.visible;
    },
    addColumn(state, action: PayloadAction<{ field: string; headerName: string }>) {
      state.columns.push({
        field: action.payload.field,
        headerName: action.payload.headerName,
        visible: true,
      });
    },
  },
});

export const { toggleColumnVisibility, addColumn } = columnsSlice.actions;
export default columnsSlice.reducer;
