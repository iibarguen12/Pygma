import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

const ApplyPage0 = ({ isCheckboxChecked, handleCheckboxChange }) => {
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom textAlign="justify">
        PY4 Application
      </Typography>
      <Typography variant="body1" gutterBottom textAlign="justify">
        <strong>Join PY4, a 12-week acceleration program</strong> designed to help pre-seed companies looking to
        scale their business and prepare for fundraising. We look forward to reviewing your application.
      </Typography>
      <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginY: '1rem' }}>
        <strong>*Our program starts in Summer 2023.</strong>
      </Typography>
      <Typography variant="body1" gutterBottom textAlign="justify">
        In case you have any questions,
        <Link
          href="https://program.pygma.co/"
          target="_blank"
          rel="noreferrer"
          sx={{ fontWeight: 'bold' }}
        >
          explore our program page
        </Link>
        .
      </Typography>
      <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginY: '1rem' }}>
        <strong>Remember our criteria for application:</strong>
      </Typography>
      <Typography variant="body1" paragraph textAlign="justify" sx={{ marginY: '1rem' }}>
        - You must be a tech startup founder in the ‘pre-seed’ stage.
      </Typography>
      <Typography variant="body1" paragraph textAlign="justify" sx={{ marginY: '1rem' }}>
        - You must be working full-time on your startup.
      </Typography>
      <Typography variant="body1" paragraph textAlign="justify" sx={{ marginY: '1rem' }}>
        - You must have an intermediate-advanced command of English.
      </Typography>
      <Typography variant="body1" paragraph textAlign="justify" sx={{ marginY: '1rem' }}>
        - There must be a team of founders; we encourage solo founders to find a co-founder first.
      </Typography>
      <Typography variant="body1" paragraph textAlign="justify" sx={{ marginY: '1rem' }}>
        - Within the "founding members," there must be a CTO or a technical co-founder (preferably).
      </Typography>
      <Typography variant="body1" paragraph textAlign="justify" sx={{ marginY: '1rem' }}>
        - *Applications must be completed before submission, including the video and pitch deck.*
      </Typography>
      <Typography variant="body1" gutterBottom textAlign="justify" marginTop="2rem">
        <strong>Do you understand the criteria to successfully apply to our program?</strong>
      </Typography>
      <Box display="flex" alignItems="center">
        <Checkbox
          checked={isCheckboxChecked}
          onChange={handleCheckboxChange}
          color="primary"
          sx={{ marginRight: '0.5rem' }}
        />
        <Typography variant="body1" sx={{ marginLeft: '0.5rem' }}>
          Yes*
        </Typography>
      </Box>
    </>
  );
};

export default ApplyPage0;
