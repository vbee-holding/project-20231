import React from 'react';
import { differenceInMinutes, differenceInHours,differenceInDays, parseISO, setTimezone } from 'date-fns';

const TimeAgo = ({ created }) => {
//   const dateString = '2024-01-14T06:33:00.000Z';
  const parsedDate = parseISO(created);
  const now = new Date(); 

  const offset = 7; // GMT+0700 

  //chuyển sang giờ Đông Dương
  const utc_date = parsedDate.getTime() + (parsedDate.getTimezoneOffset() * 60000); 
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000); 
  const newTime = new Date(utc + (3600000 * offset)); 
  const newDate = new Date(utc_date+ (3600000 * offset) )

  const minutesDiff = differenceInMinutes(newTime, newDate);
  const hoursDiff = differenceInHours(newTime, newDate);
  const daysDiff = differenceInDays(newTime, newDate);

  let timeAgoString;

  if (minutesDiff < 60) {
    timeAgoString = `${minutesDiff} phút trước`;
  } else if (hoursDiff < 24) {
    timeAgoString = `${hoursDiff} giờ trước`;
  } else if(daysDiff < 7) {
    timeAgoString = `${daysDiff} ngày trước`;
  } 
  else {
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();
    timeAgoString = `${newDate.getDate()} tháng ${newDate.getMonth() + 1}, ${newDate.getFullYear()} lúc ${hours}:${minutes}`
  }

  return <span className='text-sm'>{timeAgoString}</span>;
};

export default TimeAgo;
