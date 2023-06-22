import React from 'react';
import { Typography, Grid, TextField } from '@mui/material';
import { StyledTextarea } from 'src/components/styled-components';

const ApplyPage5 = ({ formik, startupIndustryOptions, businessModelOptions }) => {
  return (
    <>
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
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
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
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
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
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
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
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
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
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
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
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
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
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
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
};

export default ApplyPage5;
