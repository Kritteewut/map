import React, { Component } from 'react';
import { TwitterPicker } from 'react-color';
const colorArray = ['#ff6900', '#ffa100', '#00ffe7', '#0dff00', '#8ed1fc', '#0693E3', '#abb8C3', '#ff0004',
    '#9900ef', '#ff007e']

class ColorPicker extends Component {
    constructor(props) {
        super(props)
        this.state = { pickedColor: '#ffffff', btnType: 'strokeColor', };
        this.handleStrokeColorButtonClick = this.handleStrokeColorButtonClick.bind(this)
        this.handleFillColorButtonClick = this.handleFillColorButtonClick.bind(this)

    }
    handleChangeComplete = (color) => {
        const { btnType } = this.state
        this.setState({
            pickedColor: color.hex
        });
        if (btnType === 'strokeColor') {
            this.props.onChangePolyStrokeColor(color.hex)
        }
        if (btnType === 'fillColor') {
            this.props.onChangePolyFillColor(color.hex)
        }
    };
    handleStrokeColorButtonClick() {
        this.setState({ btnType: 'strokeColor', })
    }
    handleFillColorButtonClick() {
        this.setState({ btnType: 'fillColor', })
    }
    render() {
        const { pickedColor } = this.state
        return (

            <div>
                <button
                    onClick={this.handleStrokeColorButtonClick}
                >
                    เปลี่ยนสีเส้น
                    </button>
                <button
                    onClick={this.handleFillColorButtonClick}
                >
                    เปลี่ยนสีพื้นที่
                    </button>

                <TwitterPicker
                    triangle={'hide'}
                    color={pickedColor}
                    colors={colorArray}
                    onChangeComplete={this.handleChangeComplete}
                />
            </div>
        )
    }
}
export default ColorPicker