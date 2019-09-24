import React from 'react';
import logo from './logo.svg';
import { Input, TextField,Button,InputLabel, FormHelperText,FormControl } from '@material-ui/core';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
    <TextField
        label="Adresse"
        placeholder="[Adresse]:[port]"
        className="text"
        color="primary"
        margin="normal"
      /> 
    <Button variant="contained" color="primary"> Send </Button>
    <FormControl>
  <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
</FormControl>
      </header>
    </div>
  );
}

export default App;
