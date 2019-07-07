import gql from "graphql-tag";
import React from "react";
import { Query } from "react-apollo";
import {Link} from 'react-router-dom';


const CHARACTERS_QUERY = gql`
  query {
    allPersons {
      id
      name
      eyeColor
      homeworld {
        name
      }
      films {
        title
        id
      }
    }
  }
`;

const handleClick = (id) => () => console.log(id);

const Characters = () => (
  <Query query={CHARACTERS_QUERY}>
    {({ data }) => {
      if (!data || !data.allPersons) return null;
      const elems = data.allPersons.map(
        ({ id, name, eyeColor, homeworld, films }) => (
          <div className="item" key={id}>
            <strong>{name}</strong>
            <div>
              Homeworld: {homeworld && homeworld.name}
              <br />
              Eye color: {eyeColor}
              <br />
              {films.map((f) => (
                <Link key={f.id} to={`/film/${f.id}`}>
                  <button onClick={handleClick(f.id)}>
                    {f.title}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        )
      );
      return <div className="items-container">{elems}</div>;
    }}
  </Query>
);

export default Characters;
