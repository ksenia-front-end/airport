import React, { useEffect } from "react";
import {
  useLocation,
  useParams,
  Route,
  BrowserRouter,
  Switch,
} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import qs from "qs";

import * as Actions from "../flights.actions";
import { arrivalsSelector, departuresSelector } from "../flights.selectors";
import ArrDeps from "./ArrDeps";
import Buttons from "../buttons/Buttons";
import "./table.scss";

const Table = (props) => {
  const { search } = useLocation();
  const { flightDirection } = useParams();
  console.log(flightDirection);
  const searchedFlight = qs.parse(search, { ignoreQueryPrefix: true });

  useEffect(() => props.fetchFlights(), []);

  return (
    <main className="airport-board__content">
      <div className="flights">
        <Buttons />
        <table className="shedule__table">
          <thead>
            <tr>
              <td className="terminal">Terminal</td>
              <td className="local-time">Local time</td>
              <td className="destination">Destination</td>
              <td className="status">Status</td>
              <td className="airline">Airline</td>
              <td className="flight">Flight</td>
              <td></td>
            </tr>
          </thead>
          <BrowserRouter>
            <Switch>
              <Route path="/"></Route>
              <Route path="/:flightDirection">
                <ArrDeps
                  flights={
                    searchedFlight.searched
                      ? props[flightDirection].filter(
                          (flight) =>
                            flight.flightNumber === searchedFlight.searched
                        )
                      : props[flightDirection]
                  }
                />
              </Route>
            </Switch>
          </BrowserRouter>
          <ArrDeps
            flights={
              searchedFlight.searched
                ? props[flightDirection].filter(
                    (flight) => flight.flightNumber === searchedFlight.searched
                  )
                : props[flightDirection]
            }
          />
        </table>
      </div>
    </main>
  );
};

const mapState = (state) => {
  return {
    arrivals: arrivalsSelector(state),
    departures: departuresSelector(state),
  };
};

const mapDispatch = {
  fetchFlights: Actions.fetchFlights,
};

Table.propTypes = {
  arrivals: PropTypes.array.isRequired,
  departures: PropTypes.array.isRequired,
  fetchFlights: PropTypes.func.isRequired,
};

export default connect(mapState, mapDispatch)(Table);
