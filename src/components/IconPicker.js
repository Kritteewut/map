import React, { Component } from 'react';
import icon_point from './icons/icon_point.png'
import light_bulb_icon from './icons/light_bulb_icon.png'
import tools_icon from './icons/tools_icon.png'
import wifi_signal_icon from './icons/wifi_signal_icon.png'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
<<<<<<< HEAD
        width: '50%',
=======
        width: '100%',
>>>>>>> 5db27ee017713221f27ffc417729c03819caaa0d
        minHeigth: 200,

    },
    image: {
        position: 'relative',
<<<<<<< HEAD
        height: '8.7vw',
=======
        height: 200,
>>>>>>> 5db27ee017713221f27ffc417729c03819caaa0d
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
<<<<<<< HEAD
        width: '8.7vw',
=======
>>>>>>> 5db27ee017713221f27ffc417729c03819caaa0d
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
});

const images = [
    {
        src: icon_point,
        title: 'จุด',
        width: '5%',
        height: '5%',
    },
    {
        src: light_bulb_icon,
        title: 'หลอดไฟ',
        width: '5%',
        height: '5%',
    },
    {
        src: wifi_signal_icon,
        title: 'ไวไฟ',
        width: '5%',
        height: '5%',
    },
    {
        src: tools_icon,
        title: 'เครื่องมือ',
        width: '5%',
        height: '5%',
    },

];

class IconPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

        //this.onIconSelect = this.onIconSelect.bind(this)
    }
    onIconSelect(icon) {
        this.props.onSetSelectedIcon(icon)
    }
    render() {
        const { classes } = this.props;

        return (
<<<<<<< HEAD
            <div
                style={{
                    height: '8.7vw',
                }}>
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: this.props.left,
                        right: 0,
                        bottom: 0,
                    }}
                    className={classes.root}>
                    {images.map(image => (
                        <ButtonBase
                            focusRipple
                            key={image.title}
                            className={classes.image}
                            focusVisibleClassName={classes.focusVisible}
                            style={{
                                width: '8.7vw',
                            }}
                            onClick={() => this.onIconSelect(image.src)}
                        >

                            <span
                                className={classes.imageSrc}
                                style={{
                                    backgroundImage: `url(${image.src})`,
                                }}
                            />
                            <span className={classes.imageButton}>
                            </span>
                        </ButtonBase>
                    ))}
                </div>
=======
            <div className={classes.root}>
                {images.map(image => (
                    <ButtonBase
                        focusRipple
                        key={image.title}
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        style={{
                            width: image.width,
                        }}
                        onClick={() => this.onIconSelect(image.src)}
                    >
                        <span
                            className={classes.imageSrc}
                            style={{
                                backgroundImage: `url(${image.src})`,
                            }}
                        />
                        <span className={classes.imageButton}>
                        </span>
                    </ButtonBase>
                ))}
>>>>>>> 5db27ee017713221f27ffc417729c03819caaa0d
            </div>
        );
    }
}


IconPicker.propTypes = {
    classes: PropTypes.object.isRequired,
};

<<<<<<< HEAD
export default withStyles(styles)(IconPicker);
=======
export default withStyles(styles)(IconPicker);
>>>>>>> 5db27ee017713221f27ffc417729c03819caaa0d
