import { StyledTableCell, StyledTableRow } from '../../ui/StockInfoTable/tableComponents';
import React from 'react';
import { TableSortLabel, TableRow, Button, CircularProgress } from '@material-ui/core';
import * as ROUTES from '../../../constants/routes';
import { Link } from 'react-router-dom';

export const getPositionsHeaderRow = (orderBy, direction, handleClick) => {
    return (<TableRow>
        <StyledTableCell><TableSortLabel
            name="stockName"
            direction={direction}
            active={orderBy === "stockName"}
            onClick={handleClick}>
            Name
            </TableSortLabel></StyledTableCell>
        <StyledTableCell align="right"><TableSortLabel
            name="currPrice"
            direction={direction}
            active={orderBy === "currPrice"}
            onClick={handleClick}>
            Adjusted Price
            </TableSortLabel></StyledTableCell>
        <StyledTableCell align="right"><TableSortLabel
            name="avgBuyPrice"
            direction={direction}
            active={orderBy === "avgBuyPrice"}
            onClick={handleClick}>
            Avg Buy Price
            </TableSortLabel></StyledTableCell>
        <StyledTableCell align="right"><TableSortLabel
            name="numShares"
            direction={direction}
            active={orderBy === "numShares"}
            onClick={handleClick}>
            Shares Owned
            </TableSortLabel></StyledTableCell>
        <StyledTableCell align="right"><TableSortLabel
            name="totalValue"
            direction={direction}
            active={orderBy === "totalValue"}
            onClick={handleClick}>
            Total Value
            </TableSortLabel></StyledTableCell>
        <StyledTableCell align="right"><TableSortLabel
            name="profit"
            direction={direction}
            active={orderBy === "profit"}
            onClick={handleClick}>
            Profit
            </TableSortLabel></StyledTableCell>
    </TableRow>);
}

export const summaryHeaderRow = (<TableRow>
    <StyledTableCell>Name</StyledTableCell>
    <StyledTableCell align="right">Data</StyledTableCell>
</TableRow>);

export const transactionHistoryHeaderRow = (<TableRow>
    <StyledTableCell>Stock Name</StyledTableCell>
    <StyledTableCell># Shares</StyledTableCell>
    <StyledTableCell>Price</StyledTableCell>
    <StyledTableCell align="right">Value</StyledTableCell>
    <StyledTableCell align="right">Date</StyledTableCell>
</TableRow>);

export const openTradeHeaderRow = (<TableRow>
    <StyledTableCell>Stock Name</StyledTableCell>
    <StyledTableCell># Shares</StyledTableCell>
    <StyledTableCell>Price</StyledTableCell>
    <StyledTableCell align="right">Value</StyledTableCell>
    <StyledTableCell align="right"></StyledTableCell>
</TableRow>);

const getSummaryRow = (title, data) => {
    return <StyledTableRow>
        <StyledTableCell>
            {title}
        </StyledTableCell>
        <StyledTableCell align="right">{data}</StyledTableCell>
    </StyledTableRow>
}

const getAllSummaryRows = (dataArr) => {
    let display = dataArr.map(dataObj => {
        return getSummaryRow(dataObj.title, dataObj.data)
    });
    return display;
}
export const getSummaryRows = (ownedStocks, user, data) => {
    if (data.loading || user.accountBalance == null) {
        return <StyledTableCell align="right"><CircularProgress size={30} /></StyledTableCell>;
    }
    //let totalBoughtValue = 0;
    let totalValue = 0;
    // let totalProfit = 0;
    ownedStocks.forEach(stock => {
        //totalBoughtValue += stock.totalBoughtValue;
        totalValue += stock.totalValue;
        //totalProfit += stock.totalProfit;
    });
    return Object.keys(ownedStocks).length === 0
        ? <StyledTableCell></StyledTableCell>
        : getAllSummaryRows([{ title: "Account Balance:", data: user.accountBalance.toFixed(2) },
        { title: "Portfolio Market Value:", data: totalValue.toFixed(2) }])
}

export const getStockRows = (ownedStocks, loading) => {
    if (loading) {
        return <StyledTableCell><CircularProgress size={30} /></StyledTableCell>
    }
    let currTrade = false;
    const display = ownedStocks.map(stock => {
        if (stock === null || stock === undefined || stock.currPrice === null) return null;
        currTrade = true;
        return <StyledTableRow key={stock.stockId}>
            <Button fullWidth align="center" variant="contained" color="primary" size="small" href={`${ROUTES.STOCKS}/${stock.stockId}`}>
                {stock.stockName}
            </Button>
            <StyledTableCell align="right">{stock.currPrice.toFixed(2)}</StyledTableCell>
            <StyledTableCell align="right">{stock.avgBuyPrice.toFixed(2)}</StyledTableCell>
            <StyledTableCell align="right">{stock.numShares}</StyledTableCell>
            <StyledTableCell align="right">{stock.totalValue.toFixed(2)}</StyledTableCell>
            <StyledTableCell align="right">{stock.totalProfit.toFixed(2)}</StyledTableCell>
        </StyledTableRow>
    });
    if (currTrade) return display;
    else return <StyledTableCell>No positions.</StyledTableCell>
}

export const getTransactionRows = (transactionHistory, loading) => {
    if (loading) {
        return <StyledTableCell><CircularProgress size={30} /></StyledTableCell>
    }
    let currTransactions = false;
    const display = transactionHistory.map(transaction => {
        currTransactions = true;
        return <StyledTableRow key={transaction.tradeId}>
            <StyledTableCell component="th" scope="row">
                {transaction.stockName}
            </StyledTableCell>
            <StyledTableCell align="right">{transaction.sharesTraded}</StyledTableCell>
            <StyledTableCell align="right">{transaction.sharesPrice.toFixed(2)}</StyledTableCell>
            <StyledTableCell align="right">{transaction.transactionValue.toFixed(2)}</StyledTableCell>
            <StyledTableCell align="right">{transaction.dateAndTime}</StyledTableCell>
        </StyledTableRow>
    });
    if (currTransactions) return display;
    else return <StyledTableCell>Couldn't get any transactions.</StyledTableCell>
}


export const getOpenTradeDisplay = (trades, loading, attemptToRemove) => {
    if (loading) {
        return <StyledTableCell><CircularProgress size={30} /></StyledTableCell>
    }
    let currTrade = false;
    const display = trades.map(trade => {
        currTrade = true;
        return <StyledTableRow key={trade.tradeId}>
            <StyledTableCell component="th" scope="row">
                <Link to={`${ROUTES.STOCKS}/${trade.stockId}`}>{trade.stockName}</Link>
            </StyledTableCell>
            <StyledTableCell align="right">{trade.sharesTraded}</StyledTableCell>
            <StyledTableCell align="right">{trade.sharesPrice.toFixed(2)}</StyledTableCell>
            <StyledTableCell align="right">{trade.sharesTraded * trade.sharesPrice}</StyledTableCell>
            <StyledTableCell align="right"><Button id={trade.tradeId} variant="contained" color="primary" onClick={attemptToRemove}>Remove</Button></StyledTableCell>
        </StyledTableRow>
    })
    if (currTrade) return display;
    else return <StyledTableCell>No open sell orders.</StyledTableCell>
}
