declare module 'react-big-calendar' {
  import { Component } from 'react';

  export interface CalendarProps {
    localizer: any;
    events: any[];
    startAccessor: string;
    endAccessor: string;
    onSelectSlot?: (slotInfo: any) => void;
    onNavigate?: (action: string) => void;
    onView?: (view: string) => void;
    selectable?: boolean;
    views?: string[];
    view?: string;
    date?: Date;
    defaultView?: string;
    style?: React.CSSProperties;
    culture?: string;
    messages?: any;
    eventPropGetter?: (event: any) => { style?: React.CSSProperties };
    components?: {
      dateCellWrapper?: (props: {
        date: Date;
        view: string;
      }) => React.ReactNode;
    };
    ref?: any;
  }

  export class Calendar extends Component<CalendarProps> {}

  export function momentLocalizer(moment: any): any;
}
