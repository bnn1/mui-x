import * as React from 'react';
import moment, { Moment } from 'moment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { expectType } from '@mui/types';

// Allows setting date type right with generic JSX syntax
<DatePicker<Date, Date>
  value={new Date()}
  onChange={(date) => date?.getDate()}
  renderInput={() => <input />}
/>;

// Throws error if passed value is invalid
<DatePicker<Date, Date>
  // @ts-expect-error Value is invalid
  value={moment()}
  onChange={(date) => date?.getDate()}
  renderInput={() => <input />}
/>;

// Inference from the state
const InferTest = () => {
  const [value, setValue] = React.useState<Moment | null>(moment());

  return (
    <DatePicker
      value={value}
      onChange={(newValue) => setValue(newValue)}
      renderInput={() => <input />}
    />
  );
};

// Allows inferring for side props
<DatePicker
  value={moment()}
  minDate={moment()}
  renderDay={(day) => <span> {day.format('D')} </span>}
  onChange={(date) => date?.set({ second: 0 })}
  renderInput={() => <input />}
/>;

// TypeScript can't know the type of the DateAdapter in the React context.
// So in this case it is expected that type will be the type of `value` as for now.
// Arguable, this usage doesn't make sense since the component would never reflect the user picked value.
{
  <DatePicker
    value={null}
    onChange={(date) => {
      expectType<null, typeof date>(date);
    }}
    renderInput={() => <input />}
  />;
  // workaround
  <DatePicker<Date, Date | null>
    value={null}
    onChange={(date) => {
      expectType<Date | null, typeof date>(date);
    }}
    renderInput={() => <input />}
  />;
}

{
  <DatePicker
    value={new Date()}
    onChange={(date) => date?.getDate()}
    renderInput={() => <input />}
    // @ts-expect-error
    displayStaticWrapperAs="desktop"
  />;
}
