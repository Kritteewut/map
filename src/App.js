import React, { Component } from 'react';
import MapClass from './components/Map'
import Marker from './components/Marker';
import Polygon from './components/Polygon';
import Polyline from './components/Polyline';
import SearchBox from './components/searchBox';
import AddBtn from './components/AddBtn'
import ExampleLine from './components/ExampleLine';
import ExamplePolygon from './components/ExamplePolygon';
import { db } from './config/firebase'
import NiceModal from './components/Modal'
import GeolocatedMe from './components/Geolocation'
import IconLabelButtons from './components/DrawingBtn'
import { Button } from '../node_modules/@material-ui/core';
import UserLocationMarker from './components/UserLocationMarker';
import Sidebar from './components/Sidebar';

const shapesRef = db.collection('shapes')
const planRef = db.collection('plan')

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
var my_script = new_script('https://maps.googleapis.com/maps/api/js?&libraries=geometry,drawing,places&key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&callback=initMap&v=3.32');
var my_script2 = new_script('https://cdn.rawgit.com/bjornharrtell/jsts/gh-pages/1.0.2/jsts.min.js')

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      status: 'start',
      btnTypeCheck: '',
      overlayObject: [],
      overlayCoords: [],
      overlayIndex: 0,
      selectedOverlay: [],
      isFirstDraw: true,
      exampleLineCoords: [],
      examplePolygonCoords: [],
      userLocationCoords: [],
      polylineLength: 0,
    }
    this.onAddListenerMarkerBtn = this.onAddListenerMarkerBtn.bind(this)
    this.onAddListenerPolygonBtn = this.onAddListenerPolygonBtn.bind(this)
    this.onAddListenerPolylineBtn = this.onAddListenerPolylineBtn.bind(this)
    this.onAddListenerGrabBtn = this.onAddListenerGrabBtn.bind(this)
    this.addMarkerListener = this.addMarkerListener.bind(this)
    this.addPolygonListener = this.addPolygonListener.bind(this)
    this.addPolylineListener = this.addPolylineListener.bind(this)
    this.onPolylineLengthCompute = this.onPolylineLengthCompute.bind(this)
    this.onSquereMetersTrans = this.onSquereMetersTrans.bind(this)
    this.onAddPlan = this.onAddPlan.bind(this)
    this.getGeolocation = this.getGeolocation.bind(this)

  }

  do_load = () => {
    var self = this;

    my_script.then(function () {
      self.setState({ 'status': 'done' });
    }).catch(function () {
      self.setState({ 'status': 'error' });
    })
    my_script2.then(function () {

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
  onExampleLineReset() {
    this.setState({
      exampleLineCoords: []
    })
  }
  onClearSomeMapEventListener() {
    window.google.maps.event.clearListeners(window.map, 'click')
    window.google.maps.event.clearListeners(window.map, 'mousemove')
  }
  onUtilitiesMethod() {
    var isFirstDraw = this.state.isFirstDraw
    if (isFirstDraw === false) {
      this.setState((prevState) => {
        return {
          overlayIndex: prevState.overlayIndex + 1,
          isFirstDraw: true
        };
      }, () => console.log(this.state.overlayCoords, 'overlayCoords'));
    }
    this.onExampleLineReset()
    //this.onResetSelectedOverlay()
  }
  onAddListenerMarkerBtn() {
    if (!(this.onBtnTypeChange('marker'))) {
      this.onUtilitiesMethod()
      this.onClearSomeMapEventListener()
      this.onSetDrawingCursor()
      this.drawMarker()
    }
  }
  onAddListenerPolygonBtn() {
    if (!(this.onBtnTypeChange('polygon'))) {
      this.onUtilitiesMethod()
      this.onClearSomeMapEventListener()
      this.onSetDrawingCursor()
      this.drawPolygon()
    }
  }
  onAddListenerPolylineBtn() {
    if (!(this.onBtnTypeChange('polyline'))) {
      this.onUtilitiesMethod()
      this.onClearSomeMapEventListener()
      this.onSetDrawingCursor()
      this.drawPolyline()
    }
  }
  onAddListenerGrabBtn() {
    this.onUtilitiesMethod()
    this.onClearSomeMapEventListener()
    this.onSetDragMapCursor()
    this.setState({
      btnTypeCheck: ''
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
    window.google.maps.event.addListener(window.map, 'click', function (event) {
      let overlayIndex = self.state.overlayIndex
      let isFirstDraw = self.state.isFirstDraw
      let overlayCoords = self.state.overlayCoords
      let lat = event.latLng.lat()
      let lng = event.latLng.lng()
      if (isFirstDraw === true) {
        overlayCoords.push({ coords: [{ lat, lng }], overlayIndex, overlayType: 'marker', overlayDrawType: 'draw' })
      }
      self.setState({
        overlayCoords: overlayCoords,
        btnTypeCheck: '',
        isFirstDraw: false,
      }, () => {
        self.onUtilitiesMethod()
      })
    })
  }
  drawPolyline() {
    var self = this
    window.google.maps.event.addListener(window.map, 'click', function (event) {
      let lat = event.latLng.lat()
      let lng = event.latLng.lng()
      if (self.state.isFirstDraw === true) {
        let overlayIndex = self.state.overlayIndex
        let overlayCoords = self.state.overlayCoords
        overlayCoords.push({ coords: [{ lat, lng }], overlayIndex, overlayType: 'polyline', overlayDrawType: 'draw' })
        self.setState({
          isFirstDraw: false,
          btnTypeCheck: '',
          overlayCoords: overlayCoords,
        })
        self.onDrawExampleLine(event)
      } else {
        let overlayCoords = self.state.overlayCoords
        let coords = overlayCoords[overlayCoords.length - 1].coords
        coords.push({ lat, lng })
        self.setState(
          overlayCoords[overlayCoords.length - 1].coords = coords
        )
        self.onDrawExampleLine(event)
      }

    })
  }
  drawPolygon() {
    var self = this
    window.google.maps.event.addListener(window.map, 'click', function (event) {
      let lat = event.latLng.lat()
      let lng = event.latLng.lng()
      if (self.state.isFirstDraw === true) {
        let overlayIndex = self.state.overlayIndex
        let overlayCoords = self.state.overlayCoords
        overlayCoords.push({ coords: [{ lat, lng }], overlayIndex, overlayType: 'polygon', overlayDrawType: 'draw' })
        self.setState({
          isFirstDraw: false,
          btnTypeCheck: '',
          overlayCoords: overlayCoords,
        })
        //() => console.log(overlayCoords[overlayCoords.length - 1].coords)
        //self.onDrawExamplePolygon(coords)
        self.onDrawExampleLine(event)
      } else {
        let overlayCoords = self.state.overlayCoords
        let coords = overlayCoords[overlayCoords.length - 1].coords
        coords.push({ lat, lng })
        self.setState(
          overlayCoords[overlayCoords.length - 1].coords = coords
        )
        //self.onDrawExamplePolygon(coords)
        self.onDrawExampleLine(event)
      }
    })
  }
  onSetSelectOverlay(overlay) {
    this.onResetSelectedOverlay(overlay)
    if (overlay.overlayType === 'polygon' || overlay.overlayType === 'polyline') {
      overlay.setOptions({
        editable: true,
      })
    }
    if (overlay.overlayType === 'marker') {
      overlay.setOptions({
        draggable: true
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
  onDrawExamplePolygon(coords) {
    var self = this
    let tempCoords = coords
    window.google.maps.event.addListener(window.map, 'mousemove', function (event) {
      let mousemoveLat = event.latLng.lat()
      let mousemoveLng = event.latLng.lng()

      let length = coords.length
      tempCoords[length] = { lat: mousemoveLat, lng: mousemoveLng }

      console.log(tempCoords, 'exam')

      // self.setState({
      //   examplePolygonCoords: coords
      // })

    })
  }
  onPolyCoordsEdit(poly) {
    let overlayCoords = this.state.overlayCoords
    let polyIndex = poly.overlayIndex
    let overlayIndex = overlayCoords.findIndex(overlay => overlay.overlayIndex === polyIndex)

    let editCoords = []

    poly.getPath().b.forEach(element => {
      let lat = element.lat()
      let lng = element.lng()
      editCoords.push({ lat, lng })
    })
    this.setState(
      overlayCoords[overlayIndex].coords = editCoords
    )
    console.log(this.state.overlayCoords, 'ediited coords')
  }

  onSetDrawingCursor() {
    window.map.setOptions({
      draggableCursor: 'crosshair'
    })
  }
  onSetDragMapCursor() {
    window.map.setOptions({
      draggableCursor: null,
      draggingCursor: null
    })
  }
  onPolylineLengthCompute = (polyline) => {
    var length = window.google.maps.geometry.spherical.computeLength(polyline.getPath())
    return console.log('ความยาวรวม', length.toFixed(3), 'เมตร')
  }
  onSquereMetersTrans(polygon) {
    var area = window.google.maps.geometry.spherical.computeArea(polygon.getPath())
    let rnwString = ''
    var rai, ngan, wa, temp1, temp2

    rai = Math.floor(area / 1600)
    temp1 = area % 1600
    ngan = Math.floor(temp1 / 400)
    temp2 = temp1 % 400
    wa = parseFloat((temp2 / 4).toFixed(3), 10)

    if (rai > 0) {
      rnwString = ''
      rnwString = rnwString + rai + ' ไร่ '
    }
    if (ngan > 0) {
      rnwString = rnwString + ngan + ' งาน '
    }
    if (wa > 0) {
      rnwString = rnwString + wa + ' ตารางวา '
    }
    else { rnwString = '0 ตารางวา' }

    return console.log('พื้นที่คือ ', rnwString)
  }
  onSaveToFirestore() {
    let self = this
    let overlayCoords = this.state.overlayCoords
    overlayCoords.map(value => {
      // add coords array to cloud firestore
      shapesRef.add({
        // add data here
        coords: value.coords,
        overlayType: value.overlayType,
        //planId: value['planId'],
        //overlayOptions: value['overlayOptions'],
      }).then(
        console.log('notice me senpai!')
      )
      return null;
    })
    self.setState({
      overlayCoords: []
    }, () => self.onOverlayRedraw())
  }
  onOverlayRedraw() {
    let self = this
    let overlayCoords = this.state.overlayCoords

    shapesRef.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {

        let coords = doc.data().coords
        let overlayIndex = doc.id
        let overlayType = doc.data().overlayType

        overlayCoords.push({
          coords: coords,
          overlayIndex: overlayIndex,
          overlayType: overlayType,
          overlayDrawType: 'redraw'
        })
      })
      self.setState({
        overlayCoords: overlayCoords
      })
    })
  }
  onAddPlan(planName) {
    planRef.add({
      planName
    })

    planRef.onSnapshot(function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        if (change.type === "added") {
          console.log("New city: ", change.doc.data(), change.doc.id);
        }
        if (change.type === "modified") {
          console.log("Modified city: ", change.doc.data());
        }
        if (change.type === "removed") {
          console.log("Removed city: ", change.doc.data());
        }
      });
    });

  }
  getGeolocation() {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords)
      window.map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude })
      window.map.setZoom(18)
      window.map.panTo({ lat: position.coords.latitude, lng: position.coords.longitude })
      this.setState({
        userLocationCoords: [{ lat: position.coords.latitude, lng: position.coords.longitude }]
      })
    })
  }
  render() {
    var self = this;
    if (self.state.status === 'start') {
      self.state.status = 'loading';
      setTimeout(function () {
        self.do_load()
      }, 0);
    }
    return (
      <div
        className="App"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'flex-end',
          alignItems: 'center',
          zIndex: -1,
        }}
      >
        <MapClass>
          {this.state.overlayCoords.map(value => {
            let overlayCoords = value.coords
            let overlayIndex = value.overlayIndex
            let overlayDrawType = value.overlayDrawType

            if (value.overlayType === 'polygon') {
              return (
                <Polygon
                  key={overlayIndex}
                  overlayCoords={overlayCoords}
                  overlayIndex={overlayIndex}
                  overlayDrawType={overlayDrawType}
                  addPolygonListener={this.addPolygonListener}
                  onSquereMetersTrans={this.onSquereMetersTrans}
                />
              )
            }
            if (value.overlayType === 'polyline') {
              return (
                <Polyline
                  key={overlayIndex}
                  overlayCoords={overlayCoords}
                  overlayIndex={overlayIndex}
                  overlayDrawType={overlayDrawType}
                  addPolylineListener={this.addPolylineListener}
                  onPolylineLengthCompute={this.onPolylineLengthCompute}
                />)
            }
            if (value.overlayType === 'marker') {
              return (
                <Marker
                  key={overlayIndex}
                  overlayCoords={overlayCoords}
                  overlayIndex={overlayIndex}
                  overlayDrawType={overlayDrawType}
                  addMarkerListener={this.addMarkerListener}
                />
              )
            }
            return null;
          })
          }
          <SearchBox
            status={this.state.status}
          />
          <ExampleLine
            exampleLineCoords={this.state.exampleLineCoords}
            onPolylineLengthCompute={this.onPolylineLengthCompute}
          />
          <ExamplePolygon
            examplePolygonCoords={this.state.examplePolygonCoords}
          />
          <UserLocationMarker
            userLocationCoords={this.state.userLocationCoords}
          />

          <GeolocatedMe
            getGeolocation={this.getGeolocation}
          />
          <NiceModal
            onAddPlan={this.onAddPlan}
          />

          <IconLabelButtons
            onAddListenerMarkerBtn={this.onAddListenerMarkerBtn}
            onAddListenerPolygonBtn={this.onAddListenerPolygonBtn}
            onAddListenerPolylineBtn={this.onAddListenerPolylineBtn}
            onAddListenerGrabBtn={this.onAddListenerGrabBtn}
          />
          <Sidebar />
        </MapClass>
      </div>
    );
  }
}

export default App;
