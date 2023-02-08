import PropTypes from "prop-types";
import { Button, styled } from "@mui/material";

const RedButton = styled(Button)({
  backgroundColor: "#ba0f30",
  borderColor: "#ba0f30",
  "&:hover": {
    backgroundColor: "#d63454",
    borderColor: "#d63454",
  },
});

const StyledButton = ({ callback, children, size }) => (
  <RedButton variant="contained" onClick={callback} size={size}>
    {children}
  </RedButton>
);

export default StyledButton;

StyledButton.propTypes = {
  callback: PropTypes.func,
  children: PropTypes.node.isRequired,
  size: PropTypes.string,
};

StyledButton.defaultProps = {
  size: "medium",
};
