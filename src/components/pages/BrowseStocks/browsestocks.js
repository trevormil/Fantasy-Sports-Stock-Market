import React, { Component } from 'react'
//Redux
import { connect } from 'react-redux';
import { setUserWatchlist } from '../../../redux/actions/userActions'
import { getStocks, setStocks, sortCurrStocks } from '../../../redux/actions/dataActions'
//UI
import AddFilterRow from '../../ui/StockInfoTable/addFilterRow';
import { withStyles, Typography, Grid, Container, CircularProgress } from '@material-ui/core';
//Table Components
import CustomizedTables from '../../ui/StockInfoTable/stockTable';
import { getScreenerHeaderRow, getRows, StyledTableCell } from '../../ui/StockInfoTable/tableComponents';
import { getFilterDisplay } from './filterDisplay';

const styles = (theme) => ({
    ...theme.spreadThis
});
const initialState = {
    orderBy: "stockName",
    direction: "asc"
};
class BrowseStocksPage extends Component {
    state = initialState;
    constructor(props) {
        super(props);
        this.props.getStocks(this.props.data.filters);
        this.handleClickOnSortLabel = this.handleClickOnSortLabel.bind(this);
        this.handleClickOnWatchlist = this.handleClickOnWatchlist.bind(this);
    }
    handleClickOnSortLabel(event) {
        const orderByName = event.currentTarget.getAttribute('name');
        const dir = this.state.direction === "asc" ? "desc" : "asc";
        this.setState({
            orderBy: orderByName,
            direction: dir
        });
        this.props.sortCurrStocks(this.props.data, orderByName, dir, this.props.user.watchlist);
    }
    handleClickOnWatchlist(event) {
        const currValue = event.currentTarget.getAttribute('value');
        const stockId = event.currentTarget.getAttribute('id');
        this.props.setUserWatchlist(this.props.user, stockId, Number(currValue) === -1);
    }
    render() {
        const { classes } = this.props;
        let stockDisplay = !this.props.data.loading
            ? getRows(this.props.data.stocks, this.props.user.watchlist, this.handleClickOnWatchlist, classes) : <StyledTableCell><CircularProgress size={30} /></StyledTableCell>;
        let filterDisplay = getFilterDisplay(this.props.data);
        return (
            <div className='screener' >
                <Container maxWidth="lg">
                    <div className={classes.root}>
                        <Typography variant="h2" className={classes.pageTitle} align="center">
                            Stock Screener
                         </Typography>
                        <Grid container spacing={3} justify="space-around">
                            <AddFilterRow addFilter={this.addFilter} reset={this.handleReset} />
                            <Grid item xs={8} spacing={3}>
                                <Grid container spacing={3} justify="space-around" alignItems="center">
                                    <div className={classes.root}>
                                        {filterDisplay}
                                    </div>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid container spacing={3} justify="space-around">
                            <Grid item xs={8} spacing={3}>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
                <hr />
                <Container maxWidth="lg">
                    <div>
                        <CustomizedTables
                            rows={stockDisplay}
                            headerRow={getScreenerHeaderRow(this.state.orderBy, this.state.direction, this.handleClickOnSortLabel)} />

                    </div>
                </Container>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui,
    data: state.data
});

const mapActionsToProps = {
    setUserWatchlist,
    setStocks,
    sortCurrStocks,
    getStocks
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(BrowseStocksPage));