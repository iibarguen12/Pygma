import React, { useCallback, useRef, useEffect } from 'react';
import { Typography, Grid } from '@mui/material';
import GenericCheckbox from 'src/components/generic-checkbox';
import { useFormik } from 'formik';
import * as yup from 'yup';

const ApplyPage2 = React.memo(({pageValues, onChangePageValues, performValidation}) => {

  const prevValuesRef = useRef(pageValues);

  const validationSchema = yup.object().shape({
    topThreeSkills: yup
      .array()
      .min(1, 'Please select at least one skill.')
      .max(3, 'Please select up to three skills.'),
    topThreeExperiences: yup
      .array()
      .min(1, 'Please select at least one experience.')
      .max(3, 'Please select up to three experiences.'),
  });

  const formik = useFormik({
    initialValues: pageValues,
    validationSchema,
  });

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
    <>
      <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginTop: 4 }}>
        Please select your top three skills
      </Typography>
      <Typography variant="body2" gutterBottom textAlign="justify" sx={{ color: 'grey' }}>
        * You can only select up to 3 skills.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <GenericCheckbox
            ceiling={3}
            formik={formik}
            fieldName='topThreeSkills'
            options={[
              'Business Development',
              'Design',
              'Finance',
              'Growth/Marketing',
              'Human Resources',
              'Leadership',
              'Legal',
              'Operations',
              'Product Management',
              'Sales',
              'Software/Web Development',
              'Strategy',
              'Other',
            ]}
            selectedOptions={formik.values.topThreeSkills}
            onBlur={formik.topThreeSkills}
            error={formik.touched.topThreeSkills && formik.errors.topThreeSkills}
          />
          {formik.touched.topThreeSkills && formik.errors.topThreeSkills && (
            <Typography variant="caption" color="error" sx={{ marginLeft: 2 }}>
              {formik.errors.topThreeSkills}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginTop: 5 }}>
        On what industries do you have experience on?
      </Typography>
      <Typography variant="body2" gutterBottom textAlign="justify" sx={{ color: 'grey' }}>
        * You can only select up to 3 experiences.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <GenericCheckbox
            ceiling={3}
            formik={formik}
            fieldName='topThreeExperiences'
            options={[
              'Advertisement',
              'Asset Management',
              'Beauty',
              'Blockchains / Crypto',
              'E-commerce',
              'Fashion',
              'Finance',
              'Gaming',
              'Government / Politics',
              'Hardware',
              'Insurance',
              'Logistics',
              'Marketing',
              'Mobility',
              'Real Estate',
              'Recruiting',
              'Retail',
              'Services',
              'Software/Web Development',
              'Social Media',
              'Tourism',
              'Venture',
              'Web 3',
              'Other',
            ]}
            selectedOptions={formik.values.topThreeExperiences}
            onBlur={formik.topThreeExperiences}
            error={formik.touched.topThreeExperiences && formik.errors.topThreeExperiences}
          />
          {formik.touched.topThreeExperiences && formik.errors.topThreeExperiences && (
            <Typography variant="caption" color="error" sx={{ marginLeft: 2 }}>
              {formik.errors.topThreeExperiences}
            </Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
});

export default ApplyPage2;
