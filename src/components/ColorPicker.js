import React, { Component } from 'react';
import { TwitterPicker } from 'react-color';
const colorArray = ['#FF6900', '#ffa100', '#00ffe7', '#0dff00', '#8ED1FC', '#0693E3', '#ABB8C3', '#ff0004',
    '#9900EF', '#ff007e']

class ColorPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pickedColor: '#fff',
        };
    }

    handleChangeComplete = (color) => {
        this.setState({
            pickedColor: color.hex
        });
        this.props.onSetSelectedColor(color.hex)
    };

    render() {
        return (
            <div>
                <TwitterPicker
                    triangle={'hide'}
                    color={this.state.pickedColor}
                    colors={colorArray}
                    onChangeComplete={this.handleChangeComplete}
                />
            </div>
        )
    }
}
export default ColorPicker