import {
  formatDistanceToNow,
  parseISO,
  differenceInDays,
  format,
} from 'date-fns';

export const getDisplayTime = (date) => {
  const daysDifference = differenceInDays(new Date(), parseISO(date));

  return daysDifference <= 1
    ? formatDistanceToNow(date, { addSuffix: true })
    : format(date, 'MMM dd, yy');
};

export const getCSRFToken = () => {
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta ? meta.getAttribute('content') : null;
};
