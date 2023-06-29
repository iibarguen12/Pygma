import React, { useCallback, useEffect } from 'react';
import { Typography, Grid, TextField } from '@mui/material';
import { StyledTextarea, StyledRadioGroup } from 'src/components/styled-components';
import { FormControlLabel, Radio } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const ApplyPage3 = React.memo(({pageValues, onChangePageValues, performValidation}) => {

  const validationSchema = yup.object().shape({
    startupName: yup.string().required('Startup name is required'),
    startupWebsite: yup
      .string()
      .url('Invalid Website URL')
      .required('Website URL is required'),
    startupDemo: yup.string().url('Invalid Demo URL').required('Demo URL is required'),
    startupTime: yup
      .number()
      .required('Startup age is required')
      .typeError('Startup age must be a number')
      .positive('Startup age must be a positive number')
      .integer('Startup age must be an integer'),
    startupWhy: yup
      .string()
      .required('Please write your motivation')
      .min(100, 'Motivation must be at least 100 characters'),
    startupHowFar: yup.string().required('Please select your progress'),
    startupFundraising: yup.string().required('Please select an option'),
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
    onChangePageValues(formik.values, 3);
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
        Let's talk about your business
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="What is the name of your startup?"
            name="startupName"
            fullWidth
            margin="normal"
            value={formik.values.startupName}
            onBlur={handleInputOnBlur}
            onChange={handleInputChange}
            error={formik.touched.startupName && formik.errors.startupName}
            helperText={formik.touched.startupName && formik.errors.startupName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Please share the website of your startup"
            name="startupWebsite"
            fullWidth
            margin="normal"
            value={formik.values.startupWebsite}
            onBlur={handleInputOnBlur}
            onChange={handleInputChange}
            error={formik.touched.startupWebsite && formik.errors.startupWebsite}
            helperText={formik.touched.startupWebsite && formik.errors.startupWebsite}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Please share a demo of your product"
            placeholder="This demo could be a short explainer video..."
            name="startupDemo"
            fullWidth
            margin="normal"
            value={formik.values.startupDemo}
            onBlur={handleInputOnBlur}
            onChange={handleInputChange}
            error={formik.touched.startupDemo && formik.errors.startupDemo}
            helperText={formik.touched.startupDemo && formik.errors.startupDemo}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="How long have you been working on this?"
            placeholder="Please just share the number of years."
            name="startupTime"
            fullWidth
            margin="normal"
            type="number"
            value={formik.values.startupTime}
            onBlur={handleInputOnBlur}
            onChange={handleInputChange}
            error={formik.touched.startupTime && formik.errors.startupTime}
            helperText={formik.touched.startupTime && formik.errors.startupTime}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" gutterBottom textAlign="justify" sx={{ marginLeft: 2 }}>
            Why are you working on your startup?
          </Typography>
          <StyledTextarea
            minRows={4}
            placeholder="What's your motivation..."
            label=""
            name="startupWhy"
            margin="normal"
            value={formik.values.startupWhy}
            onBlur={handleInputOnBlur}
            onChange={handleInputChange}
            error={formik.touched.startupWhy && formik.errors.startupWhy}
          />
          {formik.touched.startupWhy && formik.errors.startupWhy && (
            <Typography variant="caption" color="error" sx={{ marginLeft: 2 }}>
              {formik.errors.startupWhy}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" gutterBottom textAlign="justify" sx={{ marginLeft: 2 }}>
            How far along are you?
          </Typography>
          <StyledRadioGroup
            name="startupHowFar"
            value={formik.values.startupHowFar}
            onChange={handleInputChange}
            onBlur={handleInputOnBlur}
          >
            <FormControlLabel
              value="I'm working on an idea"
              control={<Radio />}
              label="I'm working on an idea"
            />
            <FormControlLabel value="I have an MVP" control={<Radio />} label="I have an MVP" />
            <FormControlLabel
              value="I have my first customers"
              control={<Radio />}
              label="I have my first customers"
            />
            <FormControlLabel
              value="I have significant traction (users/sales/capital)"
              control={<Radio />}
              label="I have significant traction (users/sales/capital)"
            />
            <FormControlLabel
              value="I have reached Product-Market Fit"
              control={<Radio />}
              label="I have reached Product-Market Fit"
            />
            <FormControlLabel
              value="I'm at a growth stage"
              control={<Radio />}
              label="I'm at a growth stage"
            />
          </StyledRadioGroup>
          {formik.touched.startupHowFar && formik.errors.startupHowFar && (
            <Typography variant="caption" color="error" sx={{ marginLeft: 2 }}>
              {formik.errors.startupHowFar}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="How much have you raised? (If applicable)"
            name="startupHowMuchRaised"
            fullWidth
            margin="none"
            value={formik.values.startupHowMuchRaised}
            onBlur={handleInputOnBlur}
            onChange={handleInputChange}
            error={formik.touched.startupHowMuchRaised && formik.errors.startupHowMuchRaised}
            helperText={formik.touched.startupHowMuchRaised && formik.errors.startupHowMuchRaised}
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ alignItems: 'center' }}>
          <Typography variant="body2" gutterBottom sx={{ marginLeft: 2 }}>
            Are you currently fundraising?
          </Typography>
          <StyledRadioGroup
            name="startupFundraising"
            margin="normal"
            value={formik.values.startupFundraising}
            onChange={handleInputChange}
            onBlur={handleInputOnBlur}
            sx={{ display: 'flex' }}
          >
            <FormControlLabel
              value="Yes"
              control={<Radio />}
              label="Yes"
              sx={{ fontSize: '0.80rem' }}
            />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </StyledRadioGroup>
          {formik.touched.startupFundraising && formik.errors.startupFundraising && (
            <Typography variant="caption" color="error" sx={{ marginLeft: 2 }}>
              {formik.errors.startupFundraising}
            </Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
});

export default ApplyPage3;
