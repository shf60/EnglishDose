import moment from 'moment-jalaali';
import React, { useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import Submit from './Submit';

const styleFA = { fontFamily: 'IranianSans' }

export default function Availability(props) {
  const [calendarDay, setCalendarDay] = useState(0);
  const [selectionTimes, setSelectionTimes] = useState([]);
  const selected = 'bg-info text-light rounded mx-auto';
  // moment.loadPersian({usePersianDigits:true,dialect:'persian-modern'});
  let weekStart = moment().tz('Asia/Tehran').add(calendarDay, 'd').format("D MMMM");
  let weekEnd = moment().tz('Asia/Tehran').add(calendarDay + 6, 'd').format("D MMMM YYYY");

  let weekDays1 = []
  let weekDays2 = []
  for (let i = calendarDay; i < calendarDay + 7; i++) {
    const time1 = moment().tz('Asia/Tehran').add(i, 'days').format("dddd");
    const time2 = moment().tz('Asia/Tehran').add(i, 'days').format("D");
    weekDays1.push(<th key={time1} className={i === 0 ? "text-success" : undefined} >{time1}</th>);
    weekDays2.push(<th key={time2} className={i === 0 ? "text-success" : undefined} >{time2}</th>);
  }

  //////////////////////////////
  const selectionTimesfn = (e) => {
    const bg = e.target.classList.contains('bg-info');
    if (bg) {

      const cellTime = e.target.getAttribute('dateTime');
      setSelectionTimes(selectionTimes.filter(item => item !== cellTime));
      cellTime.substr(0, 10) === moment().format('YYYY-MM-DD') ? e.target.className = 'text-success' :
        e.target.className = undefined;
    } else {
      e.target.className = selected;
      setSelectionTimes(prev => [...prev, e.target.getAttribute('dateTime')]);
    }
  }
  /////////////////////////////     
  let hoursRange = [];
  let hoursRange2 = [];
  const times = 13 * 2; // 24 hours * 30 mins in an hour

  for (let i = 0; i < times; i++) {

    for (let d = calendarDay; d < calendarDay + 7; d++) {
      const start = moment().tz('Asia/Tehran').add(d, 'd').hours(8).minute(0);
      let toPrint = moment(start)
        .add(30 * i, 'minutes');
      const hasSelected = selectionTimes.find(item => item === toPrint.format('YYYY-MM-DD HH:mm'));
      hoursRange2.push(<td key={d} className={d === 0 && hasSelected === undefined ? "text-success" :
        hasSelected ? selected : undefined
      }
        onClick={selectionTimesfn} dateTime={toPrint.format('YYYY-MM-DD HH:mm')}
      >{toPrint.format('HH:mm')}</td>);
    }
    hoursRange.push(<tr key={i * 2} className="border-top">{hoursRange2}</tr>);
    hoursRange2 = [];
  }
  ///////////////////
  return (
    <Container className="bg-white rounded mt-5 mb-5">
      {JSON.stringify(selectionTimes)}
      <h1 className="text-center text-dark">Availability</h1>
      <Row className="justify-content-center">
        <Col lg={6}>
          <Table borderless size="sm" responsive className="mt-3" 
          style={{...styleFA, tableLayout: 'fixed',width: '100%'}}>
            <thead>
              <tr className="text-info">
                <td colSpan="2" className="text-left"> {calendarDay !== 0 &&
                  <span style={{ cursor: 'pointer' }} onClick={() => setCalendarDay(prev => prev - 7)}>
                    <i className="fa fa-chevron-left"> </i> Previous Week</span>}</td>
                <td colSpan="3" className="text-center">{weekStart + ' - ' + weekEnd + ' - Iran Time Zone'}</td>
                <td colSpan="2" className="text-right" >
                  <span style={{ cursor: 'pointer' }} onClick={() => setCalendarDay(prev => prev + 7)}>
                    Next Week <i className="fa fa-chevron-right"></i> </span></td>
              </tr>
              <tr className="text-center border-top">
                {weekDays1.map(days => days)}
              </tr>
              <tr className="text-center">
                {weekDays2.map(days => days)}
              </tr>
            </thead>
            <tbody className="text-center">
              {hoursRange.map((hour, i) => hour)}
            </tbody>
          </Table>
        </Col>
      </Row>
      {selectionTimes.length > 0 && <Submit times={selectionTimes} />}
    </Container>
  );

}