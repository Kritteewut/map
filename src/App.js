import React, { Component } from 'react';
import MapClass from './components/Map'
import Marker from './components/Marker';
import Polygon from './components/Polygon';
import Polyline from './components/Polyline';
import DrawOptionsPanel from './components/DrawOptionsPanel';

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
var my_script = new_script('https://maps.googleapis.com/maps/api/js?&libraries=drawing&key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&callback=initMap&v=3.32');

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      status: 'start',
      marker1: { lat: 10, lng: 100 }
    }
  }
  do_load = () => {
    var self = this;
    my_script.then(function () {
      self.setState({ 'status': 'done' });
    }).catch(function () {
      self.setState({ 'status': 'error' });
    })
  }
  componentDidMount() {

  }
  clickMark(marker) {
    console.log(marker)
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
      <div className="App">
        <MapClass testfor={this.state.test}>
          <Marker coords={this.state.marker1} click={this.clickMark}
          >
          </Marker>
          <Polygon>
          </Polygon>
          <Polyline>
          </Polyline>
        </MapClass>
        <DrawOptionsPanel
          status={this.state.status}
        >
        </DrawOptionsPanel>
      </div>
    );
  }
}

export default App;
