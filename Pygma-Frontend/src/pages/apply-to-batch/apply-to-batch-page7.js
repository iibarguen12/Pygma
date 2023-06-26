import React, { useCallback } from 'react';
import { Grid, Typography, TextField, Radio, FormControlLabel } from '@mui/material';
import GenericCheckbox from 'src/components/generic-checkbox';
import { StyledRadioGroup, StyledTextarea } from 'src/components/styled-components';
import { useFormik } from 'formik';
import * as yup from 'yup';

const ApplyPage7 = React.memo(({pageValues, onChangePageValues}) => {

  const validationSchema = yup.object().shape({
    startupBiggestChallenge: yup
      .string()
      .required('Please share your biggest challenge'),
    startupFormAnyLegalCompanyYet: yup
      .string()
      .required('Please select an option'),
    startupLegalStructure: yup.string().required('Please select your legal structure'),
    startupLegalStructureDescription: yup
      .string()
      .required('Please describe your legal structure'),
  });

  const formik = useFormik({
    initialValues: pageValues,
    validationSchema,
  });

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
  }, []);

  const handleInputOnBlur = useCallback((event) => {
    const { name } = event.target;
    formik.setFieldTouched(name, true);
    if (validationSchema.fields[name]) {
      formik.validateField(name);
    }
    onChangePageValues(formik.values, 7);
  }, [formik, onChangePageValues]);

  const legalStructureOptions = [
    { key: "Untitled multiple choice field", value: "Untitled multiple choice field" },
    { key: "Local legal entity", value: "Local legal entity" },
    { key: "C-Corp", value: "C-Corp" },
    { key: "LLC", value: "LLC" },
    { key: "Cayman- Island Sandwich", value: "Cayman- Island Sandwich" },
    { key: "Other", value: "Other" },
    { key: "I don't have one yet", value: "I don't have one yet" },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12}>
        <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginTop: 1 }}>
          Biggest challenge about your business model?
        </Typography>
        <StyledTextarea
          minRows={4}
          placeholder="Please share your biggest challenge"
          label=""
          name="startupBiggestChallenge"
          margin="normal"
          value={formik.values.startupBiggestChallenge}
          onBlur={handleInputOnBlur}
          onChange={handleInputChange}
          error={formik.touched.startupBiggestChallenge && formik.errors.startupBiggestChallenge}
        />
        {formik.touched.startupBiggestChallenge && formik.errors.startupBiggestChallenge && (
          <Typography variant="caption" color="error" sx={{ marginLeft: 2 }}>
            {formik.errors.startupBiggestChallenge}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={12} sx={{ alignItems: 'center' }}>
        <Typography variant="body1" gutterBottom sx={{ marginTop: 3 }}>
          Have you incorporated or formed any legal company yet?
        </Typography>
        <StyledRadioGroup
          name="startupFormAnyLegalCompanyYet"
          margin="normal"
          value={formik.values.startupFormAnyLegalCompanyYet}
          onChange={handleInputChange}
          sx={{ display: 'flex' }}
        >
          <FormControlLabel
            value="Yes"
            control={<Radio />}
            label="Yes"
            sx={{ fontSize: '0.80rem' }}
          />
          <FormControlLabel
            value="No"
            control={<Radio />}
            label="No"
          />
        </StyledRadioGroup>
        {formik.touched.startupFormAnyLegalCompanyYet && formik.errors.startupFormAnyLegalCompanyYet && (
          <Typography variant="caption" color="error" sx={{ marginLeft: 2 }}>
            {formik.errors.startupFormAnyLegalCompanyYet}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginTop: 1 }}>
          What is the legal structure of your company?
        </Typography>
        <TextField
          name="startupLegalStructure"
          fullWidth
          margin="none"
          size="small"
          value={formik.values.startupLegalStructure}
          onBlur={handleInputOnBlur}
          onChange={handleInputChange}
          error={formik.touched.startupLegalStructure && formik.errors.startupLegalStructure}
          helperText={formik.touched.startupLegalStructure && formik.errors.startupLegalStructure}
          select
          SelectProps={{ native: true }}
        >
          {legalStructureOptions.map((option) => (
            <option key={option.key} value={option.value}>
              {option.value}
            </option>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginTop: 1 }}>
          Please describe the legal structure of your company:
        </Typography>
        <StyledTextarea
          minRows={4}
          placeholder="1)Who is in your cap table? 2)Where are you incorporated? 3)Any other relevant details."
          label=""
          name="startupLegalStructureDescription"
          margin="normal"
          value={formik.values.startupLegalStructureDescription}
          onBlur={handleInputOnBlur}
          onChange={handleInputChange}
          error={formik.touched.startupLegalStructureDescription && formik.errors.startupLegalStructureDescription}
        />
        {formik.touched.startupBiggestChallenge && formik.errors.startupLegalStructureDescription && (
          <Typography variant="caption" color="error" sx={{ marginLeft: 2 }}>
            {formik.errors.startupLegalStructureDescription}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
});

export default ApplyPage7;
