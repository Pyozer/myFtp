import React from 'react';
import { Card,CardContent,CardActions,  Input,Button,InputLabel, FormHelperText,FormControl } from '@material-ui/core';
import styled from "styled-components"

export default function Form() {

  return (
    <>
     <Cards className="app-form">
 <CardContent>
    <FormControls>
  <InputLabel htmlFor="my-input">Host</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text"> localhost </FormHelperText>
</FormControls>
    <FormControls>
  <InputLabel htmlFor="my-input">Port</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text"  />
  <FormHelperText id="my-helper-text"> 2323 </FormHelperText>
</FormControls>
    <FormControls>
  <InputLabel htmlFor="my-input">Username</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text"> Saitama </FormHelperText>
</FormControls>
 <FormControls>
  <InputLabel htmlFor="my-input">Password</InputLabel>
  <Input type="password"  id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text"> password </FormHelperText>
</FormControls>
     </CardContent>
       <CardActions>
    <Button variant="contained" color="primary"> Connect </Button>
       </CardActions>
     </Cards>
    </>
  );
}
const FormControls = styled(FormControl)``
const Cards = styled(Card)`margin: 10vw;`