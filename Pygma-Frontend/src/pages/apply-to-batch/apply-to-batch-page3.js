import React from 'react';
import { Typography, Grid, TextField } from '@mui/material';
import { StyledTextarea, StyledRadioGroup } from 'src/components/styled-components';
import { FormControlLabel, Radio } from '@mui/material';

const ApplyPage3 = React.memo(({ formik }) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
  };
  return (
    <>
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
            onBlur={formik.handleBlur}
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
            onBlur={formik.handleBlur}
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
            onBlur={formik.handleBlur}
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
            onBlur={formik.handleBlur}
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
            onBlur={formik.handleBlur}
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
            onBlur={formik.handleBlur}
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
