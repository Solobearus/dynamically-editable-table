import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import React from 'react';

const StyledTextField = styled(TextField)({
  boxShadow: 'none',
  textTransform: 'none',
  backgroundColor: '#909196',
  borderRadius: '4px',
});

const InputField = React.forwardRef(
  ({ name, defaultValue, error, disabled, placeholder, onBlur }, ref) => {
    return (
      <StyledTextField
        name={name}
        defaultValue={defaultValue}
        onBlur={onBlur}
        error={error}
        disabled={disabled}
        placeholder={placeholder}
        variant="outlined"
        size="small"
        fullWidth
        autoComplete="off"
        inputRef={ref}
        inputProps={{
          autoComplete: 'off',
        }}
      />
    );
  }
);

export default InputField;
