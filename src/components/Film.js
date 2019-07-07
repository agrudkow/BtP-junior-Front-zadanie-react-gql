import React from "react";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const FILM_SEARCH_QUERY = gql `
  query FilmSearchQuery($id: ID, $orderBy: VehicleOrderBy, $first: Int) {
    Film(id: $id) {
      director
      title
      releaseDate
      vehicles(orderBy: $orderBy, first: $first) {
        name
        costInCredits
      }
    }
  }
`

const convertDate = dateString => {
  const date = new Date(dateString);
  const dateYear = date.getFullYear();
  const dateMonth = (date.getMonth()+1) < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1);
  const dateDay = date.getDay() < 10 ? '0' + date.getDay() : date.getDay();
  return (dateDay + '-' + dateMonth + '-' + dateYear);
}

const Film = ({
  match: {
    params: { id },
  },
}) => {
  const searchData = {
    id: id,
    orderBy: "costInCredits_DESC",
    first: 1
  }
  return (
    <Query query={FILM_SEARCH_QUERY} variables={searchData}>
      {({data}) => {
        if (!data || !data.Film) return null;
        console.log(data.Film.vehicles.length);

        const {director, title, releaseDate, vehicles} = data.Film;
        
        return (
          <div>
            <strong>{title}</strong>
            <div>
              Director: {director}
              <br />
              Realse date: {convertDate(releaseDate)}
              <br />
              {vehicles.length ? 'Most expensive vehicle/s:' : null}
              <br />
              {vehicles.map(vehicle => (
                <p key={vehicle.name}>Name: {vehicle.name} Cost: {vehicle.costInCredits}</p>
              ))}
            </div>
          </div>
        )
      }}
    </Query>
  )
};

export default withRouter(Film);
