import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";

const CalendarPage = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <DateTimePicker
        onChange={onChange}
        value={value}
        isCalendarOpen={true}
        minDate={value}
        isClockOpen={false}
      />
    </div>
  );
};

export default CalendarPage;
