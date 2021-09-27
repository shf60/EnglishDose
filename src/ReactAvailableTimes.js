import AvailableTimes from 'react-available-times';
import React, { Component } from 'react'
import { Container } from 'react-bootstrap';

export default class ReactAvailableTimes extends Component {
    render() {
      return (
        <Container className="border rounded-lg mt-5 mb-5 bg-white">
        <h1 className="text-center text-dark" >Availability</h1>
<AvailableTimes
  weekStartsOn="monday"
  calendars={[
    {
      id: 'work',
      title: 'Work',
      foregroundColor: '#ff00ff',
      backgroundColor: '#f0f0f0',
      
    },
    {
      id: 'private',
      title: 'My private cal',
      foregroundColor: '#666',
      backgroundColor: '#f3f3f3',
      selected: true,
    },
  ]}
  onChange={(selections) => {
    selections.forEach(({ start, end }) => {
      console.log('Start:', start, 'End:', end);
    })
  }}
  onEventsRequested={({ calendarId, start, end, callback }) => {
    // loadMoreEvents(calendarId, start, end).then(callback);
  }}
  // initialSelections={[
  //   { start: , End: }
  // ]}
  height={1320}
  recurring={false}
  availableDays={['monday', 'tuesday', 'wednesday', 'thursday', 'friday','saturday','sunday']}
  availableHourRange={{ start: 8, end: 21 }}
/></Container>);
  }
}