import React, { Component } from 'react';
import MapClass from './components/Map'
import Marker from './components/Marker';
import Polygon from './components/Polygon';
import Polyline from './components/Polyline';
import DrawOptionsPanel from './components/drawOptionsPanel';
import DrawingTools from './components/drawingTools';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      test: 'testttt'
    }
  }
  componentDidMount() {

  }

  render() {
    return (
      <div className="App">
        <MapClass test={this.state.test}>
          <Marker />
          <Polygon />
          <Polyline />
          <DrawOptionsPanel />
          <DrawingTools />
        </MapClass>
      </div>
    );
  }
}

export default App;
