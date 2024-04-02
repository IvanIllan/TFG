// UI components
import Grid from '@mui/material/Grid';
import Screen from './screen';
// Components
// UI components

const styles = {
  minHeight: '95vmin',
  display: 'flex',
  alignItems: 'center',
  marginLeft: "25px",
  padding: '40px 0'
};

const gardenStyles = { background: '#fafafa' };

export const Screens = ({}) => {
  return (
    <div id="garden" style={{ ...styles, ...gardenStyles }}>
      <Grid
        container
        direction="row"
        alignItems="left"
        justifyContent="left"
      >
        <Screen></Screen>
      </Grid>
    </div>
  );
};

export default Screens;