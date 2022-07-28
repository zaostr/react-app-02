import {useState, useEffect, useCallback, useRef} from 'react'
import PropTypes from 'prop-types';
import {
  ruRU,
} from '@mui/x-data-grid';
import { 
    DataGridPro, 
    useGridApiRef,
    GridRowModes,
    GridToolbarContainer,
    GridActionsCellItem,
 } from '@mui/x-data-grid-pro';
import { Box, LinearProgress } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {REQUEST_URL} from "../../data/constants.js";

function EditToolbar(props) {
    const { setLeadList, setRowModesModel } = props;
  
    const handleClick = () => {
      const id = 0;
      setLeadList((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
      }));
    };
  
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add record
        </Button>
      </GridToolbarContainer>
    );
}

EditToolbar.propTypes = {
    setRowModesModel: PropTypes.func.isRequired,
    setLeadList: PropTypes.func.isRequired,
};

export const LeadsCrud = () => {
    const apiRef = useGridApiRef();
    const [loadingLeads, setLoading] = useState(false);
    const [leadList, setLeadList] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [page, setPage] = useState(0);



    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        {
          field: 'salary',
          headerName: 'Salary',
          type: 'number',
          width: 90,
          editable: true,
        },
        {
          field: 'dateCreated',
          headerName: 'Date Created',
          type: 'date',
          width: 180,
          editable: true,
          valueGetter: ({ value }) => value && new Date(value),
        },
        {
          field: 'lastLogin',
          headerName: 'Last Login',
          type: 'dateTime',
          width: 220,
          editable: true,
          valueGetter: ({ value }) => value && new Date(value),
        },
        {
          field: 'fullName',
          headerName: 'Full name',
          width: 160,
        },
        {
          field: 'actions',
          type: 'actions',
          headerName: 'Actions',
          width: 100,
          cellClassName: 'actions',
          getActions: ({ id }) => {
            const isInEditMode = leadList[id]?.mode === GridRowModes.Edit;
      
            if (isInEditMode) {
              return [
                <GridActionsCellItem
                  icon={<SaveIcon />}
                  label="Save"
                  onClick={handleSaveClick(id)}
                />,
                <GridActionsCellItem
                  icon={<CancelIcon />}
                  label="Cancel"
                  className="textPrimary"
                  onClick={handleCancelClick(id)}
                  color="inherit"
                />,
              ];
            }
      
            return [
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                className="textPrimary"
                onClick={handleEditClick(id)}
                color="inherit"
              />,
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={handleDeleteClick(id)}
                color="inherit"
              />,
            ];
          },
        },
      ];

    useEffect(() => {
        fetch(REQUEST_URL+'leadsCrud?limit=15&page='+(page+1))
        .then((response) => response.json())
        .then((data) => {
            setLoading(false);
            setLeadList( data );
        })
        .catch((err) => {
            setLoading(false);
            console.log(err);
        })
      }, [page, setLeadList, setLoading])


    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setLeadList(leadList.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = leadList.find((row) => row.id === id);
        if (editedRow.isNew) {
            setLeadList(leadList.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setLeadList(leadList.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };
  
  return (
    <div sx={{
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}>
        <h2>Leads Crud</h2>
        <DataGridPro
            apiRef={apiRef}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            components={{
              LoadingOverlay: LinearProgress,
              Toolbar: EditToolbar,
            }}
            componentsProps={{
              toolbar: { setLeadList, setRowModesModel },
            }}
            experimentalFeatures={{ newEditingApi: true }}
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            autoHeight
            rows={leadList}
            columns={columns}
            loading={loadingLeads}
          />
    </div>
  )
}
