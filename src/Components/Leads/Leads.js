import {useState, useEffect, useCallback, useRef} from 'react'
import {
  ruRU,
} from '@mui/x-data-grid';
import { DataGridPro, useGridApiRef } from '@mui/x-data-grid-pro';
import { Box, LinearProgress } from '@mui/material';
import {REQUEST_URL} from "../../data/constants.js";

const MAX_ROW_LENGTH = 500;

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

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

export const Leads = () => {
    const apiRef = useGridApiRef();
    const [loadingLeads, setLoading] = useState(false);
    const [leadList, setLeadList] = useState([]);
    const [page, setPage] = useState(0);
    const mounted = useRef(true);
    /*const { data } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 20,
        maxColumns: 6,
    });*/

    /*const handleOnRowsScrollEnd = (params) => {
        setLoading(true);
        setPage(page + 1);
    };*/

    const loadServerRows = async (newRowLength) => {
        setLoading(true);
        const newData = await fetch(REQUEST_URL+'leads?limit=15&page='+(page+1))
            .then((response) => response.json())
            .then((data) => {
                setLoading(false);
                return data;
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
        // Simulate network throttle
        await sleep(Math.random() * 500 + 100);
    
        if (mounted.current) {
          setLoading(false);
          setLeadList(leadList.concat(newData));
        }
    };
    

    const handleOnRowsScrollEnd = (params) => {
        if (leadList.length <= MAX_ROW_LENGTH) {
            console.log(params.viewportPageSize);
            loadServerRows(params.viewportPageSize);
        }
    };

    /*useEffect(() => {
      fetch(REQUEST_URL+'leads?limit=10&page='+(page+1))
      .then((response) => response.json())
      .then((data) => {
          setLoading(false);
          setLeadList( data );
      })
      .catch((err) => {
          setLoading(false);
          console.log(err);
      })
    }, [page, setLeadList, setLoading])*/

    /*if (!loadingLeads) {
        window.addEventListener('scroll',()=>{
        const scrollTop = document.documentElement.scrollTop;
        const scrollTarget = document.querySelector('.anchor').offsetTop;
        const windowHeight = window.visualViewport.height;
        if(scrollTop + windowHeight + 400 > scrollTarget){
            setLoading(false);
            setTimeout(()=>{
                if (!loadingLeads) {
                    handleOnRowsScrollEnd();
                    console.log(1);
                }
            },1000)
            }
        })
    }*/
  
  return (
    <div>
        <h2>Leads</h2>
        {/* <Box sx={{ height: 400, mb: 20 }}>
          <DataGridPro
              apiRef={apiRef}
              localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
              // autoHeight
              rows={leadList}
              columns={columns}
              loading={loadingLeads}
              onRowsScrollEnd={handleOnRowsScrollEnd}
              // pageSize={15}
              // rowsPerPageOptions={[5,10,15]}
              checkboxSelection
          />
        </Box> */}
        <Box sx={{ height: '70vh', mb: 20 }}>
        <DataGridPro
              localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
              // autoHeight
              rows={leadList}
              columns={columns}
              loading={loadingLeads}
              hideFooterPagination
              onRowsScrollEnd={handleOnRowsScrollEnd}
              components={{
                LoadingOverlay: LinearProgress,
              }}
              checkboxSelection
          />
          </Box>
    </div>
  )
}
