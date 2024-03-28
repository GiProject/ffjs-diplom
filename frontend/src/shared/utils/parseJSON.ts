export function parseJSON(text: any) {
  if (typeof text !== "string") {
    return false;
  }
  try {
    JSON.parse(text);
    return JSON.parse(text);
  } catch (error) {
    return "";
  }
}
