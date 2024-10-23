import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar); 

const CalendarComponent = ({ events, handleEventDrop, onSelectSlot, onSelectEvent }) => {
  const updatedEvents = events.map(({ start, end, ...rest }) => ({
    start: new Date(Date.parse(start)),
    end: new Date(Date.parse(end)),
    ...rest,
  }));

  return (
    <DnDCalendar
      localizer={localizer}
      events={updatedEvents}
      startAccessor="start"
      endAccessor="end"
      selectable
      resizable
      onEventDrop={handleEventDrop}
      onSelectSlot={onSelectSlot}
      onSelectEvent={onSelectEvent}
      draggableAccessor={() => true}
      eventPropGetter={(event) => {
        const backgroundColor = event.color || '#3174ad';
        return { style: { backgroundColor } };
      }}
      style={{ height: 650, backgroundColor: 'var(--white)'}}
      popup
    />
  );
};

export default CalendarComponent;
