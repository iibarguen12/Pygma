import React, { useCallback, useEffect } from 'react';
import { Typography, Grid, TextField } from '@mui/material';
import { StyledTextarea } from 'src/components/styled-components';
import { useFormik } from 'formik';
import * as yup from 'yup';

const ApplyPage5 = React.memo(({pageValues, onChangePageValues, performValidation}) => {

  const validationSchema = yup.object().shape({
    startupShortBlurb: yup.string().required('Please share a short blurb'),
    startupPurpose: yup.string().required('Please share your purpose'),
    startupIndustry: yup.string().required('Please select your industry'),
    startupHowBigMarket: yup.string().required('Please share your market'),
    startupUniqueMarketInsight: yup
      .string()
      .required('Please share your unique insight'),
    startupUnfairAdvantage: yup
      .string()
      .required('Please share your unfair advantage'),
    startupBusinessModel: yup.string().required('Please select a business model'),
  });

  const formik = useFormik({
    initialValues: pageValues,
    validationSchema,
  });

  const startupIndustryOptions = [
    { key: "Advertisement", value: "Advertisement" },
    { key: "Asset Management", value: "Asset Management" },
    { key: "Crypto / Blockchain", value: "Crypto / Blockchain" },
    { key: "E-commerce", value: "E-commerce" },
    { key: "Finance", value: "Finance" },
    { key: "Gaming", value: "Gaming" },
    { key: "Government / Politics", value: "Government / Politics" },
    { key: "Hardware", value: "Hardware" },
    { key: "Human Resources", value: "Human Resources" },
    { key: "Insurance", value: "Insurance" },
    { key: "Logistics", value: "Logistics" },
    { key: "Marketing", value: "Marketing" },
    { key: "Mobility", value: "Mobility" },
    { key: "Real Estate", value: "Real Estate" },
    { key: "Recruiting", value: "Recruiting" },
    { key: "Retail", value: "Retail" },
    { key: "Software / Web Development", value: "Software / Web Development" },
    { key: "Social Media", value: "Social Media" },
    { key: "Turism", value: "Turism" },
    { key: "Venture", value: "Venture" },
    { key: "Web 3", value: "Web 3" },
    { key: "Other*", value: "Other*" }
  ];

  const businessModelOptions = [
    { key: "Ad-Based Model", value: "Ad-Based Model" },
    { key: "Broker", value: "Broker" },
    { key: "Direct sell", value: "Direct sell" },
    { key: "Enterprise", value: "Enterprise" },
    { key: "Freemium", value: "Freemium" },
    { key: "Marketplace", value: "Marketplace" },
    { key: "Membership", value: "Membership" },
    { key: "Reseller", value: "Reseller" },
    { key: "SaaS", value: "SaaS" },
    { key: "Service Model", value: "Service Model" },
    { key: "Subscription-Based Model", value: "Subscription-Based Model" },
    { key: "Transactional", value: "Transactional" },
    { key: "On-Demand", value: "On-Demand" },
    { key: "Usage-based model", value: "Usage-based model" },
  ];

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
    onChangePageValues(formik.values, 5);
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
        Tell us more about your business
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginTop: 2 }}>
            Please share a short blurb (What your company does)
          </Typography>
          <StyledTextarea
            minRows={4}
            placeholder="Try to share this in 50 characters max."
            label=""
            name="startupShortBlurb"
            margin="normal"
            value={formik.values.startupShortBlurb}
            onBlur={handleInputOnBlur}
            onChange={handleInputChange}
            error={formik.touched.startupShortBlurb && formik.errors.startupShortBlurb}
          />
          {formik.touched.startupShortBlurb && formik.errors.startupShortBlurb && (
            <Typography variant="caption" color="error" sx={{ marginLeft: 2 }}>
              {formik.errors.startupShortBlurb}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginTop: 1 }}>
            What is your company's purpose?
          </Typography>
          <StyledTextarea
            minRows={4}
            placeholder="What do you want to achieve?"
            label=""
            name="startupPurpose"
            margin="normal"
            value={formik.values.startupPurpose}
            onBlur={handleInputOnBlur}
            onChange={handleInputChange}
            error={formik.touched.startupPurpose && formik.errors.startupPurpose}
          />
          {formik.touched.startupPurpose && formik.errors.startupPurpose && (
            <Typography variant="caption" color="error" sx={{ marginLeft: 2 }}>
              {formik.errors.startupPurpose}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginTop: 1 }}>
            On what industry are you building your startup?
          </Typography>
          <TextField
            name="startupIndustry"
            fullWidth
            margin="none"
            size="small"
            value={formik.values.startupIndustry}
            onBlur={handleInputOnBlur}
            onChange={handleInputChange}
            error={formik.touched.startupIndustry && formik.errors.startupIndustry}
            helperText={formik.touched.startupIndustry && formik.errors.startupIndustry}
            select
            SelectProps={{ native: true }}
          >
            {startupIndustryOptions.map((option) => (
              <option key={option.key} value={option.value}>
                {option.value}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginTop: 2 }}>
            How big is your market? (Opportunity)
          </Typography>
          <StyledTextarea
            minRows={4}
            placeholder="Ex: Our market has a TAM of #"
            label=""
            name="startupHowBigMarket"
            margin="normal"
            value={formik.values.startupHowBigMarket}
            onBlur={handleInputOnBlur}
            onChange={handleInputChange}
            error={formik.touched.startupHowBigMarket && formik.errors.startupHowBigMarket}
          />
          {formik.touched.startupHowBigMarket && formik.errors.startupHowBigMarket && (
            <Typography variant="caption" color="error" sx={{ marginLeft: 2 }}>
              {formik.errors.startupHowBigMarket}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginTop: 1 }}>
            What unique insight do you have from your market/industry?
          </Typography>
          <StyledTextarea
            minRows={4}
            placeholder="Please share your unique insight"
            label=""
            name="startupUniqueMarketInsight"
            margin="normal"
            value={formik.values.startupUniqueMarketInsight}
            onBlur={handleInputOnBlur}
            onChange={handleInputChange}
            error={formik.touched.startupUniqueMarketInsight && formik.errors.startupUniqueMarketInsight}
          />
          {formik.touched.startupUniqueMarketInsight && formik.errors.startupUniqueMarketInsight && (
            <Typography variant="caption" color="error" sx={{ marginLeft: 2 }}>
              {formik.errors.startupUniqueMarketInsight}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginTop: 1 }}>
            What is your unfair advantage? (Why are you the right team to build this?)
          </Typography>
          <StyledTextarea
            minRows={4}
            placeholder="Please share your unfair advantage"
            label=""
            name="startupUnfairAdvantage"
            margin="normal"
            value={formik.values.startupUnfairAdvantage}
            onBlur={handleInputOnBlur}
            onChange={handleInputChange}
            error={formik.touched.startupUnfairAdvantage && formik.errors.startupUnfairAdvantage}
          />
          {formik.touched.startupUnfairAdvantage && formik.errors.startupUnfairAdvantage && (
            <Typography variant="caption" color="error" sx={{ marginLeft: 2 }}>
              {formik.errors.startupUnfairAdvantage}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginTop: 1 }}>
            What is your business model?
          </Typography>
          <TextField
            name="startupBusinessModel"
            fullWidth
            margin="none"
            size="small"
            value={formik.values.startupBusinessModel}
            onBlur={handleInputOnBlur}
            onChange={handleInputChange}
            error={formik.touched.startupBusinessModel && formik.errors.startupBusinessModel}
            helperText={formik.touched.startupBusinessModel && formik.errors.startupBusinessModel}
            select
            SelectProps={{ native: true }}
          >
            {businessModelOptions.map((option) => (
              <option key={option.key} value={option.value}>
                {option.value}
              </option>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </>
  );
});

export default ApplyPage5;
