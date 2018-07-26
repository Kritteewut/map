import React, { Component } from 'react';
import { TwitterPicker } from 'react-color';
const colorArray = ['#FF6900', '#ffa100', '#00ffe7', '#0dff00', '#8ED1FC', '#0693E3', '#ABB8C3', '#ff0004',
    '#9900EF', '#ff007e']

class ColorPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pickedColor: '#ffffff',
            btnType: 'strokeColor',
        };
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
        this.setState({
            btnType: 'strokeColor',
        })
    }
    handleFillColorButtonClick() {
        this.setState({
            btnType: 'fillColor',
        })
    }

    render() {
        const { pickedColor } = this.state
        return (

            <div style={{
                height: '8.7vw',
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: this.props.left,
                    right: 0,
                    bottom: 0,
                }}>
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

            </div>
        )
    }
}
export default ColorPicker