import { useState, useEffect } from 'react';
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
import { Avatar, TableHead, Typography, CircularProgress, Select, MenuItem } from '@mui/material';
import { GetProjectIssues } from '../API/GetProjectIssues';
import { ReadIssueDto } from '../../Types/ReadIssuesDto';
import { ReadEmployeeDto } from '../../Types/ReadEmployeeDto';
import { GetProjectEmployees } from '../API/GetProjectEmployees';
import TempGetCurrentUser from '../../Connection/API/TempGetCurretnUser';
import { ChangeTaskStatus } from '../../Connection/API/ChangeTaskStatus';
import DataPostSnackbar from '../../Connection/Notifies/DataPostSnackbar';
import React from 'react';
import FilterIssuesByUser from './EventListeners/FilterIssuesByUser';
import IssuesListFilter from './IssuesListFilter';
import FilterIssuesByStatus from './EventListeners/FilterIssuesByStatus';
import FilterIssuesByPriority from './EventListeners/FilterIssuesByPriority';

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

const statusString: {[key: string]: string} = {
  "NewIssue": "⬜ New Issue",
  "InProgress": "🟦 In Progress",
  "OnHold": "🟪 On Hold",
  "IssueDone": "🟩 Issue Done",
  default: "⬛ Can't load status"
}

const statusNumber: {[key: string]: number} = {
  "NewIssue": 1,
  "InProgress": 2,
  "OnHold": 3,
  "IssueDone": 4
}

const priorityString: {[key: string]: string} = {
  "High": "🔴 High",
  "Medium": "🔵 Normal",
  "Low": "🟢 Low",
  default: "⚫ Error"
}

export default function PreviewIssuesTable({projectId, reloadCondition}: {projectId: string, reloadCondition: boolean}) 
{
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(9);

  const [sendingState, setSendingState] = useState<boolean>(false);
  const [sendSucess, setSendSucess] = useState<number>(0);
  const [projectIssues, setProjectIssues] = useState<ReadIssueDto[]>([]);
  const [projectEmployees, setProjectEmployees] = useState<ReadEmployeeDto[]>([]);

  const [currentUserEmail, setCurrentUserEmail] = useState<string>("");

  //Filtering States
  const [selectedIssuesGroup, setSelectedIssuesGroup] = useState<string>(() => {
    const storedGroup = sessionStorage.getItem('issuesOptions');
    return storedGroup ? storedGroup : 'project';
  });
  const [selectedStatus, setSelectedStatus] = useState<string>(() => {
    const storedStatus = sessionStorage.getItem('statusOptions');
    return storedStatus ? storedStatus : 'default';
  });
  const [selectedPriority, setSelectedPriority] = useState<string>(() => {
    const storedPriority = sessionStorage.getItem('priorityOptions');
    return storedPriority ? storedPriority : 'default';
  });

  useEffect(() => {
      GetProjectIssues(projectId, setProjectIssues, setSendingState, setSendSucess);
      GetProjectEmployees(projectId, setProjectEmployees);
      TempGetCurrentUser(setCurrentUserEmail);

      //TODO: Merge these functions, into a single, generic one
      const byUserEventListener = FilterIssuesByUser(selectedIssuesGroup, setSelectedIssuesGroup);
      const byStatusEventListener = FilterIssuesByStatus(selectedStatus, setSelectedStatus);
      const byPriorityEventListener = FilterIssuesByPriority(selectedPriority, setSelectedPriority);
      console.log("selectedIssuesGroup: " + selectedIssuesGroup + " | selectedStatus: " + selectedStatus + " | selectedPriority: " + selectedPriority);

      return () => {
          window.removeEventListener('storage', byUserEventListener);
          window.removeEventListener('storage', byStatusEventListener);
          window.removeEventListener('storage', byPriorityEventListener);
      };
      
  }, [reloadCondition, selectedIssuesGroup, selectedPriority, selectedStatus, sendSucess]);

  if(sendingState)
    return(<CircularProgress size="5rem" sx={{mt: "13rem"}}/>);

  if(projectEmployees.length == 0)
    return(<></>);

  // Avoids a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - projectIssues.length) : 0;

  //////Default unchanged MUI table configuration
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
  //Default unchanged MUI table configuration//////

  return (
    <TableContainer elevation={0} component={Paper}>

      {sendingState == false && sendSucess == 1 ? <DataPostSnackbar TextIndex={1} IsDangerSnackBar={false}/> : <></>}
      {sendingState == false && sendSucess == 2 ? <DataPostSnackbar TextIndex={0} IsDangerSnackBar={true}/> : <></>}

      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Assigned to</TableCell>
            <TableCell align="right">Priority</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? projectIssues.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : projectIssues
          ).map((issue) => (
            
            IssuesListFilter(issue, currentUserEmail, projectEmployees)

            ?
            <TableRow key={issue.projectIssueId}>
            <TableCell component="th" scope="row">
              {issue.projectIssueId}
            </TableCell>
            <TableCell component="th" scope="row">
              {issue.name}
            </TableCell>
            <TableCell style={{ width: 160 }} align="left">
              <Select 
              sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
              defaultValue={statusNumber[issue.status]}
              onChange={(event) => {ChangeTaskStatus(issue.id, event.target.value, setSendingState, setSendSucess)}}
              >
                <MenuItem key={1} value={1}>{statusString["NewIssue"]}</MenuItem>
                <MenuItem key={2} value={2}>{statusString["InProgress"]}</MenuItem>
                <MenuItem key={3} value={3}>{statusString["OnHold"]}</MenuItem>
                <MenuItem key={4} value={4}>{statusString["IssueDone"]}</MenuItem>
              </Select>
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              <Box display={'flex'} flexDirection={'row'}>
                  <Avatar alt="?" src={projectEmployees.find(employee => employee.id == issue.employeeId)?.avatar} sx={{width: "2rem", height: "2rem"}}/> 
                  <Typography sx={{alignSelf: "center", ml: "1rem"}}>
                      {
                      projectEmployees.find(employee => employee.id == issue.employeeId)?.firstName
                      + " " +
                      projectEmployees.find(employee => employee.id == issue.employeeId)?.lastName
                      }
                  </Typography>
              </Box>
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              {priorityString[issue.priority]}
            </TableCell>
          </TableRow>

          :

          <></>      

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
              count={projectIssues.length}
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