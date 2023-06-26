import React, { useCallback, useEffect, useRef }  from 'react';
import { Typography, Grid, Slider } from '@mui/material';
import GenericCheckbox from 'src/components/generic-checkbox';
import { StyledTextarea } from 'src/components/styled-components';
import { useFormik } from 'formik';
import * as yup from 'yup';

const ApplyPage4 = React.memo(({pageValues, onChangePageValues}) => {

  const prevValuesRef = useRef(pageValues);

  const validationSchema = yup.object().shape({
    startupNeeds: yup
      .array()
      .min(1, 'Please select at least one option.')
      .max(2, 'Please select up to two options.'),
    startupExpectations: yup.string().required('Please share your expectations'),
    startupCoFounders: yup.string().required('Co-founders are required'),
    startupHowMeetCoFounders: yup
      .string()
      .required('Please tell us how you met them'),
    startupHowBigTeam: yup.string().required('Team length is required'),
  });

  const formik = useFormik({
    initialValues: pageValues,
    validationSchema,
  });

  const handleSliderStartupCoFounders = useCallback((event, value) => {
    formik.setFieldValue('startupCoFounders', value);
  }, [formik]);

  const startupHowBigTeamValueToLabelMap = {
    1: '1-5',
    2: '5-10',
    3: 'More than 10',
  };

  const handleSliderStartupHowBigTeam = useCallback((event, value) => {
    const label = startupHowBigTeamValueToLabelMap[value] || '';
    formik.setFieldValue('startupHowBigTeam', label);
  }, [formik]);

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
  }, []);

  useEffect(() => {
    if (prevValuesRef.current !== formik.values) {
      onChangePageValues(formik.values, 4);
      prevValuesRef.current = formik.values;
    }
  }, [formik.values, onChangePageValues]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12}>
        <Typography variant="h1"> RE-RENDER {(Math.random() * 100).toFixed()} </Typography>
        <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginTop: 5 }}>
          What do you need help with the most?
        </Typography>
        <Typography variant="body2" gutterBottom textAlign="justify" sx={{ color: 'grey' }}>
          * You can only select up to 3.
        </Typography>
        <GenericCheckbox
          ceiling={3}
          formik={formik}
          fieldName='startupNeeds'
          options={[
            'Getting Product-Market fit',
            'Fundraising for your Startup',
            'Developing a Product Strategy',
            'Developing a go-to market strategy',
            'E-Growing the team',
            'Getting support from our network',
          ]}
          selectedOptions={formik.values.startupNeeds}
          onBlur={formik.startupNeeds}
          error={formik.touched.startupNeeds && formik.errors.startupNeeds}
        />
        {formik.touched.startupNeeds && formik.errors.startupNeeds && (
          <Typography variant="caption" color="error" sx={{ marginLeft: 2 }}>
            {formik.errors.startupNeeds}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginTop: 2 }}>
          What are your expectations from Pygma?
        </Typography>
        <StyledTextarea
          minRows={4}
          placeholder="What are you looking for..."
          label=""
          name="startupExpectations"
          margin="normal"
          value={formik.values.startupExpectations}
          onBlur={formik.handleBlur}
          onChange={handleInputChange}
          error={formik.touched.startupExpectations && formik.errors.startupExpectations}
        />
        {formik.touched.startupExpectations && formik.errors.startupExpectations && (
          <Typography variant="caption" color="error" sx={{ marginLeft: 2 }}>
            {formik.errors.startupExpectations}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginTop: 1 }}>
          How many co-founders are in your team (including yourself)?
        </Typography>
        <Typography variant="body2" gutterBottom textAlign="justify" color="grey" sx={{ marginLeft: 2 }}>
          Remember you must have at least one co-founder, and preferably someone in your co-founder team, to take the CTO role. Max. 5 co-founders.
        </Typography>
        <Slider
          onChange={handleSliderStartupCoFounders}
          error={formik.touched.startupCoFounders && formik.errors.startupCoFounders}
          valueLabelDisplay="auto"
          step={1}
          marks={[
            { value: 2, label: '2' },
            { value: 3, label: '3' },
            { value: 4, label: '4' },
            { value: 5, label: '5' },
          ]}
          min={2}
          max={5}
        />
        {formik.touched.startupCoFounders && formik.errors.startupCoFounders && (
          <Typography variant="caption" color="error" sx={{ marginLeft: 2 }}>
            {formik.errors.startupCoFounders}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginTop: 2 }}>
          How did you meet your co-founders?
        </Typography>
        <StyledTextarea
          minRows={4}
          placeholder="Tell us your story..."
          label=""
          name="startupHowMeetCoFounders"
          margin="normal"
          value={formik.values.startupHowMeetCoFounders}
          onBlur={formik.handleBlur}
          onChange={handleInputChange}
          error={formik.touched.startupHowMeetCoFounders && formik.errors.startupHowMeetCoFounders}
        />
        {formik.touched.startupHowMeetCoFounders && formik.errors.startupHowMeetCoFounders && (
          <Typography variant="caption" color="error" sx={{ marginLeft: 2 }}>
            {formik.errors.startupHowMeetCoFounders}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginTop: 1 }}>
          How big is your team besides your co-founders?
        </Typography>
        <Typography variant="body2" gutterBottom textAlign="justify" color="grey" sx={{ marginLeft: 2 }}>
          This could be employees, associates with little equity or advisors.
        </Typography>
        <Slider
          onChange={handleSliderStartupHowBigTeam}
          error={formik.touched.startupHowBigTeam && formik.errors.startupHowBigTeam}
          valueLabelDisplay="auto"
          step={1}
          marks={[
            { value: 1, label: '1-5' },
            { value: 2, label: '5-10' },
            { value: 3, label: 'More than 10' },
          ]}
          min={1}
          max={3}
        />
        {formik.touched.startupHowBigTeam && formik.errors.startupHowBigTeam && (
          <Typography variant="caption" color="error" sx={{ marginLeft: 2 }}>
            {formik.errors.startupHowBigTeam}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
});

export default ApplyPage4;
