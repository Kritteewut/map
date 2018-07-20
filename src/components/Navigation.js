import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ColorPicker from '../components/ColorPicker';

const drawerWidth = '25vw';

const styles = theme => ({
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },

});

class PermanentDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor={'left'}
                >
                    <Divider />
                    <List>
                        {this.props.currentPlanData.planName}
                    </List>
                    <Divider />
                    {this.props.planData.map(value => {
                        return (
                            <ListItem
                                button
                                key={value.planId}
                                onClick={() => this.props.onSelectCurrentPlanData(value)}>
                                <ListItemText primary={value.planName}>
                                </ListItemText>
                            </ListItem>
                        )
                    })}
                    <Divider />
                    <button style={{
                        bottom: 0,
                        position: 'absolute',
                        right: 0,
                    }}
                    >
                        บันทึก
                    </button>
                    <ColorPicker
                        onSetSelectedColor={this.props.onSetSelectedColor}
                    />
                </Drawer>
            </div>
        );
    }
}

PermanentDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PermanentDrawer);
