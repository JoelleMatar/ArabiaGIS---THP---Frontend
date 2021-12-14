import * as React from 'react';
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { visuallyHidden } from '@mui/utils';
import { getAllData, getImportedData, deleteAccidentData, fetchAccident } from '../../actions/data';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';
import Edit from '@mui/icons-material/Edit';
import UpdateAccident from "./UpdateAccident";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'edit',
    // numeric: false,
    // disablePadding: false,
    label: 'Actions',
  },
  {
    accident_index: 'accident_index',
    numeric: false,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'accident_severity',
    numeric: true,
    disablePadding: false,
    label: 'Severity',
  },
  {
    id: 'number_of_casualties',
    numeric: true,
    disablePadding: false,
    label: 'Casualties',
  },
  {
    id: 'number_of_vehicles',
    numeric: true,
    disablePadding: false,
    label: 'Vehicules',
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'time',
    numeric: false,
    disablePadding: false,
    label: 'Time',
  },
  {
    id: 'police_force',
    numeric: true,
    disablePadding: false,
    label: 'Police Force',
  },
  {
    id: 'road_type',
    numeric: false,
    disablePadding: false,
    label: 'Road Type',
  },
  {
    id: 'speed_limit',
    numeric: true,
    disablePadding: false,
    label: 'Speed Limit',
  },
  {
    id: 'weather_conditions',
    numeric: false,
    disablePadding: false,
    label: 'Weather Condition',
  },
  {
    id: 'did_police_officer_attend_scene_of_accident',
    numeric: true,
    disablePadding: false,
    label: 'Police Attendies',
  },
  {
    id: 'longitude',
    numeric: false,
    disablePadding: false,
    label: 'Longitude',
  },
  {
    id: 'latitude',
    numeric: true,
    disablePadding: false,
    label: 'Latitude',
  },
  {
    id: 'local_authority_district',
    numeric: false,
    disablePadding: false,
    label: 'Authority District',
  }
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Vehicule Accidents Data
        </Typography>
      )}


    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('number_of_casualties');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchText, setSearchText] = useState('');
  const [selectedAllData, setSelectedAllData] = useState(false);

  const [accidents, setAccidents] = useState([]);
  const [updated, setUpdated] = useState(false)
  const dispatch = useDispatch();

  useEffect(async () => {
    setUpdated(false)
    const accidentsData = await dispatch(getImportedData());
    setAccidents(accidentsData);
    console.log("accidents", accidents);
  }, [updated]);

  console.log("accidents", accidents);




  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = accidents.map((n) => n.accident_index);
      setSelected(newSelecteds);
      setSelectedAllData(true);
      return;
    }
    setSelected([]);
    setSelectedAllData(false);
  };

  const handleClick = (event, accident_index) => {
    const selectedIndex = selected.indexOf(accident_index);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, accident_index);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (accident_index) => selected.indexOf(accident_index) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - accidents.length) : 0;

  const [search, setSearch] = useState();

  const searchData = event => {
    // event.preventDefault();
    if (event.target.value) {
      // console.log("event.target.value",event.target.value);
      let filtered = accidents.filter(item => {
        return (
          item.accident_index.toLowerCase().includes(event.target.value.toLowerCase()) ||
          item.number_of_casualties.toLowerCase().includes(event.target.value.toLowerCase()) ||
          item.number_of_vehicles.toLowerCase().includes(event.target.value.toLowerCase()) ||
          item.accident_severity.toLowerCase().includes(event.target.value.toLowerCase()) ||
          item.date.toLowerCase().includes(event.target.value.toLowerCase()) ||
          item.time.toLowerCase().includes(event.target.value.toLowerCase()) ||
          item.police_force.toLowerCase().includes(event.target.value.toLowerCase()) ||
          item.road_type.toLowerCase().includes(event.target.value.toLowerCase()) ||
          item.speed_limit.toLowerCase().includes(event.target.value.toLowerCase()) ||
          item.weather_conditions.toLowerCase().includes(event.target.value.toLowerCase()) ||
          item.did_police_officer_attend_scene_of_accident.toLowerCase().includes(event.target.value.toLowerCase()) ||
          item.longitude.toLowerCase().includes(event.target.value.toLowerCase()) ||
          item.latitude.toLowerCase().includes(event.target.value.toLowerCase()) ||
          item.local_authority_district.toLowerCase().includes(event.target.value.toLowerCase())
        );
      });

      console.log("event value5555", event.target.value);
      setSearchText(event.target.value);
      setSearch(filtered);


    } else {
      console.log("event value", event.target.value);
      console.log('')
      setAccidents(accidents);
      setSearchText("");
    }
  };



  const deleteAccidentRow = async (accident_index) => {
    console.log("deleted row", accident_index);
    if (accidents !== undefined) {
      await dispatch(deleteAccidentData(accident_index));

      const accidentsData = await dispatch(getImportedData());
      setAccidents(accidentsData);
    }
  };

  // const [updateCol, setUpdateCol] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [accidentInfo, setAccidentInfo] = useState([]);
  const [accidentInformation, setAccidentInformation] = useState();

  const AccidentUpdateRow = (accident_index, index) => {

    console.log("acc index", accidents[index])
    console.log("acc indexxxxx", accident_index)
    // setAccident_id(accident_index);
    // const accidentInfo = await dispatch(fetchAccident(accident_index));
    setAccidentInfo(accidents[index]);
    setAccidentInformation(accidents[index]);
    setOpenUpdate(true);

    console.log("accident_index upd", accidents[index]);

  }

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleClose = () => {
    setOpenUpdate(false);
  };


  const handleChangeFrom = (event) => {
    console.log("from", event.target.value.split('-'));

    const date = event.target.value.split('-')[2] + '/' + event.target.value.split('-')[1] + '/' + event.target.value.split('-')[0];
    setFrom(date);
  }

  const handleChangeTo = (event) => {
    console.log("to", event.target.value);
    const date = event.target.value.split('-')[2] + '/' + event.target.value.split('-')[1] + '/' + event.target.value.split('-')[0];
    setTo(date);

  }

  const searchDate = () => {

    console.log("event.target.value", from, to);
    let filtered = accidents.filter(item => {
      console.log('bssgdysudgus:', new Date(item.date) >= new Date(from))
      return (
        new Date(item.date) > new Date(from) && new Date(item.date) < new Date(to)
      );
    });

    console.log("event value5555", filtered);
    setSearch(filtered);
  }

  return (
    <Box sx={{ width: '100%' }}>

      <Grid container justifyContent="center" spacing={2} sx={{marginTop: "25px"}}>
        <TextField
          id="date"
          label="From"
          type="date"
          defaultValue="2004-05-24"
          sx={{ width: 220, marginRight: '1rem' }}
          onChange={handleChangeFrom}
          className="datefrom"
        />
        <TextField
          id="date"
          label="To"
          type="date"
          defaultValue="2004-05-24"
          sx={{ width: 220 }}
          onChange={handleChangeTo}
          
        />

      </Grid>
      <Grid container justifyContent="center" sx={{ marginTop: "1rem" }}>
        <Grid item>
          <Button type="submit" color='secondary' onClick={searchDate}>Search</Button>
        </Grid>
        <Grid item>
          <Button type="submit" sx={{color: "black"}} onClick={searchData}>Cancel</Button>
        </Grid>
      </Grid>


      <UpdateAccident accidentInfo={accidentInfo && accidentInfo} open={openUpdate} close={handleClose} setaccidentInformation={setAccidentInformation} setUpdated={setUpdated} accidentInformation={accidentInformation !== undefined ? accidentInformation : ''} />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <Tooltip title="Filter list" >
          <TextField
            label="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
            value={searchText}
            sx={{ float: 'right', width: '20%', marginTop: '-50px' }}
            onChange={searchData}
          />
        </Tooltip>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={accidents !== undefined ? accidents.length : 0}
            />
            <TableBody>
              {stableSort(search !== undefined ? search : accidents !== undefined ? accidents : undefined, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.accident_index);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.accident_index)}
                      // role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.accident_index}
                      selected={isItemSelected}
                    >
                      <TableCell>
                        <Edit sx={{ cursor: "pointer", marginRight: "15px" }} onClick={() => AccidentUpdateRow(row.accident_index, index)} />
                        <DeleteIcon sx={{ cursor: "pointer" }} onClick={() => deleteAccidentRow(row.accident_index)} />

                      </TableCell>

                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.accident_index}
                      </TableCell>
                      <TableCell align="right">{row.accident_severity}</TableCell>
                      <TableCell align="right">{row.number_of_casualties}</TableCell>
                      <TableCell align="right">{row.number_of_vehicles}</TableCell>
                      <TableCell align="right">{row.date}</TableCell>
                      <TableCell align="right">{row.time}</TableCell>
                      <TableCell align="right">{row.police_force}</TableCell>
                      <TableCell align="right">{row.road_type}</TableCell>
                      <TableCell align="right">{row.speed_limit}</TableCell>
                      <TableCell align="right">{row.weather_conditions}</TableCell>
                      <TableCell align="right">{row.did_police_officer_attend_scene_of_accident}</TableCell>
                      <TableCell align="right">{row.longitude}</TableCell>
                      <TableCell align="right">{row.latitude}</TableCell>
                      <TableCell align="right">{row.local_authority_district}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[25, 50, 100]}
          component="div"
          count={accidents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
