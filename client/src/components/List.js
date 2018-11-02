import React from "react";
import ReactDOM from "react-dom";
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
  listContainer: {
    maxHeight: "400px",
    overflow: "auto"
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
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  state = {
    message: "",
    messagesArray: []
  };
  //TODO: Check in what lifecycle to make initial request and maybe to use async/await
  componentWillMount() {
    axios
      .get("http://localhost:3001/messages")
      .then(response => {
        console.log(response);
        this.setState({
          messagesArray: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

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
      .then(response => {
        this.setState({
          messagesArray: response.data
        });
        this.scrollToDomRef();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  scrollToDomRef = () => {
    const myDomNode = ReactDOM.findDOMNode(this.myRef.current);
    myDomNode.scrollIntoView();
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container className={classes.middle}>
          <Grid item xs={12} md={4} className={classes.list}>
            <div className={classes.listHeader}>Palindrome Checker</div>
            <List className={classes.listContainer}>
              {this.state.messagesArray.map((item, i) => {
                return (
                  <div>
                    {i === 0 ? "" : <Divider className={classes.divider} />}
                    <ListItem
                      ref={
                        i === this.state.messagesArray.length - 1
                          ? this.myRef
                          : ""
                      }
                    >
                      <ListItemText
                        primary={item.message}
                        className={classes.listItem}
                      />
                      <div className={classes.actions}>
                        {i}
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
            <div className={classes.listFooter}>
              <TextField
                id="add"
                label="Submit new message"
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
