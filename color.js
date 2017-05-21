var Color = {
  newColor: function(r, g, b, a = 1) {
    this.r = r;
    this.g = g;
    this.b = b;
  },
  getColor: function(x = 0, y = 0) {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}
