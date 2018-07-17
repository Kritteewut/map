import React, { Component } from 'react';
import MapClass from './components/Map'
import Marker from './components/Marker';
import Polygon from './components/Polygon';
import Polyline from './components/Polyline';
import DrawOptionsPanel from './components/drawOptionsPanel';
import SearchBox from './components/searchBox';
import AddBtn from './components/AddBtn'
import ExampleLine from './components/ExampleLine';

function new_script(src) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.src = src;
    script.addEventListener('load', function () {
      resolve();
    });
    script.addEventListener('error', function (e) {
      reject(e);
    });
    document.body.appendChild(script);
  })
};

// Promise Interface can ensure load the script only once
var my_script = new_script('https://maps.googleapis.com/maps/api/js?&libraries=geometry,drawing,places&key=AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo&callback=initMap&v=3.32');

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      status: 'start',
      btnTypeCheck: '',
      overlayObject: [],
      overlayCoords: [],
      drawingPolygonCoords: [],
      drawingPolylineCoords: [],
      drawingMarkerCoords: [],
      overlayIndex: 0,
      selectedOverlay: [],
      isDrawing: '',
      exampleLineCoords: [],
      exampleLineObject: [],
    }
    this.onAddListenerMarkerBtn = this.onAddListenerMarkerBtn.bind(this)
    this.onAddListenerPolygonBtn = this.onAddListenerPolygonBtn.bind(this)
    this.onAddListenerPolylineBtn = this.onAddListenerPolylineBtn.bind(this)
    this.onAddListenerGrabBtn = this.onAddListenerGrabBtn.bind(this)
    this.addMarkerListener = this.addMarkerListener.bind(this)
    this.addPolygonListener = this.addPolygonListener.bind(this)
    this.addPolylineListener = this.addPolylineListener.bind(this)
    this.addExampleLineListener = this.addExampleLineListener.bind(this)
  }

  do_load = () => {
    var self = this;
    my_script.then(function () {
      self.setState({ 'status': 'done' });
    }).catch(function () {
      self.setState({ 'status': 'error' });
    })
  }
  onBtnTypeChange(type) {
    if (this.state.btnTypeCheck === type) {
      return true
    } else {
      this.setState({
        btnTypeCheck: type
      })
    }
  }
  onOverlayDrawingCoordsReset() {
    this.setState({
      drawingPolygonCoords: [],
      drawingPolylineCoords: [],
      drawingMarkerCoords: [],
    })
  }
  onExampleLineReset() {
    this.setState({
      exampleLineCoords: []
    })
  }
  onUtilitiesMethod() {

    var drawingPolygonCoords = this.state.drawingPolygonCoords
    var drawingPolylineCoords = this.state.drawingPolylineCoords
    var drawingMarkerCoords = this.state.drawingMarkerCoords

    if (drawingPolygonCoords.length > 1) {
      let overlayCoords = this.state.overlayCoords
      let overlayIndex = this.state.overlayIndex
      overlayCoords.push({ coords: drawingPolygonCoords, overlayIndex, overlayType: 'polygon' })
      this.setState((prevState) => {
        return {
          overlayCoords: overlayCoords,
          overlayIndex: prevState.overlayIndex + 1
        };
      }, () => console.log(overlayCoords, 'overlayCoords polygon added'));
    }
    if (drawingPolylineCoords.length > 1) {
      let overlayCoords = this.state.overlayCoords
      let overlayIndex = this.state.overlayIndex
      overlayCoords.push({ coords: drawingPolylineCoords, overlayIndex, overlayType: 'polyline' })
      this.setState((prevState) => {
        return {
          overlayCoords: overlayCoords,
          overlayIndex: prevState.overlayIndex + 1
        };
      }, () => console.log(overlayCoords, 'overlayCoords polyline added'));
    }
    if (drawingMarkerCoords.length === 1) {
      let overlayCoords = this.state.overlayCoords
      let overlayIndex = this.state.overlayIndex
      overlayCoords.push({ coord: drawingMarkerCoords, overlayIndex, overlayType: 'marker' })
      this.setState((prevState) => {
        return {
          overlayCoords: overlayCoords,
          overlayIndex: prevState.overlayIndex + 1
        };
      }, () => console.log(overlayCoords, 'overlayCoords marker added'));
    }
    this.onExampleLineReset()
    this.onOverlayDrawingCoordsReset()
  }
  onAddListenerMarkerBtn(btn) {
    var self = this
    window.google.maps.event.addDomListener(btn, 'click', function () {
      if (!(self.onBtnTypeChange('marker'))) {
        console.log('marker is click')
        self.onUtilitiesMethod()
        self.drawMarker()
        self.setState({
          isDrawing: 'marker'
        })
      }
    })
  }
  onAddListenerPolygonBtn(btn) {
    var self = this
    window.google.maps.event.addDomListener(btn, 'click', function () {
      if (!(self.onBtnTypeChange('polygon'))) {
        console.log('polygon is click')
        self.onUtilitiesMethod()
        self.drawPolygon()
        self.setState({
          isDrawing: 'polygon'
        })
      }
    })
  }
  onAddListenerPolylineBtn(btn) {
    var self = this
    window.google.maps.event.addDomListener(btn, 'click', function () {
      if (!(self.onBtnTypeChange('polyline'))) {
        console.log('polyline is click')
        self.onUtilitiesMethod()
        self.drawPolyline()
        self.setState({
          isDrawing: 'polyline'
        })
      }
    })
  }
  onAddListenerGrabBtn(btn) {
    var self = this
    window.google.maps.event.addDomListener(btn, 'click', function () {
      console.log('grab is click, clear all')
      window.google.maps.event.clearInstanceListeners(window.map)
      self.onUtilitiesMethod()
      self.onResetSelectedOverlay()
      self.onExampleLineReset()
      self.setState({
        isDrawing: ''
      })
      //window.map.setOptions({})
    })
  }
  onAddOverlayObject(overlay) {
    var temp = this.state.overlayObject
    temp.push(overlay)
    this.setState({
      overlayObject: temp
    }, () => console.log(this.state.overlayObject, 'overlay object'))
  }
  drawMarker() {
    var self = this
    window.google.maps.event.clearInstanceListeners(window.map)
    window.google.maps.event.addListener(window.map, 'click', function (event) {

      let overlayIndex = self.state.overlayIndex
      let drawingMarkerCoords = self.state.drawingMarkerCoords

      let lat = event.latLng.lat()
      let lng = event.latLng.lng()

      drawingMarkerCoords = [{ lat, lng }]

      self.setState({
        overlayIndex: overlayIndex,
        drawingMarkerCoords: drawingMarkerCoords,
      }, () => {
        self.onUtilitiesMethod()
        self.onOverlayDrawingCoordsReset()
      })
    })
  }
  drawPolyline() {
    var self = this

    window.google.maps.event.clearInstanceListeners(window.map)
    window.google.maps.event.addListener(window.map, 'click', function (event) {
      let lat = event.latLng.lat()
      let lng = event.latLng.lng()
      if (self.state.isDrawing === 'polyline') {
        let overlayIndex = self.state.overlayIndex
        self.setState({
          drawingPolylineCoords: [{ lat, lng }],
          overlayIndex: overlayIndex,
          isDrawing: '',
          btnTypeCheck: ''
        })
        self.onDrawExampleLine(event)
      } else {
        let drawingPolylineCoords = self.state.drawingPolylineCoords
        drawingPolylineCoords.push({ lat, lng })
        self.setState({
          drawingPolylineCoords: drawingPolylineCoords,
        })
        self.onDrawExampleLine(event)
      }
    })
  }
  drawPolygon() {
    var self = this
    window.google.maps.event.clearInstanceListeners(window.map)
    window.google.maps.event.addListener(window.map, 'click', function (event) {
      let lat = event.latLng.lat()
      let lng = event.latLng.lng()
      if (self.state.isDrawing === 'polygon') {
        let overlayIndex = self.state.overlayIndex
        self.setState({
          drawingPolygonCoords: [{ lat, lng }],
          overlayIndex: overlayIndex,
          isDrawing: '',
          btnTypeCheck: ''
        })
        self.onDrawExampleLine(event)
      } else {
        let drawingPolygonCoords = self.state.drawingPolygonCoords
        drawingPolygonCoords.push({ lat, lng })
        self.setState({
          drawingPolygonCoords: drawingPolygonCoords,
        })
        self.onDrawExampleLine(event)
      }
    })
  }
  onSetSelectOverlay(overlay) {
    this.onResetSelectedOverlay()

    if (overlay.overlayType === 'polygon' || overlay.overlayType === 'polyline') {
      overlay.setOptions({
        editable: true
      })
    }
    if (overlay.overlayType === 'marker') {
      overlay.setOptions({
        draggble: true
      })
    }
  }
  onResetSelectedOverlay() {
  }
  addMarkerListener(marker) {
    var self = this
    window.google.maps.event.addListener(marker, 'click', function () {
      self.onSetSelectOverlay(marker)
    })
  }
  addPolygonListener(polygon) {
    var self = this
    window.google.maps.event.addListener(polygon, 'mouseup', function (event) {
      self.onSetSelectOverlay(polygon)
      if (event.vertex !== undefined || event.edge !== undefined) {
        self.onPolyCoordsEdit(polygon)
      }
    })
  }
  addPolylineListener(polyline) {
    var self = this
    window.google.maps.event.addListener(polyline, 'mouseup', function (event) {
      self.onSetSelectOverlay(polyline)
      if (event.vertex !== undefined || event.edge !== undefined) {
        self.onPolyCoordsEdit(polyline)
      }
    })
  }
  addExampleLineListener(exampleLine) {
    var self = this
    window.google.maps.event.addListener(exampleLine, 'click', function () {

    })
  }
  onDrawExampleLine(clickEvent) {
    var self = this
    window.google.maps.event.addListener(window.map, 'mousemove', function (event) {
      let mousemoveLat = event.latLng.lat()
      let mousemoveLng = event.latLng.lng()
      let clickLat = clickEvent.latLng.lat()
      let clickLng = clickEvent.latLng.lng()
      self.setState({
        exampleLineCoords: [{ lat: clickLat, lng: clickLng }, { lat: mousemoveLat, lng: mousemoveLng }]
      })
    })
  }
  onSetExampleLineInvisible() {
    var exampleLine = this.state.exampleLineObject
    exampleLine.setOptions({
      visible: false
    })
  }
  onSetExampleLineVisible() {
    var exampleLine = this.state.exampleLineObject
    exampleLine.setOptions({
      visible: true
    })
  }
  onPolyCoordsEdit(poly) {
    var overlayCoords = this.state.overlayCoords
    var polyIndex = poly.overlayIndex
    var overlayIndex = this.state.overlayCoords.findIndex(overlay => overlay.overlayIndex === polyIndex)

    console.log(poly)
    //console.log(overlayCoords[overlayIndex].coords)

  }

  //rederrr
  render() {
    var self = this;
    if (self.state.status === 'start') {
      self.state.status = 'loading';
      setTimeout(function () {
        self.do_load()
      }, 0);
    }
    return (
      <div className="App">
        <MapClass>
          <Marker
            overlayDrawingCoords={this.state.drawingMarkerCoords}
            overlayIndex={this.state.overlayIndex}
            addMarkerListener={this.addPolygonListener}
            isDrawing={this.state.isDrawing}
          />

          <Polygon
            overlayDrawingCoords={this.state.drawingPolygonCoords}
            overlayIndex={this.state.overlayIndex}
            addPolygonListener={this.addPolygonListener}
            isDrawing={this.state.isDrawing}
          />

          <Polyline
            overlayDrawingCoords={this.state.drawingPolylineCoords}
            overlayIndex={this.state.overlayIndex}
            addPolylineListener={this.addPolylineListener}
            isDrawing={this.state.isDrawing}
          />

          <SearchBox
            status={this.state.status}
          />
          <ExampleLine
            overlayDrawingCoords={this.state.exampleLineCoords}
            addExampleLineListener={this.addExampleLineListener}
          />

        </MapClass>

        <AddBtn />
        <DrawOptionsPanel
          status={this.state.status}
          onAddListenerMarkerBtn={this.onAddListenerMarkerBtn}
          onAddListenerPolygonBtn={this.onAddListenerPolygonBtn}
          onAddListenerPolylineBtn={this.onAddListenerPolylineBtn}
          onAddListenerGrabBtn={this.onAddListenerGrabBtn}
        />
      </div>
    );
  }
}

export default App;
