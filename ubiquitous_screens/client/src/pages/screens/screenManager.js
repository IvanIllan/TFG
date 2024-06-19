import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import httpClient from '../../utils/httpClient';
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
    factory: '',
    width: '',
    height: ''
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchScreens = async () => {
      try {
        const response = await httpClient.get('/screens', { params: filters });
        setScreens(response.data);
      } catch (error) {
        console.error('Error fetching screens:', error);
      }
    };

    fetchScreens();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleEdit = (screenId) => {
    navigate(`/dashboard/update-screen/${screenId}`);
  };

  const handleDelete = async (screenId) => {
    try {
      await httpClient.delete(`/screens/${screenId}`);
      setScreens(prevScreens => prevScreens.filter(screen => screen.id !== screenId));
      alert('Pantalla eliminada.');
    } catch (error) {
      console.error('Error deleting screen:', error);
      alert('Error eliminando pantalla.');
    }
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
        <h2>Filtros</h2>
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
            label="Cliente (Factory)"
            type="text"
            name="factory"
            value={filters.factory}
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
        <div className="header">
          <h1>Pantallas Ubicuas</h1>
          <Button variant="contained" color="primary" className="add-button" onClick={() => navigate('/dashboard/create-screen')}>
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
                  <TableCell>Cliente (Factory)</TableCell>
                  <TableCell>Ancho</TableCell>
                  <TableCell>Alto</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {screens.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(screen => (
                  <TableRow key={screen.id}>
                    <TableCell>{screen.id}</TableCell>
                    <TableCell>{screen.name}</TableCell>
                    <TableCell>{screen.factory_name}</TableCell>
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
            count={screens.length}
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
