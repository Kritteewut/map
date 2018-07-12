import { Component } from 'react'
import { createPortal } from 'react-dom'

export default class MapControl extends Component {

  componentWillMount() {
    this.map = window.map
    this.controlDiv = document.createElement('div')
    this.map.controls[this.props.position].push(this.controlDiv)
  }
  componentWillUnmount() {
    this.map.controls[this.props.position].removeAt(this.divIndex)
  }
  render() {
    return createPortal(this.props.children, this.controlDiv)
  }
}

