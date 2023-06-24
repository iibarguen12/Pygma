import React from 'react';
import { Typography, Grid, TextField, FormControlLabel, Radio } from '@mui/material';
import GenericCheckbox from 'src/components/generic-checkbox';
import { StyledRadioGroup, StyledTextarea } from 'src/components/styled-components';

const ApplyPage7 = ({ formik }) => {
  const handleHowDidYouHearAboutUs = (selectedOptions) => {
    formik.setFieldValue('howDidYouHearAboutUs', selectedOptions);
  };

  const handleConfirmForm = (selectedOptions) => {
    formik.setFieldValue('confirmForm', selectedOptions);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
  };

  return (
    <Grid container spacing={2} marginBottom={2}>
      <Grid item xs={12} sm={12}>
        <Typography variant="h5" gutterBottom textAlign="justify" sx={{ marginTop: 2 }}>
          Share the last details
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginTop: 2 }}>
          Share a pitch deck of your company
        </Typography>
        <Typography variant="body2" gutterBottom textAlign="justify" color="grey">
          Please share your pitch deck by using a platform such as DocSend, BriefLink, Google Drive, or equivalent.
        </Typography>
        <TextField
          name="startupPitchDeck"
          placeholder="..."
          fullWidth
          margin="none"
          value={formik.values.startupPitchDeck}
          onBlur={formik.handleBlur}
          onChange={handleInputChange}
          error={formik.touched.startupPitchDeck && formik.errors.startupPitchDeck}
          helperText={formik.touched.startupPitchDeck && formik.errors.startupPitchDeck}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginTop: 2 }}>
          Upload a 2 minute video
        </Typography>
        <Typography variant="body2" gutterBottom textAlign="justify" color="grey">
          Please send a 2 min. video over a YouTube (delisted), Loom, or comparable; where you and your co-founder(s) cover the following:
        </Typography>
        <Typography variant="body2" gutterBottom textAlign="justify" color="grey">
          - Short intro of you and your experience
        </Typography>
        <Typography variant="body2" gutterBottom textAlign="justify" color="grey">
          - Short pitch about your startup
        </Typography>
        <Typography variant="body2" gutterBottom textAlign="justify" color="grey">
          - Why are you excited to build this?
        </Typography>
        <Typography variant="body2" gutterBottom textAlign="justify" color="grey">
          - Why are you excited to join Pygma?
        </Typography>
        <Typography variant="body2" gutterBottom textAlign="justify" color="grey">
          * Make sure you stay within the 2 min.
        </Typography>
        <TextField
          name="startupVideo"
          placeholder="..."
          fullWidth
          margin="none"
          value={formik.values.startupVideo}
          onBlur={formik.handleBlur}
          onChange={handleInputChange}
          error={formik.touched.startupVideo && formik.errors.startupVideo}
          helperText={formik.touched.startupVideo && formik.errors.startupVideo}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginTop: 1 }}>
          What convinced you to apply to Pygma?
        </Typography>
        <StyledTextarea
          minRows={4}
          placeholder="Please share your motivation"
          label=""
          name="whatConvincedYouToApply"
          margin="normal"
          value={formik.values.whatConvincedYouToApply}
          onBlur={formik.handleBlur}
          onChange={handleInputChange}
          error={formik.touched.whatConvincedYouToApply && formik.errors.whatConvincedYouToApply}
        />
        {formik.touched.whatConvincedYouToApply && formik.errors.whatConvincedYouToApply && (
          <Typography variant="caption" color="error" sx={{ marginLeft: 2 }}>
            {formik.errors.whatConvincedYouToApply}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={12} sx={{ alignItems: 'center' }}>
        <Typography variant="body1" gutterBottom sx={{ marginTop: 3 }}>
          Did someone encourage you to apply?
        </Typography>
        <StyledRadioGroup
          name="someoneEncourageYouToApply"
          margin="normal"
          value={formik.values.someoneEncourageYouToApply}
          onChange={formik.handleChange}
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
        {formik.touched.someoneEncourageYouToApply && formik.errors.someoneEncourageYouToApply && (
          <Typography variant="caption" color="error" sx={{ marginLeft: 2 }}>
            {formik.errors.someoneEncourageYouToApply}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginTop: 2 }}>
          If a Pygma Alumni or someone from our network referred you, please share their name
        </Typography>
        <TextField
          name="referralName"
          placeholder="..."
          fullWidth
          margin="none"
          value={formik.values.referralName}
          onBlur={formik.handleBlur}
          onChange={handleInputChange}
          error={formik.touched.referralName && formik.errors.referralName}
          helperText={formik.touched.referralName && formik.errors.referralName}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginTop: 3 }}>
          How did you hear about us?
        </Typography>
        <Typography variant="body2" gutterBottom textAlign="justify" sx={{ color: 'grey' }}>
          * Select all that matches.
        </Typography>
        <GenericCheckbox
          formik={formik}
          fieldName="howDidYouHearAboutUs"
          options={[
            'Referred by someone',
            'LinkedIn',
            'Instagram',
            'Facebook',
            'Twitter',
            'Company website',
            'Other',
          ]}
          selectedOptions={formik.values.howDidYouHearAboutUs}
          onChange={handleHowDidYouHearAboutUs}
          onBlur={formik.howDidYouHearAboutUs}
          error={formik.touched.howDidYouHearAboutUs && formik.errors.howDidYouHearAboutUs}
        />
        {formik.touched.howDidYouHearAboutUs && formik.errors.howDidYouHearAboutUs && (
          <Typography variant="caption" color="error" sx={{ marginLeft: 2 }}>
            {formik.errors.howDidYouHearAboutUs}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginTop: 2 }}>
          <strong>Confirm your submission</strong>
        </Typography>
        <Typography variant="body2" gutterBottom textAlign="justify" sx={{ color: 'grey' }}>
          * I have completed this form truthfully, and I have reviewed all of the information I shared
        </Typography>
        <Grid item xs={12} sm={12}>
          <GenericCheckbox
            formik={formik}
            fieldName="confirmForm"
            options={['Yes']}
            selectedOptions={formik.values.confirmForm}
            onChange={handleConfirmForm}
            onBlur={formik.confirmForm}
            error={formik.touched.confirmForm && formik.errors.confirmForm}
          />
          {formik.touched.confirmForm && formik.errors.confirmForm && (
            <Typography variant="caption" color="error" sx={{ marginLeft: 2 }}>
              {formik.errors.confirmForm}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ApplyPage7;
