import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import './styles.css';

const ScreenManager = () => {
  const navigate = useNavigate();
  const [screens, setScreens] = useState([]);
  const [filters, setFilters] = useState({
    id: '',
    name: '',
    client: '',
    width: '',
    height: ''
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const loadedScreens = [
      { id: 1, name: 'Pantalla 1', client: 'Cliente 1', width: 375, height: 667 },
      { id: 2, name: 'Pantalla 2', client: 'Cliente 2', width: 800, height: 600 },
      { id: 3, name: 'Pantalla 3', client: 'Cliente 3', width: 1024, height: 768 },
      { id: 4, name: 'Pantalla 4', client: 'Cliente 4', width: 1280, height: 720 },
      { id: 5, name: 'Pantalla 5', client: 'Cliente 5', width: 1920, height: 1080 },
      { id: 6, name: 'Pantalla 6', client: 'Cliente 6', width: 1366, height: 768 },
      { id: 7, name: 'Pantalla 7', client: 'Cliente 7', width: 1600, height: 900 },
      { id: 8, name: 'Pantalla 8', client: 'Cliente 8', width: 1440, height: 900 },
      { id: 9, name: 'Pantalla 9', client: 'Cliente 9', width: 1280, height: 1024 },
      { id: 10, name: 'Pantalla 10', client: 'Cliente 10', width: 1920, height: 1200 },
      { id: 11, name: 'Pantalla 11', client: 'Cliente 11', width: 2560, height: 1440 },
      { id: 12, name: 'Pantalla 12', client: 'Cliente 12', width: 3840, height: 2160 },
      { id: 13, name: 'Pantalla 13', client: 'Cliente 13', width: 4096, height: 2160 },
      { id: 14, name: 'Pantalla 14', client: 'Cliente 14', width: 7680, height: 4320 },
      { id: 15, name: 'Pantalla 15', client: 'Cliente 15', width: 5120, height: 2880 },
      { id: 16, name: 'Pantalla 16', client: 'Cliente 16', width: 2560, height: 1080 },
      { id: 17, name: 'Pantalla 17', client: 'Cliente 17', width: 3440, height: 1440 },
      { id: 18, name: 'Pantalla 18', client: 'Cliente 18', width: 2560, height: 1440 },
      { id: 19, name: 'Pantalla 19', client: 'Cliente 19', width: 3440, height: 1440 },
      { id: 20, name: 'Pantalla 20', client: 'Cliente 20', width: 5120, height: 2160 },
    ];
    setScreens(loadedScreens);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const filteredScreens = screens.filter(screen => {
    return (
      screen.id.toString().includes(filters.id) &&
      screen.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      screen.client.toLowerCase().includes(filters.client.toLowerCase()) &&
      screen.width.toString().includes(filters.width) &&
      screen.height.toString().includes(filters.height)
    );
  });

  const handleEdit = (screenId) => {
    navigate(`/update-screen`, { state: { screenId } });
  };

  const handleDelete = (screenId) => {
    setScreens(prevScreens => prevScreens.filter(screen => screen.id !== screenId));
    alert('Pantalla eliminada.');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="screen-manager-container">
      <div className="filters-container">
        <div className="filters">
          <TextField
            label="ID"
            type="text"
            name="id"
            value={filters.id}
            onChange={handleFilterChange}
            fullWidth
            style={{ marginBottom: '20px' }}
          />
          <TextField
            label="Nombre"
            type="text"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            fullWidth
            style={{ marginBottom: '20px' }}
          />
          <TextField
            label="Cliente"
            type="text"
            name="client"
            value={filters.client}
            onChange={handleFilterChange}
            fullWidth
            style={{ marginBottom: '20px' }}
          />
          <TextField
            label="Ancho"
            type="text"
            name="width"
            value={filters.width}
            onChange={handleFilterChange}
            fullWidth
            style={{ marginBottom: '20px' }}
          />
          <TextField
            label="Alto"
            type="text"
            name="height"
            value={filters.height}
            onChange={handleFilterChange}
            fullWidth
          />
        </div>
      </div>
      <div className="table-container">
        <div className="button-container">
          <Button variant="contained" color="primary" className="add-button" onClick={() => navigate('/create-screen')}>
            Añadir Nueva Pantalla
          </Button>
        </div>
        <Paper elevation={3} className="table-paper">
          <TableContainer>
            <Table>
              <TableHead className="table-header">
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Cliente</TableCell>
                  <TableCell>Ancho</TableCell>
                  <TableCell>Alto</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredScreens.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(screen => (
                  <TableRow key={screen.id}>
                    <TableCell>{screen.id}</TableCell>
                    <TableCell>{screen.name}</TableCell>
                    <TableCell>{screen.client}</TableCell>
                    <TableCell>{screen.width}</TableCell>
                    <TableCell>{screen.height}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEdit(screen.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => handleDelete(screen.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={filteredScreens.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
};

export default ScreenManager;