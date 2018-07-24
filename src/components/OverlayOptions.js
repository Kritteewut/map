import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import ColorPicker from './ColorPicker';
import Divider from '@material-ui/core/Divider';
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
        const { onChangePolyStrokeColor, onChangePolyFillColor } = this.props
        return (
            <div>
                <Drawer
                    variant="persistent"
                    anchor={'bottom'}
                    open={this.state.isOpen}
                //onClick={this.onToggleOpen}
                >
                    <ColorPicker
                        onChangePolyStrokeColor={onChangePolyStrokeColor}
                        onChangePolyFillColor={onChangePolyFillColor}
                    />
                </Drawer>
            </div>
        )
    }
}
export default OverlayOptions
