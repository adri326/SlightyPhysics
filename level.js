function level1() {
  clearBox();
  addGridBoxLine(30, getGridMaxY() - 1, DIR.Yminus, 5, {color: "#8ec1f4", walljump: false});
  addGridBoxLine(25, getGridMaxY() - 1, DIR.Yminus, 3, {color: "#2552d9", walljump: false});
  addGridBoxLine(20, getGridMaxY() - 1, DIR.Yminus, 1, {color: "#0f228c", walljump: false});
  addGridBoxLine(40, getGridMaxY() - 1, DIR.Yminus, 15, {color: "#2552d9", walljump: true});
  addGridBoxRect(45, getGridMaxY() - 15, 48, getGridMaxY()-1, {color: "#2552d9", walljump: true});
}
