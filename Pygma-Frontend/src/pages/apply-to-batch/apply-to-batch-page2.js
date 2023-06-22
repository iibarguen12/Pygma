import React from 'react';
import { Typography, Grid } from '@mui/material';
import GenericCheckbox from 'src/components/generic-checkbox';

const ApplyPage2 = ({ formik, handleTopThreeSkillsChange, handleTopThreeExperiencesChange }) => {
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
            onChange={handleTopThreeSkillsChange}
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
            onChange={handleTopThreeExperiencesChange}
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
};

export default ApplyPage2;

