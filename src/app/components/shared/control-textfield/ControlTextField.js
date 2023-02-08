import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { FormControl, TextField } from "@mui/material";

const ControlTextField = ({
  control,
  name,
  label,
  isRequired,
  maxLength,
  helperText,
  error,
}) => {
  const rules = { required: isRequired };
  if (maxLength) {
    rules.maxLength = maxLength;
  }

  const isTextarea = maxLength > 1000;

  return (
    <FormControl fullWidth sx={{ mb: "20px" }}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            size="medium"
            required={isRequired}
            error={Boolean(error)}
            helperText={
              error?.type === "maxLength"
                ? `Maximum length is ${maxLength} symbols.`
                : helperText
            }
            multiline={isTextarea}
            minRows={isTextarea ? 4 : undefined}
            maxRows={isTextarea ? 10 : undefined}
          />
        )}
      />
    </FormControl>
  );
};

export default ControlTextField;

ControlTextField.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  maxLength: PropTypes.number,
  helperText: PropTypes.string,
  error: PropTypes.object,
};

ControlTextField.defaultProps = {
  label: "",
  helperText: "",
  error: null,
};
