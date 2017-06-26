import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'underscore';
import { FlatButton } from 'material-ui';
import {
  DeviceSummary,
  Stream
} from '../components';

import {
  LocalStorageSettings,
  CloudUploadSettings
} from './'


import {
  deviceFetch,
  devicesDelete,
  streamsFetch,
  deviceSubscribe,
  deviceUnsubscribe,
} from '../actions';


class Device extends Component {
  componentDidMount() {
    this.props.deviceFetch(this.props.params.deviceId);
    this.props.streamsFetch(this.props.params.deviceId);
  }

  subscribe(device, streams) {
    if (device && device.streams) {
      device.streams.map(s => {
        return this.props.deviceSubscribe(device.deviceId, s.id);
      });
    }
  }

  unsubscribe(device) {
    if (device) {
      if (device.streams) {
        device.streams.map(s => {
          return this.props.deviceSubscribe(device.deviceId, s.id);
        });
      }
    }
  }

  componentWillUnmount() {
    this.unsubscribe(this.props.device);
  }

  componentWillReceiveProps(nextProps) {
    // Poll for new readings
    setTimeout(() => {
      this.props.streamsFetch(this.props.params.deviceId);
    }, 7000);
  }

  renderActions(device) {
    return (
      <div>
        <FlatButton label='Delete' onClick={() => {this.props.devicesDelete(device.deviceId)}} />
      </div>
    )
  }

  renderStreams(streams) {
    if (streams) {
      return streams.map((s, i) => {
        return <Stream key={i} {...s} />
      })
    }
  }
  // TEMP
  streamToCSV(stream) {
    return ``
  }

  render() {
    const { device, streams } = this.props;
    if (!isEmpty(device)) {
      return (
        <div>
          <DeviceSummary
            expandable
            showExpandableButton
            title={device.name}
            subtitle={device.deviceId}
            status={device.status}
            actions={this.renderActions(device)}
            meta={device}
          />

          <LocalStorageSettings />
          <CloudUploadSettings />

          { this.renderStreams(streams[device.deviceId]) }
        </div>
      );
    }
    return <div></div>
  }
}

const mapStateToProps = (state) => {
  return {
    device: state.device,
    streams: state.streams,
    locStorPolicies: state.localStoragePolicies
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deviceFetch: (deviceId) => dispatch(deviceFetch(deviceId)),
    devicesDelete: (deviceId) => dispatch(devicesDelete(deviceId)),
    streamsFetch: (deviceId) => dispatch(streamsFetch(deviceId)),
    deviceSubscribe: (deviceId, componentId) => dispatch(deviceSubscribe(deviceId, componentId)),
    deviceUnsubscribe: (deviceId, componentId) => dispatch(deviceUnsubscribe(deviceId, componentId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Device);
