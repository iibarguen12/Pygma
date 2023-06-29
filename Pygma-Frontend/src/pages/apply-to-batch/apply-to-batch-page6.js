import React, { useCallback, useEffect, useRef } from 'react';
import { Grid, Typography, TextField, Radio, FormControlLabel } from '@mui/material';
import GenericCheckbox from 'src/components/generic-checkbox';
import { StyledRadioGroup, StyledTextarea } from 'src/components/styled-components';
import { useFormik } from 'formik';
import * as yup from 'yup';

const ApplyPage6 = React.memo(({pageValues, onChangePageValues, performValidation}) => {

  const prevValuesRef = useRef(pageValues);

  const validationSchema = yup.object().shape({
    startupCustomerSegment: yup
      .array()
      .min(1, 'Please select at least one option.')
      .max(2, 'Please select up to two options.'),
    startupPeopleUsingProduct: yup
      .string()
      .required('Please select if people are using your product'),
    startupActiveUsers: yup.string().required('Please share your active users'),
    startupPayingUsers: yup.string().required('Please share your paying users'),
    startupFinanciallySustainable: yup
      .string()
      .required('Please select if your startup is financially sustainable'),
    startupMakeMoneyPerMonth: yup
      .string()
      .required('Please share how much money you make per month'),
    startupSpendMoneyPerMonth: yup
      .string()
      .required('Please share how much money you spend per month'),
  });

  const formik = useFormik({
    initialValues: pageValues,
    validationSchema,
  });

  useEffect(() => {
    if (prevValuesRef.current !== formik.values) {
      onChangePageValues(formik.values, 6);
      prevValuesRef.current = formik.values;
    }
  }, [formik.values, onChangePageValues]);

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
  }, []);

  useEffect(() => {
    if (performValidation){
      formik.handleSubmit();
    }
  }, [performValidation]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12}>
        <Typography variant="h1"> RE-RENDER {(Math.random() * 100).toFixed()} </Typography>
        <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginTop: 3 }}>
          What is your customer segment?
        </Typography>
        <Typography variant="body2" gutterBottom textAlign="justify" sx={{ color: 'grey' }}>
          * You can only select up to 2.
        </Typography>
        <GenericCheckbox
          ceiling={2}
          formik={formik}
          fieldName='startupCustomerSegment'
          options={[
            'B2B',
            'B2C',
            'B2D',
            'B2G',
            'C2C',
            'B2B2C',
            'Other',
          ]}
          selectedOptions={formik.values.startupCustomerSegment}
          onBlur={formik.startupCustomerSegment}
          error={formik.touched.startupCustomerSegment && formik.errors.startupCustomerSegment}
        />
        {formik.touched.startupCustomerSegment && formik.errors.startupCustomerSegment && (
          <Typography variant="caption" color="error" sx={{ marginLeft: 2 }}>
            {formik.errors.startupCustomerSegment}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={6} sx={{ alignItems: 'center' }}>
        <Typography variant="body1" gutterBottom sx={{ marginTop: 3 }}>
          Are people using your product?
        </Typography>
        <StyledRadioGroup
          name="startupPeopleUsingProduct"
          margin="normal"
          value={formik.values.startupPeopleUsingProduct}
          onChange={handleInputChange}
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
        {formik.touched.startupPeopleUsingProduct && formik.errors.startupPeopleUsingProduct && (
          <Typography variant="caption" color="error" sx={{ marginLeft: 2 }}>
            {formik.errors.startupPeopleUsingProduct}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={6} sx={{ alignItems: 'center' }}>
        <Typography variant="body1" gutterBottom sx={{ marginTop: 3 }}>
          Are you financially sustainable?
        </Typography>
        <StyledRadioGroup
          name="startupFinanciallySustainable"
          margin="normal"
          value={formik.values.startupFinanciallySustainable}
          onChange={handleInputChange}
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
        {formik.touched.startupFinanciallySustainable && formik.errors.startupFinanciallySustainable && (
          <Typography variant="caption" color="error" sx={{ marginLeft: 2 }}>
            {formik.errors.startupFinanciallySustainable}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="How many active users do you have?"
          name="startupActiveUsers"
          fullWidth
          margin="normal"
          value={formik.values.startupActiveUsers}
          onBlur={formik.handleBlur}
          onChange={handleInputChange}
          error={formik.touched.startupActiveUsers && formik.errors.startupActiveUsers}
          helperText={formik.touched.startupActiveUsers && formik.errors.startupActiveUsers}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="How many paying users do you have?"
          name="startupPayingUsers"
          fullWidth
          margin="normal"
          value={formik.values.startupPayingUsers}
          onBlur={formik.handleBlur}
          onChange={handleInputChange}
          error={formik.touched.startupPayingUsers && formik.errors.startupPayingUsers}
          helperText={formik.touched.startupPayingUsers && formik.errors.startupPayingUsers}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="How much money do you make per month?"
          name="startupMakeMoneyPerMonth"
          fullWidth
          margin="normal"
          value={formik.values.startupMakeMoneyPerMonth}
          onBlur={formik.handleBlur}
          onChange={handleInputChange}
          error={formik.touched.startupMakeMoneyPerMonth && formik.errors.startupMakeMoneyPerMonth}
          helperText={formik.touched.startupMakeMoneyPerMonth && formik.errors.startupMakeMoneyPerMonth}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="How much money do you spend per month?"
          name="startupSpendMoneyPerMonth"
          fullWidth
          margin="normal"
          value={formik.values.startupSpendMoneyPerMonth}
          onBlur={formik.handleBlur}
          onChange={handleInputChange}
          error={formik.touched.startupSpendMoneyPerMonth && formik.errors.startupSpendMoneyPerMonth}
          helperText={formik.touched.startupSpendMoneyPerMonth && formik.errors.startupSpendMoneyPerMonth}
        />
      </Grid>
    </Grid>
  );
});

export default ApplyPage6;
