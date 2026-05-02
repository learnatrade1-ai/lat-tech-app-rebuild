function canAccess(item) {
  if (item.access === "free") return true;
  if (item.access === "pro" && window.LAT_CONFIG.mode === "pro") return true;
  return false;
}
