import React from "react";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { List, ListItem, Typography, Container, Button, AppBar, Toolbar, CssBaseline } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  root: {
    width: '100%',
  },
  button: {
    margin: theme.spacing(1),
    marginRight: theme.spacing(4)
  },
}));

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


const Film = props => {
  const classes = useStyles();

  const searchData = {
    id: props.match.params.id,
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
          <React.Fragment>
            <CssBaseline />
              <AppBar position="relative">
                <Toolbar>
                  <Button variant="contained" className={classes.button} onClick={() => props.history.push('/')}>
                    Back
                  </Button>
                  <Typography variant="h5" color="inherit" noWrap>
                    {`Informations about: ${title}`}
                  </Typography>
                </Toolbar>
              </AppBar>
              <main>
              <Container className={classes.cardGrid} maxWidth="md">
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={classes.root}
              >
                <ListItem>
                  <Typography variant="h6" ><strong>Title: </strong>{title}</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="h6" ><strong>Director: </strong>{director}</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="h6" ><strong>Release date: </strong>{convertDate(releaseDate)}</Typography>
                </ListItem>
                <ListItem>
                  {vehicles.length > 0 && <Typography variant="h6" ><strong>Most expensive vehicle: </strong>{vehicles[0].name} <i>({vehicles[0].costInCredits} Galactic Credits)</i></Typography>}
                </ListItem>
              </List>
              </Container>
              </main>
          </React.Fragment>
        )
      }}
    </Query>
  )
};

export default withRouter(Film);

