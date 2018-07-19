import React, { Component } from 'react';
import MyLocation from '@material-ui/icons/MyLocation';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
    LOL: {
        position: 'absolute',
        bottom: theme.spacing.unit * 5,
        left: theme.spacing.unit,
        color: 'white',
        background: 'linear-gradient(45deg, blue 30%, blue 90%)',

    },
})

class GeolocatedMe extends Component {
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
                <Tooltip title="Your Location" placement="right">
                    <IconButton className={classes.LOL} onClick={this.props.getGeolocation} >
                        <MyLocation />
                    </IconButton>
                </Tooltip>
            </div>
        )
    }
}
export default withStyles(styles)(GeolocatedMe)