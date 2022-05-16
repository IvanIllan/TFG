import PropTypes from 'prop-types';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Button from '@mui/material/Button';

export const CustomAnchorLink = ({ id, title, to, active, onClickHandler, ...props }) => {
  const { color = 'primary', ...otherProps } = props;
  const headerHeight = '64';

  return (
    <AnchorLink style={{ textDecoration: 'none' }} offset={headerHeight} href={to} {...otherProps}>
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
    </AnchorLink>
  );
};

export default CustomAnchorLink;

CustomAnchorLink.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClickHandler: PropTypes.func,
  props: PropTypes.object
};

CustomAnchorLink.defaultProps = {
  onClickHandler: () => {},
  props: {}
};