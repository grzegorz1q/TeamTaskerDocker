import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Avatar, Typography } from '@mui/material';
import { TempNotificationDto } from '../../Types/TempNotificationDto';
import TempGetNotifications from '../../Connection/API/TempGetNotifications';
import dayjs from 'dayjs';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function createData(topic: string, status: string, fromWho: string, receiveDate: string) {
  return {topic, status, fromWho, receiveDate };
}

const rows = [
  createData("User 'Test Testowy' has commented on your issue", "🔵", "1", "20 march - 10:00"),
  createData('There is something with this code...', "🔵", "", "18 march - 15:30"),
  createData("Don't forget about the friday meeting", "", "", "17 march - 14:30"),
  createData("A new task has been assigned to you by 'Project Manager'.", "", "1", "15 march - 12:30"),
  createData("Your password reset request has been successfully processed.", "", "1", "14 march - 11:30")

];

export default function PreviewNotificationsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(9);

  const [notifications, setNotifications] = React.useState<TempNotificationDto[]>([]);

  React.useEffect(() => {
    TempGetNotifications(setNotifications);
  }, []);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    console.log(event);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer elevation={0} component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableBody>
          {(rowsPerPage > 0
            ? notifications.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : notifications
          ).map((notification) => (
            <TableRow key={notification.id}>
              <TableCell component="th" scope="row">
                <Typography fontSize={16} fontWeight={500}>
                    {notification.content}
                </Typography>
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {""}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                <Box display={'flex'} flexDirection={'row'}>
                    {true ? 
                    <>
                        <Avatar alt="Cindy Baker" src="" sx={{width: "2rem", height: "2rem"}}/> 
                        <Typography sx={{alignSelf: "center", ml: "1rem"}}>
                            System
                        </Typography>
                    </> 
                    : 
                    <>
                        <Avatar alt="Cindy Baker" src="https://mui.com/static/images/avatar/1.jpg" sx={{width: "2rem", height: "2rem"}}/> 
                            <Typography sx={{alignSelf: "center", ml: "1rem"}}>
                            Test&nbsp;Testowy
                        </Typography>
                    </>}
                </Box>
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                <Typography fontSize={15} sx={{fontStyle: "italic"}}>
                    {dayjs(notification.created).format('DD MMMM HH:mm')}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={5}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}