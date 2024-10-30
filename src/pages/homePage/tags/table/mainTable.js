import './style.scss';
import hash from '../../../../assets/images/Hashtag.svg';
import arrow from '../../../../assets/images/arrDownSVG.svg';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as React from 'react';
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
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import deleted from '../../../../assets/images/deleteTag.png';
import edit from '../../../../assets/images/editTag.svg';
import { useSelector, useDispatch } from 'react-redux';

export function createData(name, data, members, subscribers) {
  return {
    name,
    data,
    members,
    subscribers,
  };
}

export const rows = [
  createData('customer', '1 day ago', 3, 27),
  createData('passive', '1 day ago', 1, 57),
  createData('active', '1 day ago', 15, 97),
  createData('user', '1 day ago', 3, 1123),
  createData('important', '1 day ago', 3.7, 67),
  createData('general', '1 day ago', 3.7, 67),
];
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
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Tag name',
  },
  {
    id: 'created',
    numeric: true,
    disablePadding: false,
    label: 'Created',
  },
  {
    id: 'members',
    numeric: true,
    disablePadding: false,
    label: 'Members',
  },
  {
    id: 'subs',
    numeric: true,
    disablePadding: false,
    label: 'Subscribers',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            style={{ padding: '0', alignItems: 'center' }}
            key={headCell.id}
            align={'left'}
            paddingLeft={'10px'}
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={{ alignItems: 'baseline!important' }}>
              <span>{headCell.label}</span>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
            <img src={arrow} style={{}} />
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

function EnhancedTableToolbar(props) {
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
      }}>
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable(props) {
  const { rowTag } = props;

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(18);
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const handleRemoveTag = () => {
    setIsOpenModal(false);
    visibleRows.pop();
  };

  useEffect(() => {}, [props.rowTag]);

  const [show, setShow] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rowTag.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowTag.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rowTag, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, rowTag],
  );

  const handleRowHover = (event, rowIndex) => setHoveredIndex(rowIndex);
  const handleRowHoverLeave = (event, rowIndex) => setHoveredIndex(null);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rowTag.length}
            />
            <TableBody sx={{ cursor: 'pointer', position: 'relative' }}>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    className={'tableRow'}
                    onMouseEnter={(e) => handleRowHover(e, index)}
                    onMouseLeave={(e) => handleRowHoverLeave(e, index)}
                    onClick={(event) => handleClick(event, row.name)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                    sx={
                      index % 2 !== 0
                        ? { background: `#F7F7F7`, cursor: 'pointer', position: 'relative' }
                        : null
                    }>
                    <TableCell padding="checkbox" sx={{ borderBottom: 'none' }}></TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                        height: '55.2px',
                        borderBottom: 'none',
                      }}>
                      <img
                        src={hash}
                        style={{ width: '24px', height: '24px', marginRight: '10px' }}
                        alt="hash-table"
                      />
                      <Link
                        style={{
                          fontFamily: 'MacpawFixelMedium',
                          fontSize: '14px',
                          textDecoration: 'none',
                          color: '#2A2B3B',
                        }}
                        to={`/tags/${row.name}`}>
                        {row.name}
                      </Link>
                      <div
                        id="buttons"
                        style={
                          index == hoveredIndex
                            ? { display: 'flex', position: 'absolute', right: '10%' }
                            : { display: 'none' }
                        }
                        className="button-wrapper">
                        <img
                          onClick={(e) => {
                            setIsOpenModal(true);
                          }}
                          src={deleted}
                          style={{ width: '32px', height: '32px', marginRight: '10px' }}
                        />
                        <img src={edit} style={{ width: '32px', height: '32px' }} />
                      </div>
                    </TableCell>
                    <TableCell sx={{ borderBottom: 'none' }} align="left">
                      <span style={{ fontFamily: 'MacpawFixelMedium', fontSize: '14px' }}>
                        {row.data}
                      </span>
                    </TableCell>
                    <TableCell sx={{ borderBottom: 'none' }} align="left">
                      <span style={{ fontFamily: 'MacpawFixelMedium', fontSize: '14px' }}>
                        {row.members}
                      </span>
                    </TableCell>
                    <TableCell sx={{ borderBottom: 'none' }} align="left">
                      <span style={{ fontFamily: 'MacpawFixelMedium', fontSize: '14px' }}>
                        {row.subscribers}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                  className={show ? 'cellStyle' : ''}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <div className={isOpenModal ? 'modal-delete-tag' : 'modal-hide'}>
        <div className="modal-window-tag">
          <h1 className="modal-tag-title">Are you sure you want to delete this tag?</h1>
          <span>This will disconnect all the contacts in the tag from it</span>
          <div className="btns-tag">
            <button
              className="btn1"
              onClick={() => {
                setIsOpenModal(false);
              }}>
              <span>Cancel</span>
            </button>
            <button className="btn2" onClick={handleRemoveTag}>
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </Box>
  );
}
