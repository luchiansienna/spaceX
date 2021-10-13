
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import LaunchInterface from '../domain/launch';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

interface LaunchProps {
    match: { params: { launchId: string } },
    launches: Array<LaunchInterface>
};

const SuccessfullText = (success: boolean) =>
{
    switch(success) {
        case undefined: return '';
        case null: return '';
        case true: return 'Successfull';
        case false: return 'Unsuccessfull';
        default: return ''
    }
}

const Launch = ({ match: { params: { launchId } }, ...props }: LaunchProps) => {
    const selectedLaunch = props.launches ? props.launches.find(x=> x.id === launchId) : null;
    return selectedLaunch ? 
        <div>
        <h2>SpaceX Launch: "{selectedLaunch.name}"</h2>
        <p><Link to="/">Go Back</Link></p>
        <Container>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <Item><div>Date: {new Date(selectedLaunch.date_utc).toLocaleString()}</div></Item>
                </Grid>
                <Grid item xs={6}>
                    <Item><div>Flight Number: {selectedLaunch.flight_number}</div></Item>
                </Grid>
                <Grid item xs={6}>
                    <Item><div>{selectedLaunch.upcoming === true ? 'Upcoming launch' : 'Launched'}</div></Item>
                </Grid>
                <Grid item xs={6}>
                    <Item><div>{SuccessfullText(selectedLaunch.success)}</div></Item>
                </Grid>
            </Grid>
        </Container>
    </div>:
    <span>Not Found</span>;
}

const mapStateToProps = (state: any) => ({
      launches: state.launches
});

export default connect(mapStateToProps, null)(Launch);