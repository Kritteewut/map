import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import ColorPicker from './ColorPicker';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconPicker from './IconPicker';


const styles = theme => ({
    drawerPaper: {
<<<<<<< HEAD
        zIndex: 0,
=======
        position: 'absolute',
        left: '35vw',
        right: '35vw',
        justifyContent: 'flex-end',
        alignItems: 'center',
>>>>>>> 5db27ee017713221f27ffc417729c03819caaa0d
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
<<<<<<< HEAD
            overlayOptionsType,
            onSetSelectedIcon, } = this.props
=======
            isOverlayOptionsOpen,
            overlayOptionsType,
            onSetSelectedIcon,
            selectedOverlay,
        } = this.props
>>>>>>> 5db27ee017713221f27ffc417729c03819caaa0d
        return (
            <Drawer
                // classes={{
                //     paper: classes.drawerPaper,
                // }}
<<<<<<< HEAD
                variant="persistent"
                anchor={'bottom'}
                open={this.props.openOption}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                {overlayOptionsType === 'marker' ?
                    <IconPicker
                        onSetSelectedIcon={onSetSelectedIcon}
                        left={this.props.left}
                    />
=======
                width="50%"
                variant="persistent"
                anchor={'bottom'}
                open={isOverlayOptionsOpen}
            >
                {overlayOptionsType === 'marker' ?
                    <div>
                        <IconPicker
                            onSetSelectedIcon={onSetSelectedIcon}
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
>>>>>>> 5db27ee017713221f27ffc417729c03819caaa0d
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

<<<<<<< HEAD
export default withStyles(styles, { withTheme: true })(OverlayOptions);
=======
export default withStyles(styles, { withTheme: true })(OverlayOptions);

>>>>>>> 5db27ee017713221f27ffc417729c03819caaa0d
