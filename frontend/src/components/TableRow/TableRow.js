import React from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import DescriptionIcon from '@mui/icons-material/Description';

export default function TableRowComponent({ row }) {
  const getFileIcon = (fileUrl) => {
    const fileExtension = fileUrl.split('.').pop().toLowerCase();
    return fileExtension === 'pdf' ? <GetAppIcon sx={{ color: 'black' }} /> : <DescriptionIcon sx={{ color: 'black' }} />;
  };

  return (
    <TableRow>
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
  );
}
