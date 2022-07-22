import {useState, useEffect} from 'react'
import { DataGrid, ruRU } from '@mui/x-data-grid';
import {REQUEST_URL} from "../../data/constants.js";

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstname', headerName: 'First name', width: 130 },
  { field: 'lastname', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Salary',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstname || ''} ${params.row.lastname || ''}`,
  },
];
/*const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];*/

export const Leads = () => {

  const [loadingLeads, setLoading] = useState(false);
  const [leadList, setLeadList] = useState([]);
  
  useEffect(() => {
    setLoading(true);
      fetch(REQUEST_URL+'leads')
      .then((response) => response.json())
      .then((data) => {
          setLoading(false);
          setLeadList( data );
      })
      .catch((err) => {
          setLoading(false);
          console.log(err);
      })
    }, [])
  
  return (
    <div>
        <h2>Leads</h2>
        <DataGrid
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            autoHeight
            rows={leadList}
            columns={columns}
            loading={loadingLeads}
            // pageSize={15}
            // rowsPerPageOptions={[5,10,15]}
            checkboxSelection
        />
    </div>
  )
}
