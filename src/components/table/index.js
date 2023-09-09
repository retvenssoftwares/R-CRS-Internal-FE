import * as React from "react";
import ReactDOM from "react-dom";
import DataTable from "react-data-table-component";
import Paper from "@mui/material/Paper";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from "@material-ui/core/Checkbox";
// import "./styles.css";

// const columns = [
//     {
//         name: "Title",
//         selector: "title",
//         sortable: true
//     },
//     {
//         name: "Directior",
//         selector: "director",
//         sortable: true
//     },
//     {
//         name: "Runtime (m)",
//         selector: "runtime",
//         sortable: true,
//         right: true
//     }
// ];

// const movies = [{
//     title:"xyz"
// }]

const isIndeterminate = (indeterminate) => indeterminate;
const selectableRowsComponentProps = { indeterminate: isIndeterminate };

const Table = ({columns,data,titles,contextActions,handleRowSelected,toggleCleared}) => {
    return (
        <div className="App" style={{marginTop:'20px'}}> 
            <Paper>
                <DataTable
                    title={titles}
                    columns={columns}
                    data={data}
                    defaultSortField="title"
                    sortIcon={<ExpandMoreIcon />}
                    pagination
                    selectableRows
                    selectableRowsComponent={Checkbox}
                    selectableRowsComponentProps={selectableRowsComponentProps && selectableRowsComponentProps}
			contextActions={contextActions && contextActions}
			onSelectedRowsChange={handleRowSelected && handleRowSelected}
			clearSelectedRows={toggleCleared && toggleCleared}
                />
            </Paper>
        </div>
    );
}

export default Table