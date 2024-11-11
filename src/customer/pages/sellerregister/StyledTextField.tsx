import {styled} from "@mui/material/styles";
import {TextField} from "@mui/material";

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.09)',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.13)',
        },
        '&.Mui-focused': {
            backgroundColor: 'rgba(255, 255, 255, 0.13)',
            boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
        }
    },
    '& .MuiOutlinedInput-input': {
        padding: '16px',
    },
    '& .MuiInputLabel-root': {
        transform: 'translate(16px, 16px) scale(1)',
        '&.Mui-focused, &.MuiFormLabel-filled': {
            transform: 'translate(16px, -9px) scale(0.75)',
        }
    }
}));

export default StyledTextField;