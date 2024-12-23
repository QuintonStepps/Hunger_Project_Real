import React from 'react';
import { Box, TextField, Select, MenuItem } from '@mui/material';

export default function SearchControls({ searchQuery, setSearchQuery, sortField, setSortField }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ flexGrow: 1 }}
      />
      <Select
        value={sortField}
        onChange={(e) => setSortField(e.target.value)}
        sx={{ marginLeft: '20px', minWidth: '150px' }}
      >
        <MenuItem value="year">Sort by Year</MenuItem>
        <MenuItem value="city">Sort by City</MenuItem>
        <MenuItem value="country">Sort by Country</MenuItem>
      </Select>
    </Box>
  );
}
