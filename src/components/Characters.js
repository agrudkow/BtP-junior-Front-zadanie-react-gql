import gql from "graphql-tag";
import React from "react";
import { Query } from "react-apollo";

const QUERY = gql`
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
  <Query query={QUERY}>
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
                <button key={f.id} onClick={handleClick(f.id)}>
                  {f.title}
                </button>
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
