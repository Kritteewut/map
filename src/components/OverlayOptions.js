import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import ColorPicker from './ColorPicker';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconPicker from './IconPicker';


const styles = theme => ({
    drawerPaper: {
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});

class OverlayOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
        }
        this.onToggleOpen = this.onToggleOpen.bind(this)

        //this.deleteme = this.deleteme.bind(this)
    }
    onToggleOpen = () => {
        console.log('toggle')
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render() {
        const { classes, theme } = this.props;
        const { onChangePolyStrokeColor,
            onChangePolyFillColor,
            isOverlayOptionsOpen,
            overlayOptionsType,
            onSetSelectedIcon, } = this.props
        return (
            <Drawer
                // classes={{
                //     paper: classes.drawerPaper,
                // }}
                variant="persistent"
                anchor={'bottom'}
                open={isOverlayOptionsOpen}
            >
                {overlayOptionsType === 'marker' ?
                    <IconPicker
                        onSetSelectedIcon={onSetSelectedIcon}
                    />
                    :
                    <ColorPicker
                        onChangePolyStrokeColor={onChangePolyStrokeColor}
                        onChangePolyFillColor={onChangePolyFillColor}
                    />
                }
            </Drawer>
        )
    }
}

OverlayOptions.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(OverlayOptions);

