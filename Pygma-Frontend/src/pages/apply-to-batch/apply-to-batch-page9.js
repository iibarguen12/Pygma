import React, { useCallback, useEffect, useRef } from 'react';
import { Typography, Grid, TextField, FormControlLabel, Radio } from '@mui/material';
import GenericCheckbox from 'src/components/generic-checkbox';
import { StyledRadioGroup, StyledTextarea } from 'src/components/styled-components';
import { useFormik } from 'formik';
import * as yup from 'yup';

const ApplyPage9 = React.memo(({pageValues, onChangePageValues, performValidation}) => {

  const prevValuesRef = useRef(pageValues);

  const validationSchema = yup.object().shape({
    someoneEncourageYouToApply: yup.string().required('Please select an option'),
    howDidYouHearAboutUs: yup
      .array()
      .min(1, 'Please select at least one option.')
      .max(7, 'Please select all that matches.'),
    confirmForm: yup.array().min(1, 'You have to check this to submit the form.'),
  });

  const formik = useFormik({
    initialValues: pageValues,
    validationSchema,
  });

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
  }, []);

  useEffect(() => {
    if (prevValuesRef.current !== formik.values) {
      onChangePageValues(formik.values);
      prevValuesRef.current = formik.values;
    }
  }, [formik.values, onChangePageValues]);

  useEffect(() => {
    if (performValidation){
      formik.handleSubmit();
    }
  }, [performValidation]);

  return (
    <Grid container spacing={2} marginBottom={2}>
      <Grid item xs={12} sm={12}>
        <Typography variant="h5" gutterBottom textAlign="justify" sx={{ marginTop: 2 }}>
          Share the last details
        </Typography>
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
          ceiling={7}
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
            ceiling={1}
            formik={formik}
            fieldName="confirmForm"
            options={['Yes']}
            selectedOptions={formik.values.confirmForm}
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
});

export default ApplyPage9;
