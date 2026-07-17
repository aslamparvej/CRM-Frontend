export const formatDate = (
  date: string | Date,
  format: "short" | "long" | "time" | "relative" = "short",
): string => {
  const d = new Date(date);
  if (format === "relative") {
    const diff = Date.now() - d.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString();
  }
  if (format === "time")
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true, });
  if (format === "long")
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
