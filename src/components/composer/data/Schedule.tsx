/* TODO fix type */
// @ts-ignore
// @ts-nocheck

import React, { useState, useRef } from 'react';
import { useLayoutEffect } from "react";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';
// import plLocale from '@fullcalendar/core/locales/pl';



interface Props {
  attrs: any;
}

const Schedule: React.FC<Props> = ({ attrs, children }) => {
  const calendarRef = useRef(null);
  return (
    <div>
    <FullCalendar
      innerRef={calendarRef}
      plugins={[timeGridPlugin, interactionPlugin]}
      editable
      selectable
    />
    { children}
    </div>
  );
  
};
export default Schedule;