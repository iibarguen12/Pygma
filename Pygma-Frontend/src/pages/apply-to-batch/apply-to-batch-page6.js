import React from 'react';
import { Grid, Typography, TextField, Radio, FormControlLabel } from '@mui/material';
import GenericCheckbox from 'src/components/generic-checkbox';
import { StyledRadioGroup, StyledTextarea } from 'src/components/styled-components';

const ApplyPage6 = ({ formik, handleStartupCustomerSegment, legalStructureOptions }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12}>
        <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginTop: 3 }}>
          What is your customer segment?
        </Typography>
        <Typography variant="body2" gutterBottom textAlign="justify" sx={{ color: 'grey' }}>
          * You can only select up to 2.
        </Typography>
        <GenericCheckbox
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
          onChange={handleStartupCustomerSegment}
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
          onChange={formik.handleChange}
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
          onChange={formik.handleChange}
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
          onChange={formik.handleChange}
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
          onChange={formik.handleChange}
          error={formik.touched.startupSpendMoneyPerMonth && formik.errors.startupSpendMoneyPerMonth}
          helperText={formik.touched.startupSpendMoneyPerMonth && formik.errors.startupSpendMoneyPerMonth}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginTop: 1 }}>
          Biggest challenge about your business model?
        </Typography>
        <StyledTextarea
          minRows={4}
          placeholder="Please share your biggest challenge"
          label=""
          name="startupBiggestChallenge"
          margin="normal"
          value={formik.values.startupBiggestChallenge}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.startupBiggestChallenge && formik.errors.startupBiggestChallenge}
        />
        {formik.touched.startupBiggestChallenge && formik.errors.startupBiggestChallenge && (
          <Typography variant="caption" color="error" sx={{ marginLeft: 2 }}>
            {formik.errors.startupBiggestChallenge}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={12} sx={{ alignItems: 'center' }}>
        <Typography variant="body1" gutterBottom sx={{ marginTop: 3 }}>
          Have you incorporated or formed any legal company yet?
        </Typography>
        <StyledRadioGroup
          name="startupFormAnyLegalCompanyYet"
          margin="normal"
          value={formik.values.startupFormAnyLegalCompanyYet}
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
        {formik.touched.startupFormAnyLegalCompanyYet && formik.errors.startupFormAnyLegalCompanyYet && (
          <Typography variant="caption" color="error" sx={{ marginLeft: 2 }}>
            {formik.errors.startupFormAnyLegalCompanyYet}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginTop: 1 }}>
          What is the legal structure of your company?
        </Typography>
        <TextField
          name="startupLegalStructure"
          fullWidth
          margin="none"
          size="small"
          value={formik.values.startupLegalStructure}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.startupLegalStructure && formik.errors.startupLegalStructure}
          helperText={formik.touched.startupLegalStructure && formik.errors.startupLegalStructure}
          select
          SelectProps={{ native: true }}
        >
          {legalStructureOptions.map((option) => (
            <option key={option.key} value={option.value}>
              {option.value}
            </option>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginTop: 1 }}>
          Please describe the legal structure of your company:
        </Typography>
        <StyledTextarea
          minRows={4}
          placeholder="1)Who is in your cap table? 2)Where are you incorporated? 3)Any other relevant details."
          label=""
          name="startupLegalStructureDescription"
          margin="normal"
          value={formik.values.startupLegalStructureDescription}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.startupLegalStructureDescription && formik.errors.startupLegalStructureDescription}
        />
        {formik.touched.startupBiggestChallenge && formik.errors.startupLegalStructureDescription && (
          <Typography variant="caption" color="error" sx={{ marginLeft: 2 }}>
            {formik.errors.startupLegalStructureDescription}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default ApplyPage6;
