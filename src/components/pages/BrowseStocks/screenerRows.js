import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";
//import { getLogoName } from "../../../constants/logos";

import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import {
  Button,
  Checkbox,
  CircularProgress,
  Typography,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../ui/StockInfoTable/styledTableComponents";
import { inWatchlist } from "../../../helpers/filterFunctions";

//gets all rows for table for all stocks that match current filters
export function getRows(stocks, watchlist, handleClick, classes) {
  if (stocks === null || stocks === "undefined") {
    return (
      <StyledTableRow>
        <StyledTableCell>
          <Typography align="center" variant="h6">
            Error. No stocks found.
          </Typography>
        </StyledTableCell>
        <StyledTableCell />
        <StyledTableCell />
        <StyledTableCell />
        <StyledTableCell />
        <StyledTableCell />
        <StyledTableCell />
        <StyledTableCell />
        <StyledTableCell />
      </StyledTableRow>
    );
  }
  if (stocks.length === 0) {
    return (
      <StyledTableRow>
        <StyledTableCell>
          <Typography align="center" variant="h6">
            No matches
          </Typography>
        </StyledTableCell>
        <StyledTableCell />
        <StyledTableCell />
        <StyledTableCell />
        <StyledTableCell />
        <StyledTableCell />
        <StyledTableCell />
        <StyledTableCell />
        <StyledTableCell />
      </StyledTableRow>
    );
  }

  return stocks ? (
    stocks.map((row) => (
      <StyledTableRow key={row.stockId}>
        <StyledTableCell component="th" scope="row" align="left">
          <Button
            fullWidth
            component={Link}
            to={`${ROUTES.STOCKS}/${row.stockId}`}
            align="center"
            variant="contained"
            color="primary"
            size="medium"
          >
            {row.stockName}
          </Button>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" align="left">
          <a href={`${ROUTES.STOCKS}/${row.stockId}`}>
            <img
              width="50px"
              height="50px"
              src={row.imageUrl}
              alt={`${row.stockName} Team Logo`}
            />
          </a>
        </StyledTableCell>
        <StyledTableCell align="left" padding="checkbox" size="small">
          <Checkbox
            id={row.stockId}
            value={inWatchlist(watchlist, row)}
            checked={inWatchlist(watchlist, row) === 1}
            onChange={handleClick}
            inputProps={{ "aria-label": "primary checkbox" }}
            color="primary"
          />
        </StyledTableCell>
        <StyledTableCell align="right">
          {row.activeOrder ? "Yes" : "No"}
        </StyledTableCell>
        <StyledTableCell align="right">{row.seed}</StyledTableCell>
        <StyledTableCell align="right">{row.currPoints}</StyledTableCell>
        <StyledTableCell align="right">
          <MonetizationOnIcon />
          {row.price ? row.price.toFixed(2) : ""}
        </StyledTableCell>
        <StyledTableCell align="right">
          <MonetizationOnIcon />
          {row.ipoPrice ? row.ipoPrice.toFixed(2) : ""}
        </StyledTableCell>
        <StyledTableCell align="right">{row.volume}</StyledTableCell>
        <StyledTableCell align="right">{row.float}</StyledTableCell>
      </StyledTableRow>
    ))
  ) : (
    <CircularProgress size={30}></CircularProgress>
  );
}

//gets the header row
export function getScreenerHeaderRow(orderBy, direction, handleClick) {
  return (
    <TableRow>
      <StyledTableCell>
        <TableSortLabel
          name="stockName"
          direction={direction}
          active={orderBy === "stockName"}
          onClick={handleClick}
        >
          Name
        </TableSortLabel>
      </StyledTableCell>
      <StyledTableCell align="left">
        <TableSortLabel
          name="stockName"
          direction={direction}
          active={orderBy === "stockName"}
          onClick={handleClick}
        >
          Logo
        </TableSortLabel>
      </StyledTableCell>
      <StyledTableCell align="left">
        {" "}
        <TableSortLabel
          name="watchlist"
          direction={direction}
          active={orderBy === "watchlist"}
          onClick={handleClick}
        >
          Watchlist
        </TableSortLabel>
      </StyledTableCell>
      <StyledTableCell align="right">
        {" "}
        <TableSortLabel
          name="activeOrder"
          direction={direction}
          active={orderBy === "activeOrder"}
          onClick={handleClick}
        >
          Current Seller?
        </TableSortLabel>
      </StyledTableCell>
      <StyledTableCell align="right">
        {" "}
        <TableSortLabel
          name="seed"
          direction={direction}
          active={orderBy === "seed"}
          onClick={handleClick}
        >
          Seed
        </TableSortLabel>
      </StyledTableCell>
      <StyledTableCell align="right">
        {" "}
        <TableSortLabel
          name="currPoints"
          direction={direction}
          active={orderBy === "currPoints"}
          onClick={handleClick}
        >
          Total Points
        </TableSortLabel>
      </StyledTableCell>
      <StyledTableCell align="right">
        <TableSortLabel
          name="price"
          direction={direction}
          active={orderBy === "price"}
          onClick={handleClick}
        >
          Last Auction
        </TableSortLabel>
      </StyledTableCell>
      <StyledTableCell align="right">
        <TableSortLabel
          name="ipoPrice"
          direction={direction}
          active={orderBy === "ipoPrice"}
          onClick={handleClick}
        >
          BIN Price
        </TableSortLabel>
      </StyledTableCell>

      <StyledTableCell align="right">
        {" "}
        <TableSortLabel
          name="volume"
          direction={direction}
          active={orderBy === "volume"}
          onClick={handleClick}
        >
          Volume
        </TableSortLabel>
      </StyledTableCell>

      <StyledTableCell align="right">
        {" "}
        <TableSortLabel
          name="float"
          direction={direction}
          active={orderBy === "float"}
          onClick={handleClick}
        >
          Float
        </TableSortLabel>
      </StyledTableCell>
    </TableRow>
  );
}
