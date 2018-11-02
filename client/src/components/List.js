import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    alignContent: "center",
    justifyContent: "center"
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
  },
  middle: {
    alignContent: "center",
    justifyContent: "center"
  },
  list: {
    boxShadow: "0 0 5px #c0c0c0",
    justifyContent: "center",
    marginTop: "40px",
    padding: 0
  },
  listHeader: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    padding: "20px",
    flexDirection: "column",
    fontSize: "1.17em",
    fontWeight: "bold"
  },
  listFooter: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    padding: "0 20px 20px 20px",
    flexDirection: "column"
  },
  listItem: {
    flex: "1 45%"
  },
  textField: {
    flex: 1
  },
  divider: {
    margin: "8px 0"
  },
  actions: {}
});

class InteractiveList extends React.Component {
  state = {
    message: "",
    messagesArray: [
      "First dsfj djshf dsjkfh dsjkfh sdjfh dshjdsh fksjdhf ",
      "second",
      "third",
      "fourth"
    ]
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    // e.preventDefault()
    console.log(this.state.message);
    axios
      .post("http://localhost:3001/messages", { message: this.state.message })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container className={classes.middle}>
          <Grid item xs={12} md={4} className={classes.list}>
            <div className={classes.listHeader}>Palindrome Checker</div>
            <div className={classes.demo}>
              <List>
                {this.state.messagesArray.map((message, i) => {
                  return (
                    <div>
                      {i === 0 ? "" : <Divider className={classes.divider} />}
                      <ListItem>
                        <ListItemText
                          primary={message}
                          className={classes.listItem}
                        />
                        <div className={classes.actions}>
                          <IconButton aria-label="Select">
                            <MoreHoriz />
                          </IconButton>
                          <IconButton aria-label="Delete">
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </ListItem>
                    </div>
                  );
                })}
              </List>
            </div>
            <div className={classes.listFooter}>
              <TextField
                id="add"
                label="Submit new message"
                defaultValue="Hello World"
                className={classes.textField}
                onChange={this.handleChange("message")}
                value={this.state.message}
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => this.handleSubmit()}
              >
                Add
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

InteractiveList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InteractiveList);
