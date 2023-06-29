import React, { useCallback, useEffect } from 'react';
import { Typography, Grid, TextField, FormControlLabel, Radio } from '@mui/material';
import GenericCheckbox from 'src/components/generic-checkbox';
import { StyledRadioGroup, StyledTextarea } from 'src/components/styled-components';
import { useFormik } from 'formik';
import * as yup from 'yup';

const ApplyPage8 = React.memo(({pageValues, onChangePageValues, performValidation}) => {

  const validationSchema = yup.object().shape({
    startupPitchDeck: yup
      .string()
      .url('Invalid Pitch Deck Link')
      .required('Please share your pitch deck'),
    startupVideo: yup.string().url('Invalid video Link').required('Please share a 2 minutes video'),
    whatConvincedYouToApply: yup.string().required('Please share your motivation'),
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
    onChangePageValues(formik.values, 8);
  }, [formik, onChangePageValues]);

  useEffect(() => {
    if (performValidation){
      formik.handleSubmit();
    }
  }, [performValidation]);

  return (
    <Grid container spacing={2} marginBottom={2}>
      <Grid item xs={12} sm={12}>
        <Typography variant="h1"> RE-RENDER {(Math.random() * 100).toFixed()} </Typography>
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
          onBlur={handleInputOnBlur}
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
          onBlur={handleInputOnBlur}
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
          onBlur={handleInputOnBlur}
          onChange={handleInputChange}
          error={formik.touched.whatConvincedYouToApply && formik.errors.whatConvincedYouToApply}
        />
        {formik.touched.whatConvincedYouToApply && formik.errors.whatConvincedYouToApply && (
          <Typography variant="caption" color="error" sx={{ marginLeft: 2 }}>
            {formik.errors.whatConvincedYouToApply}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
});

export default ApplyPage8;
