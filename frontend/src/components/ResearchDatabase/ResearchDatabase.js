import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Select, MenuItem, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TableSortLabel } from '@mui/material';
import SearchControls from '../SearchControls/SearchControls';
import TableRowComponent from '../TableRow/TableRow';

export default function ResearchDatabase() {
  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('year');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const sampleData = [
      {
        year: '2001',
        city: 'Quito',
        country: 'Ecuador',
        major: 'Spanish',
        themes: 'Education, History, Geography',
        author: 'Carolyn Brown',
        advisor: 'Dr. Lindy Scott',
        fileUrl: 'http://localhost:8000/hngr-isps/Brown-Carolyn-Final-ISP.pdf',
      },
      {
        year: '2021',
        city: 'Chiang Mai',
        country: 'Thailand',
        major: 'Evangelical Lutheran Christianity and Social Hierarchy',
        themes: 'Thai Village, Inc, Social Hierarchy, Evangelical Lutheran Christianity',
        author: 'Valerie Halim',
        advisor: 'Dr. Christine Jeske',
        fileUrl: 'http://localhost:8000/hngr-isps/Halim-Valerie-Final-ISP.docx',
      },
    ];
    setRows(sampleData);
  }, []);

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedRows = filteredRows.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    }
    return a[sortField] < b[sortField] ? 1 : -1;
  });

  const handleSortChange = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <Container maxWidth="md" sx={{ paddingTop: '40px' }}>
      <Typography variant="h3" sx={{ textAlign: 'center', marginBottom: '20px' }}>
        HNGR Research Database
      </Typography>
      <SearchControls
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortField={sortField}
        setSortField={setSortField}
      />
      <TableContainer component={Paper} elevation={3}>
        <Table aria-label="research table">
          <TableHead>
            <TableRow>
              {['year', 'city', 'country'].map((field) => (
                <TableCell key={field} sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                  <TableSortLabel
                    active={sortField === field}
                    direction={sortOrder}
                    onClick={() => handleSortChange(field)}
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Major/Field</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Themes</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Author</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Advisor</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', textAlign: 'center' }}>Download</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row, index) => (
              <TableRowComponent key={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
