import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Edit from '@material-ui/icons/Edit';

const styles = theme => ({
    Menu: {
        position: 'absolute',
        bottom: theme.spacing.unit * 12,
        left: theme.spacing.unit,
        color: 'white',
        background: 'linear-gradient(45deg, #6E6E6E 30%, #A4A4A4 90%)',
        boxShadow: '0 3px 5px 2px hsla(0, 0%, 0%, 0.27)'

    },
})

class openSideBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        //this.deleteme = this.deleteme.bind(this)
    }


    render() {
        const { classes } = this.props;
        // var self = this;
        // if (self.props.status === 'done') {
        //   if (self.state.isRender === false) {
        //     self.state.isRender = true;
        //     setTimeout(function () {
        //       self.renderControl()
        //     }, 0);
        //   }
        // }

        return (
            <div>
                {this.props.openOption == false ?
                    <Tooltip title="Open Option" placement="right">
                        <IconButton className={classes.Menu} onClick={this.props.handleOptionOpen} >
                            <Edit />
                        </IconButton>
                    </Tooltip>
                    :
                    <Tooltip title="Closed Option" placement="right">
                        <IconButton className={classes.Menu} onClick={this.props.handleOptionClose} >
                            <Edit />
                        </IconButton>
                    </Tooltip>}
            </div>
        )
    }
}

export default withStyles(styles)(openSideBtn)