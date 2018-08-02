import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
    Menu: {
        position: 'absolute',
        top: theme.spacing.unit * 10,
        left: theme.spacing.unit,
        color: '#FFFFFF',
        background: 'linear-gradient(45deg, #424242 30%, #585858 90%)',
        boxShadow: '0 2px 4px 1px hsla(0, 0%, 0%, 0.27)'

    },
})

class openSideBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        //this.deleteme = this.deleteme.bind(this)
    }


    render() {
        const { classes } = this.props;


        return (
            <div >
                {this.props.openSide === false ?
<<<<<<< HEAD
=======

>>>>>>> 3b213b53b476ae87d46c1c98c27241d0058e18a5
                    <IconButton className={classes.Menu} onClick={this.props.handleDrawerOpen} >
                        <MenuIcon />
                    </IconButton>

                    :
<<<<<<< HEAD
=======

>>>>>>> 3b213b53b476ae87d46c1c98c27241d0058e18a5
                    <IconButton className={classes.Menu} onClick={this.props.handleDrawerClose} >
                        <MenuIcon />
                    </IconButton>
                }
            </div>
        )
    }
}

export default withStyles(styles)(openSideBtn)