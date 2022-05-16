import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

export const CustomLink = ({ title, to, active, onClickHandler, ...props }) => {
  const { color = 'primary', ...otherProps } = props;

  return (
    <>
      <Link style={{ textDecoration: 'none' }} to={to} {...otherProps}>
        <Button
          color={color}
          underline="none"
          size="large"
          sx={{
            fontWeight: active ? 'bold' : 'medium',
            padding: '7px 21px'
          }}
          variant={active ? 'outlined' : 'text'}
          onClick={onClickHandler}
        >
          {title}
        </Button>
      </Link>
    </>
  );
};

export default CustomLink;

CustomLink.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClickHandler: PropTypes.func,
  props: PropTypes.object
};

CustomLink.defaultProps = {
  onClickHandler: () => {},
  props: {}
};