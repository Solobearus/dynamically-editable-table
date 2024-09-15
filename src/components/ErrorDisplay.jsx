// src/components/ErrorDisplay.jsx
import React from 'react';
import { styled } from '@mui/material/styles';
import { useUserStore } from '../context/useUserStore';

const ErrorContainer = styled('div')({
  marginTop: '10px',
  color: 'red',
});

function ErrorDisplay() {
  const totalErrors = useUserStore((state) => state.totalErrors);

  return (
    <ErrorContainer>
      Errors: Empty Fields - {totalErrors.empty}, Invalid Fields - {totalErrors.invalid}
    </ErrorContainer>
  );
}

export default ErrorDisplay;
