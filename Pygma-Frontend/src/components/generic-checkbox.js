import React from 'react';
import { Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material';

const GenericCheckbox = ({ options, selectedOptions, onChange, formik, fieldName }) => {
  const handleOptionChange = (event) => {
    const { value, checked } = event.target;
    let updatedOptions;

    if (checked) {
      if (selectedOptions.length < 3) {
        updatedOptions = [...selectedOptions, value];
      } else {
        return; // Limit reached, do not update options
      }
    } else {
      updatedOptions = selectedOptions.filter((option) => option !== value);
    }

    formik.setFieldValue(fieldName, updatedOptions); // Update formik field value
  };

  const labelStyle = {
    fontSize: '0.80rem',
    textAlign: 'left',
  };

  return (
    <FormGroup>
      <Grid container spacing={1}>
        {options.map((option) => (
          <Grid item xs={6} sm={6} md={4} lg={3} key={option}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedOptions.includes(option)}
                  onChange={handleOptionChange}
                  value={option}
                  name={option}
                />
              }
              label={<span style={labelStyle}>{option}</span>}
              style={{ textAlign: 'left' }}
            />
          </Grid>
        ))}
      </Grid>
    </FormGroup>
  );
};

export default GenericCheckbox;
