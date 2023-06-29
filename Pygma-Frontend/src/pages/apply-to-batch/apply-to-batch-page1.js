import React, { useCallback, useEffect, useMemo } from 'react';
import { Typography, Grid, TextField } from '@mui/material';
import { StyledTextarea } from 'src/components/styled-components';
import { countries } from 'country-cities';
import { useFormik } from 'formik';
import * as yup from 'yup';

const countryOptions = countries.all();

const ApplyPage1 = React.memo(({ pageValues, onChangePageValues, performValidation }) => {
  const authenticatedUser = useMemo(() => JSON.parse(window.sessionStorage.getItem('user')), []);

  const validationSchema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    country: yup.string().required('Country of Residence is required'),
    linkedIn: yup
      .string()
      .url('Invalid LinkedIn URL')
      .matches(/linkedin\.com/, 'Invalid LinkedIn URL')
      .required('LinkedIn URL is required'),
    gender: yup.string().required('Gender is required'),
    quickBio: yup
      .string()
      .required('Please write a quick bio')
      .min(100, 'Quick bio must be at least 100 characters'),
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
    onChangePageValues(formik.values, 1);
  }, [formik, onChangePageValues]);

  useEffect(() => {
    if (performValidation){
      formik.handleSubmit();
    }
  }, [performValidation]);

  return (
    <>
     <Typography variant="h1"> RE-RENDER {(Math.random() * 100).toFixed()} </Typography>
      <Typography variant="h5" gutterBottom textAlign="justify" sx={{ marginTop: 2 }}>
        Tell us about you
      </Typography>
      <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginTop: 5 }}>
        Please share your contact info *
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            name="firstName"
            fullWidth
            margin="normal"
            value={formik.values.firstName}
            onBlur={handleInputOnBlur}
            onChange={handleInputChange}
            error={formik.touched.firstName && formik.errors.firstName}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            name="lastName"
            fullWidth
            margin="normal"
            value={formik.values.lastName}
            onBlur={handleInputOnBlur}
            onChange={handleInputChange}
            error={formik.touched.lastName && formik.errors.lastName}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={formik.values.email}
            onBlur={handleInputOnBlur}
            onChange={handleInputChange}
            error={formik.touched.email && formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Country of Residence"
            name="country"
            fullWidth
            margin="normal"
            value={formik.values.country}
            onBlur={handleInputOnBlur}
            onChange={handleInputChange}
            error={formik.touched.country && formik.errors.country}
            helperText={formik.touched.country && formik.errors.country}
            select
            SelectProps={{ native: true }}
          >
            {countryOptions.map((option) => (
              <option key={option.isoCode} value={option.isoCode}>
                {option.name}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="LinkedIn Profile"
            name="linkedIn"
            fullWidth
            margin="normal"
            value={formik.values.linkedIn}
            onBlur={handleInputOnBlur}
            onChange={handleInputChange}
            error={formik.touched.linkedIn && formik.errors.linkedIn}
            helperText={formik.touched.linkedIn && formik.errors.linkedIn}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Gender"
            name="gender"
            fullWidth
            margin="normal"
            value={formik.values.gender}
            onBlur={handleInputOnBlur}
            onChange={handleInputChange}
            error={formik.touched.gender && formik.errors.gender}
            helperText={formik.touched.gender && formik.errors.gender}
            select
            SelectProps={{ native: true }}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </TextField>
        </Grid>
      </Grid>
      <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginTop: 5 }}>
        Please share a quick bio (professional background, highlights) *
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <StyledTextarea
            minRows={4}
            placeholder="Quick Bio..."
            label="Quick Bio"
            name="quickBio"
            margin="normal"
            value={formik.values.quickBio}
            onBlur={handleInputOnBlur}
            onChange={handleInputChange}
            error={formik.touched.quickBio && formik.errors.quickBio}
          />
          {formik.touched.quickBio && formik.errors.quickBio && (
            <Typography variant="caption" color="error" sx={{ marginLeft: 2 }}>
              {formik.errors.quickBio}
            </Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
});

export default ApplyPage1;
