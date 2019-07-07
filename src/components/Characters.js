import gql from "graphql-tag";
import React, {useState} from "react";
import { Query } from "react-apollo";
import {Link} from 'react-router-dom';
import { List, ListItem, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ListItemText, Collapse, Typography, Container, CircularProgress  } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  progress: {
    marginTop: '0',
  },
  progressDiv: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const CHARACTERS_QUERY = gql`
  query AllPersons($orderBy: PersonOrderBy, $skip: Int $first: Int){
    allPersons(orderBy:$orderBy, skip: $skip first: $first) {
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


const searchData = {
  orderBy: "name_ASC",
}

const Characters = props => {
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  function handleClick() {
    setOpen(!open);
  }

  return (
    <React.Fragment>
      <main>
        <div className={classes.heroContent} >
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Star Wars Characters
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              This site contains all characters from Star Wars saga. 
              You can find here some useful information about your 
              favourite character e.g. eye color, homeland or films in which they have played. 
            </Typography>
          </Container>
        </div>
        <Query query={CHARACTERS_QUERY} variables={searchData}>
          {({ loading, error, data }) => {
            if (loading) return <Container className={classes.cardGrid} maxWidth="md"><div className={classes.progressDiv}><CircularProgress className={classes.progress} /></div></Container>;
            if (error) return <div>Error</div>; //To be handled
            if (!data || !data.allPersons) return null;
            const elems = data.allPersons.map(
              ({ id, name, eyeColor, homeworld, films }) => (
                <ExpansionPanel expanded={expanded === id} onChange={handleChange(id)} key={id}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography className={classes.heading}><strong>{name}</strong></Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <List
                      component="nav"
                      aria-labelledby="nested-list-subheader"
                      className={classes.root}
                    >
                      <ListItem>
                        <ListItemText primary={`Homeworld: ${homeworld && homeworld.name}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`Eye color: ${eyeColor}`} />
                      </ListItem>
                      <ListItem  button onClick={handleClick}>
                        <ListItemText primary="Films" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {films.map((f) => (
                            <Link key={f.id} to={`/film/${f.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                              <ListItem button>
                                <ListItemText primary={f.title} />
                              </ListItem>
                            </Link>
                          ))}
                        </List>
                      </Collapse>
                    </List>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              )
            );
            return (<Container className={classes.cardGrid} maxWidth="md">{elems}</Container>);
          }}
        </Query>
      </main>
    </React.Fragment>
  );
};

export default Characters;