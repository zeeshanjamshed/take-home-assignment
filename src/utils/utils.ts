import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export function convertToTimeAgo (date: string) {
  const formattedDate = dayjs(date).fromNow();
  return formattedDate;
}
