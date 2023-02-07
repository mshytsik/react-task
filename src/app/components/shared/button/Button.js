import { Button, styled } from "@mui/material";

const RedButton = styled(Button)({
  backgroundColor: "#ba0f30",
  borderColor: "#ba0f30",
  "&:hover": {
    backgroundColor: "#d63454",
    borderColor: "#d63454",
  },
});

const StyledButton = ({ callback, children, size = "medium" }) => (
  <RedButton variant="contained" onClick={callback} size={size}>
    {children}
  </RedButton>
);

export default StyledButton;
