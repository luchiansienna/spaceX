import { connect } from 'react-redux';
import { setSearchTerm } from '../actions';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { AgGridReact } from '@ag-grid-community/react';
import { Input } from '../components/input';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useMemo } from 'react';
import { Link } from "react-router-dom";
import Launch from '../domain/launch';

interface LaunchesProps {
    launches: Array<Launch>,
    searchByTerm: (searchTerm: string) => void,
    searchTerm?: string
};

export const Launches = ({ launches, searchByTerm, searchTerm }: LaunchesProps) => {
    const modules = useMemo(() => [ClientSideRowModelModule], []);
    function dateFormatter(params: { value: any; }) {
        var dateAsString = params.value;
        return new Date(dateAsString).toLocaleString();
    };
    const columnDefs = useMemo(() => [
        {
            headerName: 'Name',
            field: 'name',
            editable: false,
        },
        {
            headerName: 'Date',
            field: 'date_utc',
            editable: false,
            valueFormatter: dateFormatter,
        },
        {
            field: 'id',
            headerName: 'Details',
            editable: false,
            cellRenderer: "LinkCellRenderer"
        },
    ], []);

    const defaultColDef = useMemo(() => ({
        resizable: true,
        editable: true,
        sortable: true,
        flex: 1
    }), []);

    const LinkCellRenderer = (params: { data: { id: string; }; }) => (
        <Link to={"/launch/" + params.data.id}>View Rocket Details</Link>
      );

    return <div>
        <header><h3>SpaceX 50 Most Recent Launches:</h3></header>
        <Grid container justifyContent="flex-end" style={{ paddingRight: 20 }}>
            <Box alignContent="flex-end"
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <Input id="searchInput" name="Name" searchTerm={searchTerm??''} searchByTerm={(term) => searchByTerm(term)} />
            </Box>
        </Grid>
        <div className="ag-theme-alpine" style={{ height: 'calc(100vh - 150px)', width: '100%', padding: 20, boxSizing: 'border-box', WebkitBoxSizing: 'border-box' }}>
            <AgGridReact
                reactUi={true}
                className="ag-theme-alpine"
                animateRows={true}
                modules={modules}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowData={launches}
                rowSelection={'single'}
                frameworkComponents={{
                    LinkCellRenderer
                  }}
            />
        </div>
    </div>
};

const mapDispatchToProps = (dispatch: (arg0: { type: string; }) => any) => ({
    searchByTerm: (searchTerm: String) => dispatch(setSearchTerm(searchTerm)),
});

const mapStateToProps = (state: any) => ({
    launches: state.launches,
    searchTerm: state.searchTerm
});

export default connect(mapStateToProps, mapDispatchToProps)(Launches);