import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)({
  boxShadow: 'none',
  textTransform: 'none',
  backgroundColor: '#909196',
  borderRadius: '4px',
});

const AutocompleteField = React.forwardRef(
  ({ name, error, disabled, placeholder, options, onBlur, defaultValue }, ref) => {
    return (
      <Autocomplete
        options={options}
        onBlur={onBlur}
        disabled={disabled}
        defaultValue={defaultValue}
        renderInput={(params) => (
          <StyledTextField
            {...params}
            name={name}
            error={error}
            placeholder={placeholder}
            variant="outlined"
            size="small"
            fullWidth
            autoComplete="off"
            inputRef={ref}
          />
        )}
      />
    );
  }
);

export default AutocompleteField;
