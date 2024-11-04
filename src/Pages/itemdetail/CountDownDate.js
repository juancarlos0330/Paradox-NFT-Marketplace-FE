import React, { useState, useEffect } from "react";

export const getDays = (ms) => {
  return Math.trunc(ms / (60000 * 60 * 24));
};

export const getHours = (ms) => {
  const min = ms / 60000;
  const days = Math.trunc(min / (60 * 24));
  return Math.trunc((min - days * 24 * 60) / 60);
};

export const getMins = (ms) => {
  const min = ms / 60000;
  const days = Math.trunc(min / (60 * 24));
  const hours = Math.trunc((min - days * 24 * 60) / 60);
  return Math.trunc(min - days * 24 * 60 - hours * 60);
};

export const getSecs = (ms) => {
  const secs = ms / 1000;
  const days = Math.trunc(secs / (60 * 60 * 24));
  const hours = Math.trunc((secs - days * 24 * 60 * 60) / (60 * 60));
  const minutes = Math.trunc(
    (secs - days * 24 * 60 * 60 - hours * 60 * 60) / 60
  );
  return Math.trunc(
    secs - days * 24 * 60 * 60 - hours * 60 * 60 - 60 * minutes
  );
};

export const convertToTwoDigit = (num) => (num > 9 ? String(num) : `0${num}`);

const CountDownDate = (props) => {
  const [times, setTimes] = useState(0);
  const [timeIsOver, setTimeIsOver] = useState(false);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const time = new Date(
      new Date(props.expiredDate).getTime() -
        new Date(props.currentDate).getTime()
    ).getTime();
    if (time > 0 && !timeIsOver) {
      setTimes(time);
      setStart(true);
    }
  }, []);

  useEffect(() => {
    const timeId = setTimeout(() => {
      if (start) {
        if (times <= 1000) {
          setTimeIsOver(true);
          clearTimeout(timeId);
        } else {
          setTimes((times) => times - 1000);
        }
      }
    }, 1000);

    return () => {
      clearTimeout(timeId);
    };
  }, [times]);

  return (
    <>
      <span>{getDays(times)}d</span>
      <span>{convertToTwoDigit(getHours(times))}h</span>
      <span>{convertToTwoDigit(getMins(times))}m</span>
      <span>{convertToTwoDigit(getSecs(times))}s</span>
    </>
  );
};

export default CountDownDate;
