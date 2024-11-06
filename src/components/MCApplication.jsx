import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MCTypesService from '../services/MCTypesService';
import MCApplicationService from '../services/MCApplicationService';

import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const MCApplication = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [mcTypes, setMCTypes] = useState([]);
  const [selectedMCType, setSelectedMCType] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    const getMCTypes = async () => {
      try {
        const response = await MCTypesService.getAll();
        setMCTypes(response.data);
      } catch (error) {
        console.log("Error al cargar los tipos", error);
      }
    };

    getMCTypes();
  }, []);

  const handleTypeChange = (event) => {
    setSelectedMCType(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedType = mcTypes.find(type => type.id === selectedMCType);

    const applicationData = {
      status: 0,
      type: selectedMCType,
      client: auth.user.id,
      loanAmount: parseInt(loanAmount),
      loanTerm: selectedType.max_term,
      annualInterestRate: selectedType.min_interest_rate,
      lienInsurance: 3,
      fireInsurance: 20000,
      administrationCommission: 1
    };

    try {
      const response = await MCApplicationService.create(applicationData);
      console.log("Solicitud exitosa", response.data);
      setSnackbarMessage("Solicitud exitosa");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/applicationsTracking');
      }, 3000);
    } catch (error) {
      console.log("Error al realizar la solicitud", error);
      setSnackbarMessage("Error al realizar la solicitud");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      component="form"
      onSubmit={handleSubmit}
    >
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <h3>Realizar Solicitud de Crédito Hipotecario</h3>
      <hr />
      <FormControl fullWidth>
        <InputLabel id="mctypes-list">Tipo de Crédito Hipotecario</InputLabel>
        <Select
          labelId='mctypes-list'
          value={selectedMCType}
          onChange={handleTypeChange}
          displayEmpty
        >
          {mcTypes.map(mctype => (
            <MenuItem key={mctype.id} value={mctype.id}>
              {mctype.type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <FormControl fullWidth>
        <TextField
          id="loan-amount"
          label="Monto del Préstamo"
          variant='outlined'
          type="number"
          size="small"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />
        <Typography variant="caption" color="textSecondary">
          En CLP.
        </Typography>
      </FormControl>
      <br />
      <FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!auth.isAuthenticated}
        >
          Realizar Solicitud
        </Button>
      </FormControl>
    </Box>
  );
};

export default MCApplication;