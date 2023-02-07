import { FormControl, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const ControlTextField = ({
  control,
  name,
  label,
  isRequired,
  maxLength,
  helperText = "",
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
