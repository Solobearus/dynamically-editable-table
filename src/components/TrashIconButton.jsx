import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledIconButton = styled(IconButton)({
  color: '#613f3f',
  '&:hover': {
    color: '#ba6767',
  },
});

const TrashIconButton = ({ handleClick }) => {
  return (
    <StyledIconButton aria-label="delete" size="large" onClick={handleClick}>
      <DeleteIcon fontSize="inherit" />
    </StyledIconButton>
  );
};

// TODO: Implement passed props
TrashIconButton.defaultProps = {
  handleClick: () => {},
};

export default TrashIconButton;
