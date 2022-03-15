import react, { useState, useEffect } from 'react';
import './App.css';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import * as validation from './shared/validation';
import getColumnDefs from './shared/utils';

const App = () => {
  const [params, setParams] = useState({
    phone: 0,
    email: '',
  });
  const { email, phone } = params;
  // validation layer
  const [touchedFields, setTouchedFields] = useState({});
  const { schema } = getColumnDefs('login.forms');
  const errors = validation.validation({
    schema,
    data: {
      phone,
      email,
    },
  });

  const handleBlur = (e, field) => setTouchedFields({
    ...touchedFields,
    [field || e.target.name || e.target.id]: true,
  });
  const validationDiv = (field) => validation.errorDiv(errors, touchedFields, field);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setParams({...params, [name]: Number(value)})
    } else {
      setParams({...params, [name]: value})
    }
    
  };

  return (
    <div className="App">
      {/* {console.log('params', params)} */}
      <Stack
        component="form"
        sx={{
          width: '25ch',
        }}
        spacing={2}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic" label="Outlined" variant="outlined"
          name="phone"
          type="number"
          onChange={handleChange}
          onBlur={handleBlur}
          value={params.phone}
        />
        {console.log(typeof params.phone, params.phone)}
        <div style={{ textAlign: 'left' }}>{validationDiv('phone')}</div>
        <TextField
          id="outlined-basic" label="Outlined" variant="outlined"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={params.email}
        />
        <div style={{ textAlign: 'left' }}>{validationDiv('email')}</div>
      </Stack>
    </div>
  );
}

export default App;
