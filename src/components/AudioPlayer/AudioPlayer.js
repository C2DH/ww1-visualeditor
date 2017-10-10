import React, { PureComponent } from 'react'
import { Button } from 'reactstrap'
import Wavesurfer from 'react-wavesurfer'
import 'wavesurfer.js'
import './AudioPlayer.css'

class AudioPlayer extends PureComponent {
  state = {
    playing: false,
  }

  togglePlaying = () => this.setState({ playing: !this.state.playing })

  render() {
    return (
      <div>
        <Wavesurfer
          playing={this.state.playing}
          options={{barHeight:4, barWidth:2, waveColor:'#ffffff', cursorColor: '#F56350', progressColor:'#F06354' }}
          audioFile={this.props.src}
        />
        <div className="AudioPlayer__Controls">
          <Button type='button' onClick={this.togglePlaying}>{this.state.playing ? 'Pause' : 'Play'}</Button>
        </div>
      </div>
    )
  }
}

export default AudioPlayer
