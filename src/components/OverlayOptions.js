import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import ColorPicker from './ColorPicker';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconPicker from './IconPicker';


const styles = theme => ({
    drawerPaper: {
        zIndex: 0,
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
        const { classes } = this.props;
        const { onChangePolyStrokeColor,
            onChangePolyFillColor,
            isOverlayOptionsOpen,
            overlayOptionsType,
            onSetSelectedIcon,
            selectedOverlay,
        } = this.props
        return (
            <Drawer
                // classes={{
                //     paper: classes.drawerPaper,
                // }}

                width="50%"
                variant="persistent"
                anchor={this.props.openOption}
                open={isOverlayOptionsOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                {overlayOptionsType === 'marker' ?
                    <div>
                        <IconPicker
                            onSetSelectedIcon={onSetSelectedIcon}
                            left={this.props.left}
                        />

                        {selectedOverlay !== null ?
                            <div>
                                lat : {selectedOverlay.getPosition().lat()}
                                ,
                                lng : {selectedOverlay.getPosition().lng()}
                            </div>
                            : null
                        }

                    </div>
                    :
                    <ColorPicker
                        onChangePolyStrokeColor={onChangePolyStrokeColor}
                        onChangePolyFillColor={onChangePolyFillColor}
                        left={this.props.left}
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
