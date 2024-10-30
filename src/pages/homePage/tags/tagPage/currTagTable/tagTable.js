import './style.scss';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import MUIDataTable, { TableFilterList } from 'mui-datatables';
import deleteImg from '../../../../../assets/images/deleteTag.png';
import editImg from '../../../../../assets/images/editTag.png';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

// const CheckboxHeader = ({handleSelect}) => {
//     const [checked, setChecked] = useState(false)
//
//     return(
//         <input type="checkbox"
//                className={'custom-header-checkbox'}
//                onChange={() => {
//                    setChecked(prev => {
//                        handleSelect(!prev)
//                        return !prev
//                    })
//                }}
//                checked={checked} />
//     )
// }

const CheckboxHeader = ({ handleSelect }) => {
  const [selectAll, setSelectAll] = useState(false);
  return (
    <input
      type="checkbox"
      className={'custom-header-checkbox'}
      onChange={() => {
        setSelectAll((prevSelectAll) => !prevSelectAll);
        handleSelect(!selectAll); // Pass the updated selectAll state to the handler
      }}
      checked={selectAll}
    />
  );
};

// const testColumns = [
//     {
//         name: 'checkbox',
//         label: 'checkbox',
//         options: {
//             sort:false,
//             resizableColumn:false,
//             customHeadLabelRender:()=> <CheckboxHeader handleSelect={handleSelect} style={{padding:"5px", position:'absolute'}}/>,
//             customBodyRender: (value, tableMeta, updateValue) => {
//                 return <input
//                     type="checkbox"
//                     checked={value}
//                     onChange={() => updateValue(!value)}
//                     className={'custom-checkbox'}/>; // Custom checkbox rendering in body
//             },
//
//         },
//     },
//     {
//         name: 'email',
//         label: 'email',
//         options: {
//             sort:true,
//             customBodyRender: (value, tableMeta, updateValue) => {
//                 return <TableCell sx={{padding:"2px"}}>{value}</TableCell>
//             },
//         },
//     },
//     {
//         name: 'firstname',
//         label: 'firstname',
//         options: {
//             sort:true,
//             customBodyRender: (value, tableMeta, updateValue) => {
//                 return <TableCell sx={{padding:"2px"}}>{value}</TableCell>
//             },
//         },
//     },
//     {
//         name: 'lastname',
//         label: 'lastname',
//         options: {
//             sort:true,
//             customBodyRender: (value, tableMeta, updateValue) => {
//                 return <TableCell sx={{padding:"2px"}}>{value}</TableCell>
//             },
//         },
//     },
//     {
//         name: 'addresses',
//         label: 'addresses',
//         options: {
//             sort:true,
//             customBodyRender: (value, tableMeta, updateValue) => {
//                 return <TableCell sx={{padding:"2px"}}>{value}</TableCell>
//             },
//         },
//     },
// ];

export const UsersTable = ({
  data,
  handleSelect,
  openModal,
  columns,
  handleRowSelect,
  selectedRowIds,
}) => {
  const [currentCol, setCurrCol] = useState([]);

  useEffect(() => {
    const checkboxCol = [
      {
        name: 'checkbox',
        label: 'checkbox',
        options: {
          sort: false,
          resizableColumns: false,
          customHeadLabelRender: () => (
            <CheckboxHeader
              handleSelect={handleSelect}
              style={{ padding: '15px', position: 'absolute' }}
            />
          ),
          customBodyRender: (value, tableMeta, updateValue) => {
            const { rowIndex } = tableMeta;
            const handleUpdate = () => {
              handleRowSelect(rowIndex);
              // updateValue(!value)
            };
            return (
              <input
                type="checkbox"
                checked={selectedRowIds.includes(rowIndex)}
                onChange={handleUpdate}
                className={'custom-checkbox'}
              />
            ); // Custom checkbox rendering in body
          },
        },
      },
    ];
    const defaultCol = columns.map((item, i) => {
      return {
        name: item,
        label: item,
        options: {
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return <TableCell sx={{ padding: '2px' }}>{value}</TableCell>;
          },
        },
      };
    });
    setCurrCol([...checkboxCol, ...defaultCol]);
  }, [columns, selectedRowIds]);
  function CustomRowComponent(props) {
    const { checkbox, email, firstname, lastname, addresses, index } = props;
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const handleRowHover = (event, rowIndex) => setHoveredIndex(rowIndex);
    const handleRowHoverLeave = (event, rowIndex) => setHoveredIndex(null);
    return (
      <TableRow
        key={index}
        onMouseEnter={(e) => handleRowHover(e, index)}
        onMouseLeave={(e) => handleRowHoverLeave(e, index)}
        style={{ position: 'relative' }}>
        <TableCell>{checkbox}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{firstname}</TableCell>
        <TableCell>{lastname}</TableCell>
        <TableCell>{addresses}</TableCell>
        <td
          className={'img-box'}
          style={
            hoveredIndex === index
              ? { display: 'flex', right: '3%', top: '11%' }
              : { display: 'none' }
          }>
          <img
            src={deleteImg}
            alt={'del-img'}
            className={'del-img'}
            style={{ marginRight: '5px', zIndex: 2222 }}
            onClick={openModal}
          />
          <img src={editImg} alt={'edit-img'} />
        </td>
      </TableRow>
    );
  }

  const options = {
    filter: false,
    print: false,
    download: false,
    pagination: false,
    search: false,
    viewColumns: false,
    searchable: false,
    selectableRows: false,
    resizableColumns: true,
    rowHover: false,
    customRowRender: (rowData, index) => {
      return (
        <CustomRowComponent
          checkbox={rowData[0]}
          email={rowData[1]}
          firstname={rowData[2]}
          lastname={rowData[3]}
          addresses={rowData[4]}
          index={index}
        />
      );
    },
  };

  return (
    <MUIDataTable
      className={'container'}
      data={data}
      columns={currentCol}
      options={options}
      sx={{ boxShadow: 'none' }}
    />
  );
};
