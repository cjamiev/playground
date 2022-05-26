import React, { useEffect, useState } from 'react';
import Button from 'components/button';
import Text from 'components/form/Text';
import TextArea from 'components/form/TextArea';
import Switch from 'components/switch';
import { convert12HourTo24HourClock, convert24HourTo12HourClock } from './helper';
import { incrementDate } from 'clock';
import { PlusOrMinusSVG } from 'components/icons/PlusOrMinusSVG';

const ZERO = 0;
const ONE = 1;

const TimerForm = ({ onChange, value }) => {
  const today = new Date();
  const [name, setName] = useState('');
  const parsedTodayHour = convert24HourTo12HourClock(today.getHours());
  const [month, setMonth] = useState(today.getMonth() + ONE);
  const [day, setDay] = useState(today.getDate());
  const [year, setYear] = useState(today.getFullYear());
  const [hour, setHour] = useState(parsedTodayHour.hour);
  const [minute, setMinute] = useState(today.getMinutes());
  const [second, setSecond] = useState(ZERO);
  const [isPm, setIsPm] = useState(parsedTodayHour.isPm);

  const updateTime = (modifier) => {
    const update = incrementDate(new Date(year, month - ONE, day, hour, minute, second), modifier);

    const parsedHour = convert24HourTo12HourClock(update.getHours());
    setName(update.name);
    setMonth(update.getMonth() + ONE);
    setDay(update.getDate());
    setYear(update.getFullYear());
    setHour(parsedHour.hour);
    setMinute(update.getMinutes());
    setSecond(ZERO);
    setIsPm(parsedHour.isPm);
  };

  useEffect(() => {
    if (value) {
      const parsedHour = convert24HourTo12HourClock(value.time.getHours());
      setName(value.name);
      setMonth(value.time.getMonth() + ONE);
      setDay(value.time.getDate());
      setYear(value.time.getFullYear());
      setHour(parsedHour.hour);
      setMinute(value.time.getMinutes());
      setSecond(ZERO);
      setIsPm(parsedHour.isPm);
    }
  }, [value]);

  return (
    <div>
      <div>
        <Text
          label="Name"
          selected={name}
          onChange={({ selected }) => {
            setName(selected);
          }}
        />
      </div>
      <div>
        <Text
          label="Month"
          selected={month}
          onChange={({ selected }) => {
            setMonth(selected);
          }}
        />
        <Text
          label="Day"
          selected={day}
          onChange={({ selected }) => {
            setDay(selected);
          }}
        />
        <Text
          label="Year"
          selected={year}
          onChange={({ selected }) => {
            setYear(selected);
          }}
        />
      </div>
      <div>
        <Text
          label="Hour"
          selected={hour}
          onChange={({ selected }) => {
            setHour(selected);
          }}
        />
        <Text
          label="Minute"
          selected={minute}
          onChange={({ selected }) => {
            setMinute(selected);
          }}
        />
        <Text
          label="Second"
          selected={second}
          onChange={({ selected }) => {
            setSecond(selected);
          }}
        />
        <div>
          30 Days
          <svg
            aria-label="Plus 30 days"
            width="20"
            height="20"
            viewBox="0 0 53 53"
            onClick={() => {
              updateTime({ days: 30 });
            }}
          >
            <PlusOrMinusSVG conditions={{ isPlus: true }} />
          </svg>
          <svg
            aria-label="Minus 30 days"
            width="20"
            height="20"
            viewBox="0 0 53 53"
            onClick={() => {
              updateTime({ days: -30 });
            }}
          >
            <PlusOrMinusSVG conditions={{ isPlus: false }} />
          </svg>
        </div>
        <div>
          Week:
          <svg
            aria-label="Plus week"
            width="20"
            height="20"
            viewBox="0 0 53 53"
            onClick={() => {
              updateTime({ weeks: ONE });
            }}
          >
            <PlusOrMinusSVG conditions={{ isPlus: true }} />
          </svg>
          <svg
            aria-label="Minus week"
            width="20"
            height="20"
            viewBox="0 0 53 53"
            onClick={() => {
              updateTime({ weeks: -ONE });
            }}
          >
            <PlusOrMinusSVG conditions={{ isPlus: false }} />
          </svg>
        </div>
        <Switch
          data={[{ label: 'am' }, { label: 'pm' }]}
          switchIndex={isPm ? ONE : ZERO}
          onToggleSwitch={(index) => {
            setIsPm(Boolean(index));
          }}
        />
      </div>
      <Button
        label="Save"
        classColor="primary"
        onClick={() => {
          if (name) {
            const parsedHour = convert12HourTo24HourClock(Number(hour), isPm);
            const timerContent = {
              month: Number(month),
              day: Number(day),
              year: Number(year),
              hour: parsedHour,
              minute: Number(minute),
              second: Number(second)
            };
            onChange({ name, content: timerContent });
            setName('');
          }
        }}
      />
    </div>
  );
};

export default TimerForm;
