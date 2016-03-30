import React, { PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import { Circle } from 'rc-progress';
import AudioPlayer from './AudioPlayer/AudioPlayer';
import moment from 'moment';

const formatDuration = (durationRaw) => {
  const duration = moment.duration(durationRaw);
  const s = Math.floor(duration.asSeconds() % 60);
  const m = Math.floor(duration.asMinutes() % 60);
  const h = Math.floor(duration.asHours() % 24);
  return `${h > 0 ? `${h}:` : ''}${m > 0 ? `${m}:` : ''}${h === 0 && m === 0 ? `${s}s` : s}`;
};

const getStatusIcon = (status) => {
  let icon;
  let statusText;
  let color = '#AAA';
  switch (status) {
    case 'queued':
      icon = 'schedule';
      statusText = 'Queued';
      break;
    case 'initiated':
      icon = 'phone_forwarded';
      statusText = 'Initiated';
      color = '#fff176';
      break;
    case 'ringing':
      icon = 'ring_volume';
      statusText = 'Ringing';
      color = '#fff176';
      break;
    case 'in-progress':
      icon = 'phone_in_talk';
      statusText = 'Call In Progress';
      color = '#fff176';
      break;
    case 'completed':
      icon = 'check_circle';
      statusText = 'Call Complete';
      color = '#66bb6a';
      break;
    case 'busy':
    case 'canceled':
    case 'failed':
      icon = 'error_outline';
      statusText = 'Call Failed';
      color = '#f44336';
      break;
    case 'no-answer':
    case 'no answer':
      icon = 'phone_missed';
      statusText = 'No Answer';
      color = '#f44336';
      break;
    default:
      icon = 'help_outline';
      statusText = 'Unknown';
  }
  return (
    <i
      title={`Status: ${statusText}`}
      style={{
        color,
        fontSize: 18,
        padding: 8,
        cursor: 'default'
      }}
      className='material-icons'
    >
      {icon}
    </i>
  );
};

const getStyles = (partnerColor = '#00BCD4') =>
  ({
    root: {
      margin: 6,
      flexGrow: 1,
      borderBottom: `4px solid ${partnerColor}`
    },
    cardContent: {
      display: 'flex'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      flexGrow: 1
    },
    rightContainer: {
      display: 'flex',
      alignItems: 'center',
      margin: 8
    },
    audioContainer: {
      width: 36,
      height: 36,
      position: 'relative',
      margin: 8
    },
    audioIcon: {
      position: 'absolute',
      fontSize: 34,
      top: 1,
      left: 1,
      cursor: 'pointer'
    }
  });

const CallCard = ({ call }) => {
  const styles = getStyles(`#${call.getIn(['partner', 'color'])}`);
  const getRightContainerEl = () => {
    const recording = call.get('recording');
    let recordingEl;
    if (recording) {
      recordingEl = [
        <span title='Duration' key='duration'>{formatDuration(call.get('duration'))}</span>,
        <AudioPlayer
          key='audio-player'
          style={styles.audioContainer}
          src={call.get('recording')}
        >
          {
            ({ play, pause, paused, currentTime, duration, readyState }) => {
              if (readyState === 0) {
                return (
                  <i
                    style={Object.assign({}, styles.audioIcon, {
                      color: '#D9D9D9'
                    })}
                    className='material-icons'
                    onClick={play}
                  >
                    play_circle_filled
                  </i>
                );
              }
              return [
                <i
                  key='icon'
                  style={Object.assign({}, styles.audioIcon, {
                    color: '#72b83e'
                  })}
                  className='material-icons'
                  onClick={paused ? play : pause}
                >
                  {paused ? 'play_circle_filled' : 'pause_circle_filled'}
                </i>,
                <Circle
                  key='progress'
                  percent={currentTime/duration * 100}
                  strokeWidth={12}
                  strokeColor='#72b83e'
                  trailWidth={12}
                />
              ];
            }
          }
        </AudioPlayer>
      ];
    }
    return (
      <div style={styles.rightContainer}>
        {getStatusIcon(call.get('status'))}
        {recordingEl}
      </div>
    );
  };
  return (
    <Card
      style={styles.root}
    >
      <div style={styles.cardContent}>
        <CardHeader
          style={styles.header}
          title={call.get('clientName')}
          subtitle={call.getIn(['partner', 'name'])}
        />
        {getRightContainerEl()}
      </div>
    </Card>
  );
};

CallCard.propTypes = {
  call: PropTypes.object.isRequired
};

export default CallCard;
