import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, TextField, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, IconButton } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import DescriptionIcon from '@mui/icons-material/Description';

export default function BasicTable() {
  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("year");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    // Sample data with both PDF and DOCX URLs
    const sampleData = [
        {
          year: "2001",
          city: "Quito",
          country: "Ecuador",
          major: "Spanish",
          themes: "Education, History, Geography",
          author: "Carolyn Brown",
          advisor: "Dr. Lindy Scott",
          fileUrl: "http://localhost:8000/hngr-isps/ISP's for Josh(7)/Brown, Carolyn--Final ISP.pdf",
        },
        {
          year: "2021",
          city: "Chiang Mai",
          country: "Thailand",
          major: "Evangelical Lutheran Christianity and Social Hierarchy",
          themes: "Thai Village, Inc, Social Hierarchy, Evangelical Lutheran Christianity",
          author: "Valerie Halim",
          advisor: "Dr. Christine Jeske",
          fileUrl: "http://localhost:8000/hngr-isps/ISP's for Josh(7)/Halim, Valerie--Final ISP.docx",
        },
      ];
      

    setRows(sampleData);
  }, []);

  // Filter rows based on search query
  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Sort rows based on the selected field and order
  const sortedRows = filteredRows.sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    }
    return a[sortField] < b[sortField] ? 1 : -1;
  });

  const handleSortChange = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getFileIcon = (fileUrl) => {
    const fileExtension = fileUrl.split('.').pop().toLowerCase();
    return fileExtension === 'pdf' ? <GetAppIcon sx={{ color: 'black' }} /> : <DescriptionIcon sx={{ color: 'black' }} />;
  };

  return (
    <Container maxWidth="md" sx={{ paddingTop: '40px' }}>
      {/* Header */}
      <Typography variant="h3" sx={{ textAlign: 'center', marginBottom: '20px' }}>
        HNGR Research Database
      </Typography>

      {/* Search and Filter */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ flexGrow: 1 }}
        />

        <Select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          sx={{ marginLeft: '20px', minWidth: '150px' }}
          displayEmpty
        >
          <MenuItem value="year">Sort by Year</MenuItem>
          <MenuItem value="city">Sort by City</MenuItem>
          <MenuItem value="country">Sort by Country</MenuItem>
        </Select>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                <TableSortLabel
                  active={sortField === "year"}
                  direction={sortOrder}
                  onClick={() => handleSortChange("year")}
                >
                  Year
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                <TableSortLabel
                  active={sortField === "city"}
                  direction={sortOrder}
                  onClick={() => handleSortChange("city")}
                >
                  City
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                <TableSortLabel
                  active={sortField === "country"}
                  direction={sortOrder}
                  onClick={() => handleSortChange("country")}
                >
                  Country
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Major/Field</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Themes</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Author</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Advisor</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', textAlign: 'center' }}>Download</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.year}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell>{row.major}</TableCell>
                <TableCell>{row.themes}</TableCell>
                <TableCell>{row.author}</TableCell>
                <TableCell>{row.advisor}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <IconButton
                    href={row.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="download file"
                    color="inherit"
                  >
                    {getFileIcon(row.fileUrl)}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
