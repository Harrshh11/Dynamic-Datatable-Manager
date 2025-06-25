'use client';

import React, { useState, useMemo } from 'react';
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { parseCSV } from '../utils/csvUtils';
import { setRows } from '../redux/dataSlice';
import { saveAs } from 'file-saver';
import ColumnManagerModal from './ColumnManagerModal';

const DataTable: React.FC = () => {
  const dispatch = useDispatch();
  const rows = useSelector((state: RootState) => state.data.rows);
  const columns = useSelector((state: RootState) => state.columns.columns);
  const visibleColumns = columns.filter(col => col.visible);

  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const data = await parseCSV(file);
        dispatch(setRows(data));
      } catch (err) {
        alert('Invalid CSV file');
      }
    }
  };

  const handleExport = () => {
    const csvData = [visibleColumns.map(col => col.headerName).join(',')];
    rows.forEach(row => {
      const line = visibleColumns.map(col => row[col.field] ?? '').join(',');
      csvData.push(line);
    });
    const blob = new Blob([csvData.join('\n')], { type: 'text/csv' });
    saveAs(blob, 'export.csv');
  };

  const filteredRows = useMemo(() => {
    if (!searchText) return rows;
    return rows.filter(row =>
      visibleColumns.some(col =>
        (row[col.field] ?? '').toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [rows, searchText, visibleColumns]);

  const paginatedRows = filteredRows.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={2}>Dynamic Data Table Manager</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          component="label"
          variant="outlined"
          startIcon={<UploadFileIcon />}
        >
          Import CSV
          <input type="file" hidden accept=".csv" onChange={handleImport} />
        </Button>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleExport}
        >
          Export CSV
        </Button>
        <IconButton onClick={() => setOpenModal(true)}>
          <ViewColumnIcon />
        </IconButton>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {visibleColumns.map(col => (
                <TableCell key={col.field}>{col.headerName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row, idx) => (
              <TableRow key={idx}>
                {visibleColumns.map(col => (
                  <TableCell key={col.field}>{row[col.field]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredRows.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10]}
      />

      <ColumnManagerModal open={openModal} onClose={() => setOpenModal(false)} />
    </Box>
  );
};

export default DataTable;
