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
import Chip from '@mui/material/Chip';
import './styles.css';

const ItemManager = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({
    id: '',
    name: '',
    width: '',
    height: '',
    tags: ''
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await httpClient.get('/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const filteredItems = items.filter(item => {
    return (
      item.id.toString().includes(filters.id) &&
      item.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      item.width.toString().includes(filters.width) &&
      item.height.toString().includes(filters.height) &&
      item.tags.some(tag => tag.toLowerCase().includes(filters.tags.toLowerCase()))
    );
  });

  const handleEdit = (itemId) => {
    navigate(`/update-item`, { state: { itemId } });
  };

  const handleDelete = async (itemId) => {
    try {
      await httpClient.delete(`/items/${itemId}`);
      setItems(prevItems => prevItems.filter(item => item.id !== itemId));
      alert('Item eliminado.');
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Error eliminando item.');
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
    <div className="item-manager-container">
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
            style={{ marginBottom: '20px' }}
          />
          <TextField
            label="Etiquetas"
            type="text"
            name="tags"
            value={filters.tags}
            onChange={handleFilterChange}
            fullWidth
          />
        </div>
      </div>
      <div className="table-container">
        <div className="button-container">
          <Button variant="contained" color="primary" className="add-button" onClick={() => navigate('/create-item')}>
            Añadir Nuevo Item
          </Button>
        </div>
        <Paper elevation={3} className="table-paper">
          <TableContainer>
            <Table>
              <TableHead className="table-header">
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Ancho</TableCell>
                  <TableCell>Alto</TableCell>
                  <TableCell>Etiquetas</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.width}</TableCell>
                    <TableCell>{item.height}</TableCell>
                    <TableCell>
                      {item.tags.map((tag, index) => (
                        <Chip key={index} label={tag} style={{ marginRight: '5px' }} />
                      ))}
                    </TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEdit(item.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => handleDelete(item.id)}>
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
            count={filteredItems.length}
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

export default ItemManager;