import React from 'react';
import { Typography, Grid, TextField } from '@mui/material';
import { StyledTextarea } from 'src/components/styled-components';

const ApplyPage1 = React.memo(({ formik, countryOptions }) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
  };

  return (
    <>
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
            onBlur={formik.handleBlur}
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
            onBlur={formik.handleBlur}
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
            onBlur={formik.handleBlur}
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
            onBlur={formik.handleBlur}
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
            onBlur={formik.handleBlur}
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
            onBlur={formik.handleBlur}
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
            onBlur={formik.handleBlur}
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
