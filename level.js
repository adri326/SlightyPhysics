var block1 = {color: "#8ec1f4", walljump: false},
block2 = {color: "#2552d9", walljump: true},
jumpBlock = {color: "#fef117", walljump: false, background: true, code: function() {
  player.velY = -8; player.grounded = false;
}, executable: true},
endBlock = {color: "#b1bf49", walljump: false, background: true, code: function() {
  alert("Demo finished!");
}, executable: true, uses: 1};

function level1() {
  clearBox();
  addGridBoxLine(31, getGridMaxY() - 1, DIR.Yminus, 5, block1);
  addGridBoxLine(25, getGridMaxY() - 1, DIR.Yminus, 3, block1);
  addGridBoxLine(19, getGridMaxY() - 1, DIR.Yminus, 1, block1);
  addGridBoxLine(40, getGridMaxY() - 1, DIR.Yminus, 15, block2);
  addGridBoxRect(45, getGridMaxY() - 15, 48, getGridMaxY()-1, block2);
  addGridBoxLine(39, getGridMaxY() - 19, DIR.Xplus, 7, block1);
  addGridBox(42, getGridMaxY() - 20, jumpBlock);
  addGridBoxLine(40, getGridMaxY() - 27, DIR.Xminus, 7, block1);
  addGridBoxLine(38, getGridMaxY() - 29, DIR.Xminus, 4, block1);
  addGridBoxLine(38, getGridMaxY() - 30, DIR.Yminus, 12, block1);
  addGridBoxLine(37, getGridMaxY() - 30, DIR.Yminus, 3, block2);
  addGridBoxLine(37, getGridMaxY() - 33, DIR.Yminus, 3, block1);
  addGridBoxLine(37, getGridMaxY() - 36, DIR.Yminus, 3, block2);
  addGridBoxLine(37, getGridMaxY() - 39, DIR.Yminus, 3, block1);
  addGridBoxLine(32, getGridMaxY() - 33, DIR.Yminus, 9, block1);
  addGridBoxLine(33, getGridMaxY() - 33, DIR.Yminus, 3, block2);
  addGridBoxLine(33, getGridMaxY() - 36, DIR.Yminus, 3, block1);
  addGridBoxLine(33, getGridMaxY() - 39, DIR.Yminus, 3, block2);
  addGridBoxRect(39, getGridMaxY() - 41, getGridMaxX() - 1, getGridMaxY() - 40, block1);
  addGridBoxRect(32, 1, 33, getGridMaxY() - 42, block1);
  addGridBox(getGridMaxX() - 2, getGridMaxY() - 43, endBlock);
}
