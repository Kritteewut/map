import React, { Component } from 'react';
import MapClass from './components/Map'
import Marker from './components/Marker';
import Polygon from './components/Polygon';
import Polyline from './components/Polyline';
import SearchBox from './components/searchBox';
import ExampleLine from './components/ExampleLine';
import ExamplePolygon from './components/ExamplePolygon';
import NiceModal from './components/Modal';
import GeolocatedMe from './components/Geolocation';
import IconLabelButtons from './components/DrawingBtn';
import UserLocationMarker from './components/UserLocationMarker';
import PermanentDrawer from './components/Navigation'
import { db } from './config/firebase'
import OverlayOptions from './components/OverlayOptions';
import OpenSide from './components/openSideBtn';
import OpenOption from './components/openOption'
import icon_point from './components/icons/icon_point.png';
import DetailedExpansionPanel from './components/DetailedExpansionPanel'
import CircleAroundMarker from './components/CircleAroundMarker';

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
  static async getInitialProps(props) {
    return console.log('get init!', props)
    // auth.onAuthStateChanged((user) => {
    //     if (user) {
    //         this.setState({ user });
    //         console.log(user)
    //     }
    // });
  }
  constructor(props) {
    super(props)
    this.state = {
      status: 'start',
      btnTypeCheck: '',
      overlayCoords: [],
      overlayIndex: 0,
      selectedOverlay: null,
      isFirstDraw: true,
      exampleLineCoords: [],
      examplePolygonCoords: [],
      userLocationCoords: [],
      polylineLength: 0,
      planData: [],
      currentPlanData: [],
      fillColor: '#ffa500',
      strokeColor: '#ff4500',
      user: null,
      selectedColor: '',
      openSide: false,
      openOption: false,
      left: '0vw',
      bottom: '0vw',
      isOverlayOptionsOpen: false,
      overlayOptionsType: '',
      icon: icon_point,
      currentDate: new Date(),
      circleAroundMarkerCoords: [],
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
    this.onSelectCurrentPlanData = this.onSelectCurrentPlanData.bind(this)
    this.onSaveToFirestore = this.onSaveToFirestore.bind(this)
    this.onSetUser = this.onSetUser.bind(this)
    this.onChangePolyStrokeColor = this.onChangePolyStrokeColor.bind(this)
    this.onChangePolyFillColor = this.onChangePolyFillColor.bind(this)
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
    this.handleDrawerClose = this.handleDrawerClose.bind(this)
    this.handleOptionOpen = this.handleOptionOpen.bind(this)
    this.onSetSelectedIcon = this.onSetSelectedIcon.bind(this)

  }
  componentDidMount() {
    this.onQueryPlanFromFirestore()
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
      this.setState({ btnTypeCheck: type })
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
    const { isFirstDraw, overlayCoords } = this.state
    if (isFirstDraw === false) {
      const currentOvrelay = overlayCoords[overlayCoords.length - 1]
      const coordsLength = currentOvrelay.coords.length
      if (currentOvrelay.overlayType === 'polygon' && coordsLength < 3) {
        overlayCoords.splice(overlayCoords.length - 1, 1)
        alert('รูปหลายเหลี่ยมที่มีจำนวนจุดมากกว่าสองจุดเท่านั้นจึงจะถูกบันทึกได้')
      }
      if (currentOvrelay.overlayType === 'polyline' && coordsLength < 2) {
        overlayCoords.splice(overlayCoords.length - 1, 1)
        alert('เส้นเชื่อมที่มีจำนวนจุดมากหนึ่งจุดเท่านั้นจึงจะถูกบันทึกได้')
      }
      this.setState((prevState) => {
        return {
          overlayIndex: prevState.overlayIndex + 1,
          isFirstDraw: true
        };
      }, () => console.log(this.state.overlayCoords, 'overlayCoords'));
    }
    this.onExampleLineReset()
    this.onResetSelectedOverlay()
  }
  onAddListenerMarkerBtn() {
    this.onUtilitiesMethod()
    if (!(this.onBtnTypeChange('marker'))) {
      this.onSetMarkerOptions()
      this.onOverlayOptionsClose()
      this.onOverlayOptionsOpen()
      this.onClearSomeMapEventListener()
      this.onSetDrawingCursor()
      this.drawMarker()
    }
  }
  onAddListenerPolygonBtn() {
    this.onUtilitiesMethod()
    if (!(this.onBtnTypeChange('polygon'))) {
      this.onSetPolyOptions()
      this.onOverlayOptionsClose()
      this.onOverlayOptionsOpen()
      this.onClearSomeMapEventListener()
      this.onSetDrawingCursor()
      this.drawPolygon()
    }
  }
  onAddListenerPolylineBtn() {
    this.onUtilitiesMethod()
    if (!(this.onBtnTypeChange('polyline'))) {
      this.onOverlayOptionsClose()
      this.onOverlayOptionsOpen()
      this.onSetPolyOptions()
      this.onClearSomeMapEventListener()
      this.onSetDrawingCursor()
      this.drawPolyline()
    }
  }
  onAddListenerGrabBtn() {
    this.onOverlayOptionsClose()
    this.onClearSomeMapEventListener()
    this.onUtilitiesMethod()
    this.onSetDragMapCursor()
    this.setState({
      btnTypeCheck: ''
    })
  }
  drawMarker() {
    var self = this
    window.google.maps.event.addListener(window.map, 'click', function (event) {
      let { overlayIndex, isFirstDraw, overlayCoords, icon } = self.state
      let lat = event.latLng.lat()
      let lng = event.latLng.lng()
      if (isFirstDraw === true) {
        overlayCoords.push({
          coords: [{ lat, lng }],
          overlayIndex,
          overlayType: 'marker',
          overlayDrawType: 'draw',
          icon: icon,
        })
      }
      self.setState({
        overlayCoords,
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
        let { overlayIndex, overlayCoords, strokeColor } = self.state
        overlayCoords.push({
          coords: [{ lat, lng }],
          overlayIndex,
          overlayType: 'polyline',
          overlayDrawType: 'draw',
          strokeColor: strokeColor,
        })
        self.setState({
          isFirstDraw: false,
          btnTypeCheck: '',
          overlayCoords,
        })
        self.onDrawExampleLine(event)
      } else {
        let { overlayCoords } = self.state
        overlayCoords[overlayCoords.length - 1].coords.push({ lat, lng })
        self.setState({ overlayCoords })
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
        let { overlayIndex, overlayCoords, fillColor, strokeColor } = self.state
        overlayCoords.push({
          coords: [{ lat, lng }],
          overlayIndex,
          overlayType: 'polygon',
          overlayDrawType: 'draw',
          fillColor: fillColor,
          strokeColor: strokeColor,
        })
        self.setState({
          isFirstDraw: false,
          btnTypeCheck: '',
          overlayCoords
        })
        self.onDrawExamplePolygon()
        //self.onDrawExampleLine(event)
      } else {
        let { overlayCoords } = self.state
        overlayCoords[overlayCoords.length - 1].coords.push({ lat, lng })
        self.setState({ overlayCoords })
        self.onDrawExamplePolygon()
        //self.onDrawExampleLine(event)
      }
    })
  }
  onSetSelectOverlay(overlay) {
    this.onResetSelectedOverlay()
    if (overlay.overlayType === 'polygon' || overlay.overlayType === 'polyline') {
      overlay.setOptions({ editable: true, })
      this.setState({ selectedOverlay: overlay })
    }
    if (overlay.overlayType === 'marker') {
      overlay.setOptions({ draggable: true, })
      var coords = { lat: overlay.getPosition().lat(), lng: overlay.getPosition().lng() }
      this.setState({ selectedOverlay: overlay, circleAroundMarkerCoords: coords })

      // window.google.maps.event.addListener(window.map, 'zoom_changed', function () {
      // })
    }
  }
  onResetSelectedOverlay() {
    const { selectedOverlay } = this.state
    if (selectedOverlay !== null) {
      if (selectedOverlay.overlayType === 'polygon' || selectedOverlay.overlayType === 'polyline') {
        selectedOverlay.setOptions({ editable: false, })
        this.setState({ selectedOverlay: null })
      }
      if (selectedOverlay.overlayType === 'marker') {
        selectedOverlay.setOptions({ draggable: false, })
        this.setState({ selectedOverlay: null })
      }
    }
  }
  addMarkerListener(marker) {
    var self = this
    window.google.maps.event.addListener(marker, 'mousedown', function () {
      self.onSetMarkerOptions()
      self.onOverlayOptionsOpen()
      self.onSetSelectOverlay(marker)
    })
    window.google.maps.event.addListener(marker, 'drag', function () {
      self.setState({
        selectedOverlay: marker
      })
    })
    window.google.maps.event.addListener(marker, 'dragend', function () {
      let overlayCoords = self.state.overlayCoords
      let markerIndex = marker.overlayIndex
      let overlayIndex = overlayCoords.findIndex(overlay => overlay.overlayIndex === markerIndex)
      let editCoords = []
      editCoords = [{ lat: marker.getPosition().lat(), lng: marker.getPosition().lng() }]
      overlayCoords[overlayIndex].coords = editCoords
      self.setState({ overlayCoords })
      console.log(self.state.overlayCoords[overlayIndex], 'ediited coords')
    })
  }
  addPolygonListener(polygon) {
    var self = this
    window.google.maps.event.addListener(polygon, 'click', function () {
      self.onSetPolyOptions()
      self.onOverlayOptionsOpen()
      self.onSetSelectOverlay(polygon)
    })
    window.google.maps.event.addListener(polygon, 'mouseup', function (event) {
      if (event.vertex !== undefined || event.edge !== undefined) {
        self.onPolyCoordsEdit(polygon)
      }
    })
  }
  addPolylineListener(polyline) {
    var self = this
    window.google.maps.event.addListener(polyline, 'click', function () {
      self.onSetPolyOptions()
      self.onOverlayOptionsOpen()
      self.onSetSelectOverlay(polyline)
    })
    window.google.maps.event.addListener(polyline, 'mouseup', function (event) {
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
  onDrawExamplePolygon() {
    var { overlayCoords } = this.state
    var coords = overlayCoords[overlayCoords.length - 1].coords
    var length = coords.length
    window.google.maps.event.addListener(window.map, 'mousemove', function (event) {
      console.log(length, 'coords')
      // let mousemoveLat = event.latLng.lat()
      // let mousemoveLng = event.latLng.lng()
      // let length = coords.length
      // tempCoords[length] = { lat: mousemoveLat, lng: mousemoveLng }
      // console.log(tempCoords, 'exam')


      // self.setState({
      //   examplePolygonCoords: coords
      // })

    })
  }
  onPolyCoordsEdit(polygon) {
    let overlayCoords = this.state.overlayCoords
    let polyIndex = polygon.overlayIndex
    let overlayIndex = overlayCoords.findIndex(overlay => overlay.overlayIndex === polyIndex)
    let editCoords = []
    polygon.getPath().b.forEach(element => {
      let lat = element.lat()
      let lng = element.lng()
      editCoords.push({ lat, lng })
    })
    overlayCoords[overlayIndex].coords = editCoords
    this.setState({ overlayCoords })
    console.log(this.state.overlayCoords[overlayIndex], 'ediited coords')
  }
  onMarkerCoordsEdit(marker) {

  }
  onSetDrawingCursor() {
    window.map.setOptions({ draggableCursor: 'crosshair' })
  }
  onSetDragMapCursor() {
    window.map.setOptions({ draggableCursor: null, draggingCursor: null })
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
    if (ngan > 0) { rnwString = rnwString + ngan + ' งาน ' }
    if (wa > 0) { rnwString = rnwString + wa + ' ตารางวา ' }
    else { rnwString = '0 ตารางวา' }
    return console.log('พื้นที่คือ ', rnwString)
  }
  onSaveToFirestore() {
    let self = this
    let overlayCoords = this.state.overlayCoords
    overlayCoords.map(value => {
      // add coords array to cloud firestore
      if (value.overlayDrawType === 'draw') {
        shapesRef.add({
          // add data here
          coords: value.coords,
          overlayType: value.overlayType,
          planId: value.planId,
          //overlayOptions: value['overlayOptions'],
        }).then(
          console.log('notice me senpai!'))
      } else {
        shapesRef.doc(value.overlayIndex).set({
          coords: value.coords,
        }, { merge: true });
      }
      return null;
    })
    self.onOverlayRedraw()
  }
  onOverlayRedraw() {
    let self = this
    let planId = self.state.currentPlanData.planId
    this.setState({ overlayCoords: [] })
    shapesRef.where('planId', '==', planId).get().then(function (querySnapshot) {
      let overlayCoords = self.state.overlayCoords
      querySnapshot.forEach(function (doc) {
        let coords = doc.data().coords
        let overlayIndex = doc.id
        let overlayType = doc.data().overlayType
        overlayCoords.push({
          coords: coords,
          overlayIndex: overlayIndex,
          overlayType: overlayType,
          overlayDrawType: 'redraw',
          planId,
        })
      })
      self.setState({ overlayCoords: overlayCoords })
      self.onFitBounds(overlayCoords)
    })

  }
  onAddPlan(planName) {
    var self = this
    var uid = this.state.user.uid

    planRef.add({ planName, uid })
    planRef.onSnapshot(function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        if (change.type === "added") {
          //console.log(change.doc.data())
          self.onQueryPlanFromFirestore()
        }
      });
    });
  }
  getGeolocation() {
    var LatLngString = ''
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords)
      window.map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude })
      window.map.setZoom(18)
      window.map.panTo({ lat: position.coords.latitude, lng: position.coords.longitude })
      LatLngString = 'lattitude : ' + position.coords.latitude.toFixed(4) + ' , ' + 'longtitude : ' + position.coords.longitude.toFixed(4)
      this.setState({
        userLocationCoords: [{ lat: position.coords.latitude, lng: position.coords.longitude }],
        userLocation: LatLngString,
        yourLocation: 'Your Location'
      })
    })
  }
  onQueryPlanFromFirestore() {
    // get all plan list from frirestore filter by user ID
    this.setState({
      planData: []
    })
    let planData = this.state.planData
    var self = this
    planRef.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        planData.push({
          planName: doc.data().planName,
          planId: doc.id,
        })
      })
      self.setState({
        planData: planData
      })
    })

  }
  onSelectCurrentPlanData(planData) {
    var self = this
    this.setState({
      currentPlanData: planData
    }, () => self.onOverlayRedraw())
    console.log(this.state.currentPlanData)
  }

  onFitBounds(overlayCoords) {
    if (overlayCoords.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      overlayCoords.forEach(value => {
        value.coords.forEach(value2 => {
          bounds.extend(new window.google.maps.LatLng(value2))
        })
      })
      window.map.fitBounds(bounds)
    }
  }
  onChangePolyStrokeColor(color) {
    var { selectedOverlay, overlayCoords } = this.state
    if (selectedOverlay !== null) {
      selectedOverlay.setOptions({
        strokeColor: color
      })
      let polyIndex = selectedOverlay.overlayIndex
      let overlayIndex = overlayCoords.findIndex(overlay => overlay.overlayIndex === polyIndex)
      overlayCoords[overlayIndex].strokeColor = color
      this.setState({ overlayCoords })
    }
    this.setState({
      strokeColor: color
    })
  }
  onChangePolyFillColor(color) {
    var { selectedOverlay, overlayCoords } = this.state
    if (selectedOverlay) {
      selectedOverlay.setOptions({ fillColor: color })
      let polyIndex = selectedOverlay.overlayIndex
      let overlayIndex = overlayCoords.findIndex(overlay => overlay.overlayIndex === polyIndex)
      overlayCoords[overlayIndex].fillColor = color
      this.setState({ overlayCoords })
    }
    this.setState({ fillColor: color })
  }
  onSetUser(user, email) {
    this.setState({
      user: user,
      email: email
    }, () => console.log(this.state.user.uid))
  }

  onOverlayOptionsOpen() {
    this.setState({ isOverlayOptionsOpen: true })
  }
  onOverlayOptionsClose() {
    this.setState({ isOverlayOptionsOpen: false })
  }
  onSetMarkerOptions() {
    this.setState({ overlayOptionsType: 'marker' })
  }
  onSetPolyOptions() {
    this.setState({ overlayOptionsType: 'poly' })
  }
  onSetSelectedIcon(icon) {
    var { selectedOverlay, overlayCoords } = this.state
    if (selectedOverlay) {
      selectedOverlay.setOptions({ icon: icon })
      let markerIndex = selectedOverlay.overlayIndex
      let overlayIndex = overlayCoords.findIndex(overlay => overlay.overlayIndex === markerIndex)
      overlayCoords[overlayIndex].icon = icon
      this.setState({ overlayCoords })
    }
    this.setState({ icon: icon })
  }

  handleDrawerOpen = () => {
    this.setState({
      openSide: true,
      left: '25vw',
    });
  };

  handleDrawerClose = () => {
    this.setState({
      openSide: false,
      left: '0vw',
    });
  };

  handleOptionOpen = () => {
    this.setState({
      openOption: true,
      bottom: '8.7vw',
    });
  };

  handleOptionClose = () => {
    this.setState({
      openOption: false,
      bottom: '0vw',
    });
  };

  //this is rederrrrr
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
        style={{
          height: '100%',
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
        }}
      >
        <MapClass
          left={this.state.left}
          bottom={this.state.bottom}
        >
          {this.state.overlayCoords.map(value => {
            const overlayCoords = value.coords
            const overlayIndex = value.overlayIndex
            const overlayDrawType = value.overlayDrawType
            const fillColor = value.fillColor
            const strokeColor = value.strokeColor
            const icon = value.icon
            if (value.overlayType === 'polygon') {
              return (
                <Polygon
                  key={overlayIndex}
                  overlayCoords={overlayCoords}
                  overlayIndex={overlayIndex}
                  overlayDrawType={overlayDrawType}
                  fillColor={fillColor}
                  strokeColor={strokeColor}
                  addPolygonListener={this.addPolygonListener}
                  onSquereMetersTrans={this.onSquereMetersTrans}
                  isFirstDraw={this.state.isFirstDraw}
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
                  strokeColor={strokeColor}
                  addPolylineListener={this.addPolylineListener}
                  onPolylineLengthCompute={this.onPolylineLengthCompute}
                />
              )
            }
            if (value.overlayType === 'marker') {
              return (
                <Marker
                  key={overlayIndex}
                  overlayCoords={overlayCoords}
                  overlayIndex={overlayIndex}
                  overlayDrawType={overlayDrawType}
                  addMarkerListener={this.addMarkerListener}
                  icon={icon}
                />
              )

            }
            return (null)
          })
          }
          <SearchBox
            status={this.state.status}
          />
          <ExampleLine
            exampleLineCoords={this.state.exampleLineCoords}
            onPolylineLengthCompute={this.onPolylineLengthCompute}
            strokeColor={this.state.strokeColor}
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

          <OpenSide
            handleDrawerOpen={this.handleDrawerOpen}
            handleDrawerClose={this.handleDrawerClose}
            openSide={this.state.openSide}
          />

          <OpenOption
            handleOptionOpen={this.handleOptionOpen}
            handleOptionClose={this.handleOptionClose}
            {...this.state}
          />

          <IconLabelButtons
            onAddListenerMarkerBtn={this.onAddListenerMarkerBtn}
            onAddListenerPolygonBtn={this.onAddListenerPolygonBtn}
            onAddListenerPolylineBtn={this.onAddListenerPolylineBtn}
            onAddListenerGrabBtn={this.onAddListenerGrabBtn}
            onSaveToFirestore={this.onSaveToFirestore}
          />
        </MapClass>

        <DetailedExpansionPanel
          userLocation={this.state.userLocation}
          yourLocation={this.state.yourLocation}
        />

        <PermanentDrawer
          planData={this.state.planData}
          currentPlanData={this.state.currentPlanData}
          onSelectCurrentPlanData={this.onSelectCurrentPlanData}
          onSetUser={this.onSetUser}
          {...this.state}
        />

        <OverlayOptions
          onSetSelectedColor={this.onSetSelectedColor}
          onChangePolyStrokeColor={this.onChangePolyStrokeColor}
          onChangePolyFillColor={this.onChangePolyFillColor}
          onSetSelectedIcon={this.onSetSelectedIcon}
          {...this.state}
        />
      </div >
    );
  }
}

export default App;