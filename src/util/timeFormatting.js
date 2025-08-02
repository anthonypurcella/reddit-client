import { formatDistanceToNow } from "date-fns";

export function timeagoShort(timePosted) {
  const seconds = Math.floor(Date.now() / 1000) - timePosted;

  const intervals = [
    { label: "y", seconds: 31536000 },
    { label: "mo", seconds: 2592000 },
    { label: "d", seconds: 86400 },
    { label: "h", seconds: 3600 },
    { label: "m", seconds: 60 },
    { label: "s", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count}${interval.label}`;
    }
  }

  return "now";
}

export function timeAgo(timePosted) {
  const timeAgo = formatDistanceToNow(new Date(timePosted * 1000), {
    addSuffix: true,
  });

  return timeAgo;
}
