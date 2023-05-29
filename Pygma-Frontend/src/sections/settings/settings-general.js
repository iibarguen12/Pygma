import { useCallback, useContext, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { ThemeContext } from 'src/pages/_app';

export const SettingsGeneral = () => {
  const theme = useTheme();
  const { currentTheme, setCurrentTheme } = useContext(ThemeContext);

  const [selectedOptions, setSelectedOptions] = useState({
    theme: currentTheme
  });

  useEffect(() => {
    setSelectedOptions({
      theme: currentTheme
    });
  }, [currentTheme]);

  const handleChange = (event) => {
    setSelectedOptions({
      ...selectedOptions,
      theme: event.target.value
    });
  };

  const handleSubmit = useCallback(
    (event) => {
      const { theme } = selectedOptions;
      setCurrentTheme(theme);
      event.preventDefault();
    },
    [selectedOptions, setCurrentTheme]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="Manage the site settings" title="Settings" />
        <Divider />
        <CardContent>
          <Grid container spacing={6} wrap="wrap">
            <Grid item xs={12} sm={6} md={4}>
              <Stack spacing={1}>
                <Typography variant="h6">Site theme</Typography>
                <RadioGroup
                  row
                  name="theme"
                  value={selectedOptions.theme}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="dark"
                    control={<Radio />}
                    label="Dark"
                    sx={{ marginRight: 8 }}
                  />
                  <FormControlLabel
                    value="light"
                    control={<Radio />}
                    label="Light"
                  />
                </RadioGroup>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end', marginTop: '-30px' }}>
          <Button type="submit" variant="text">
            Save
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
