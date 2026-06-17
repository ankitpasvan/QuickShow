const isoTimeFormat = (dateTime) => {
  if (!dateTime) return "";

  const date = new Date(dateTime);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export default isoTimeFormat;
