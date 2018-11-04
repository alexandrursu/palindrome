import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";

class AlertDialog extends React.Component {
  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleCloseModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {this.props.error === "" ? (
              this.props.isPalindrome ? (
                <div style={styles.isPalindrome}>It's a palindrome!</div>
              ) : (
                <div style={styles.notPalindrome}>
                  Sorry, that's not a palindrome.
                </div>
              )
            ) : (
              this.props.error
            )}
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={this.props.handleCloseModal}
              variant="contained"
              color="primary"
              autoFocus
            >
              ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const styles = {
  isPalindrome: {
    color: "#009844"
  },
  notPalindrome: {
    color: "#ff0000"
  }
};

AlertDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  isPalindrome: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired
};

export default AlertDialog;
