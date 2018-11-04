import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import AlertDialog from "./Dialog";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { API } from "../constants";
import { withStyles } from "@material-ui/core/styles";

class MessagesList extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  state = {
    open: false,
    error: false,
    apiErrorMessage: "",
    message: "",
    messagesArray: [],
    isPalindrome: false,
    messageError: ""
  };

  componentDidMount() {
    this.getMessages();
  }

  // request to the Node API to get all messages
  getMessages = async () => {
    try {
      const messages = await axios.get(API.MESSAGES);
      const messagesArray = messages.data;
      this.setState({ messagesArray });
    } catch (e) {
      this.handleError(e);
    }
  };

  // request to the Node API which determines if message is a palindrome
  getDetails = async id => {
    try {
      const message = await axios.get(`${API.MESSAGES}/${id}`);
      this.setState({
        open: true,
        isPalindrome: message.data
      });
    } catch (e) {
      this.handleError(e);
    }
  };

  // request to the Node API to add new message
  newMessage = async () => {
    try {
      await axios.post(API.MESSAGES, { message: this.state.message });
      this.setState({
        message: ""
      });
    } catch (e) {
      this.handleError(e);
    }
  };

  // request to the Node API to remove a message
  removeMessage = async id => {
    try {
      await axios.delete(`${API.MESSAGES}/${id}`);
      this.getMessages();
    } catch (e) {
      this.handleError(e);
    }
  };

  // method to update state input value on it's change
  handleChange = name => event => {
    event.preventDefault();
    this.setState({
      error: false,
      [name]: event.target.value
    });
  };

  // method to submit new message
  handleSubmit = event => {
    event.preventDefault();
    if (this.messageValidation(this.state.message)) {
      return;
    }
    this.newMessage().then(() => {
      this.getMessages().then(this.scrollToNewMessage);
    });
  };

  // open modal
  handleOpenModal = id => {
    this.getDetails(id);
  };

  // close modal
  handleCloseModal = () => {
    this.setState({ open: false });
  };

  // error handling method
  handleError = err => {
    this.setState({
      open: true,
      apiErrorMessage: err.message
    });
  };

  checkEnter(event) {
    if (event.key === "Enter") {
      this.handleSubmit(event);
    }
  }
  // pre-submit validation if message is not empty
  messageValidation = str => {
    let value = str.length === 0 || !str.trim();
    if (value) {
      this.setState({
        error: true,
        messageError: "Empty strings are not allowed"
      });
    }
    return value;
  };

  // workaround to add 'divider' after all list elements with exceptions of the first one
  addDivider = i => {
    const { classes } = this.props;
    return i === 0 ? "" : <Divider className={classes.divider} />;
  };

  // method to add DOM reference later used to detect newly added message
  addDomRef = i => {
    const lastIndex = this.state.messagesArray.length - 1;
    return i === lastIndex ? this.myRef : "";
  };

  // method to scroll to the newly added message
  scrollToNewMessage = () => {
    const myDomNode = ReactDOM.findDOMNode(this.myRef.current);
    myDomNode.scrollIntoView({ block: "start", inline: "nearest" });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container className={classes.middle}>
          <Grid item xs={12} md={4} className={classes.list}>
            <div className={classes.listHeader}>Palindrome Checker</div>
            <List className={classes.listContainer}>
              {this.state.messagesArray.length === 0 ? (
                <ListItem>
                  <ListItemText
                    primary="There are no messages here"
                    className={classes.listItem}
                  />
                </ListItem>
              ) : (
                this.state.messagesArray.map((item, i) => {
                  return (
                    <div key={item._id} ref={this.addDomRef(i)}>
                      {this.addDivider(i)}
                      <ListItem>
                        <ListItemText
                          primary={item.message}
                          className={classes.listItem}
                        />
                        <div className={classes.actions}>
                          <IconButton
                            aria-label="Select"
                            onClick={() => this.handleOpenModal(item._id)}
                          >
                            <MoreHoriz />
                          </IconButton>
                          <IconButton
                            aria-label="Delete"
                            onClick={() => this.removeMessage(item._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </ListItem>
                    </div>
                  );
                })
              )}
            </List>
            <div className={classes.listFooter}>
              <TextField
                id="add"
                label="Submit new message"
                error={this.state.error}
                helperText={this.state.error ? this.state.messageError : ""}
                className={classes.textField}
                onChange={this.handleChange("message")}
                onKeyDown={event => this.checkEnter(event)}
                value={this.state.message}
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={event => this.handleSubmit(event)}
              >
                Add
              </Button>
            </div>
          </Grid>
          <AlertDialog
            open={this.state.open}
            error={this.state.apiErrorMessage}
            isPalindrome={this.state.isPalindrome}
            handleOpenModal={() => this.handleOpenModal()}
            handleCloseModal={() => this.handleCloseModal()}
          />
        </Grid>
      </div>
    );
  }
}

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
    maxHeight: "350px",
    overflow: "auto"
  },
  listFooter: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    borderTop: "5px solid #eee",
    padding: "0 20px 20px 20px",
    flexDirection: "column"
  },
  textField: {
    flex: 1
  },
  button: {
    backgroundColor: "#009844"
  },
  listItem: {
    flex: "1 45%"
  },

  divider: {
    margin: "8px 0"
  }
});

MessagesList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MessagesList);
