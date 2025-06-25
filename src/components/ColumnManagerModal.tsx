import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, FormGroup, FormControlLabel, Checkbox,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleColumnVisibility, addColumn } from '../redux/columnsSlice';

interface Props {
  open: boolean;
  onClose: () => void;
}

const ColumnManagerModal: React.FC<Props> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const columns = useSelector((state: RootState) => state.columns.columns);
  const [newColumnName, setNewColumnName] = useState('');
  const [newColumnField, setNewColumnField] = useState('');

  const handleAddColumn = () => {
    if (newColumnField && newColumnName) {
      dispatch(addColumn({ field: newColumnField, headerName: newColumnName }));
      setNewColumnName('');
      setNewColumnField('');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Manage Columns</DialogTitle>
      <DialogContent>
        <FormGroup>
          {columns.map((col) => (
            <FormControlLabel
              key={col.field}
              control={
                <Checkbox
                  checked={col.visible}
                  onChange={() => dispatch(toggleColumnVisibility(col.field))}
                />
              }
              label={col.headerName}
            />
          ))}
        </FormGroup>
        <TextField
          label="New Column Name"
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="New Column Field (unique key)"
          value={newColumnField}
          onChange={(e) => setNewColumnField(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button onClick={handleAddColumn} variant="contained" sx={{ mt: 2 }}>
          Add Column
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ColumnManagerModal;
