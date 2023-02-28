import { Box, Paper, TextField } from "@mui/material";

interface PaymentSearchProps {
    searchInput: string;
    handleSearch: (searchInput: string) => void;
}
const FilterSearch = ({ searchInput, handleSearch }: PaymentSearchProps) => {
    return (
      <Box padding={4} component={Paper}>
        <TextField
            label="Search"
            value={searchInput}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleSearch(event.target.value)
            }
            fullWidth
            margin="normal"
            variant="outlined"
      />
      </Box>
    );
  };

export default FilterSearch;