// A simple function to show the current time in the navbar

export function currentNavBarDate (): string {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  const time = new Date();
  const dayWord = days[time.getDay()];
  const day = String(time.getDate()).padStart(2, '0');
  const month = String(time.getMonth()).padStart(2, '0');
  const year = String(time.getFullYear());

  return `${dayWord} | ${day}/${month}/${year}`;
}

export function currentNavBarTime (): string {
  const time = new Date();
  const hour = String(time.getHours()).padStart(2, '0');
  const minute = String(time.getMinutes()).padStart(2, '0');
  const second = String(time.getSeconds()).padStart(2, '0');

  return `${hour}:${minute}:${second}`;
}
