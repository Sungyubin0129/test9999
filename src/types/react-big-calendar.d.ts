declare module 'react-big-calendar' {
  import { Component } from 'react';

  export interface CalendarProps {
    localizer: any;
    events: any[];
    startAccessor: string;
    endAccessor: string;
    onSelectSlot?: (slotInfo: any) => void;
    selectable?: boolean;
    views?: string[];
    defaultView?: string;
    style?: React.CSSProperties;
    messages?: any;
    eventPropGetter?: (event: any) => { style?: React.CSSProperties };
  }

  export class Calendar extends Component<CalendarProps> {}

  export function momentLocalizer(moment: any): any;
}
