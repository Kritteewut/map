import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import ColorPicker from './ColorPicker';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconPicker from './IconPicker';


const styles = theme => ({
    drawerPaper: {
        zIndex: 0,
        position: 'absolute',
        left: '35vw',
        right: '35vw',
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

