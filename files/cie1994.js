// http://html5hub.com/exploring-color-matching-in-javascript/
function cie1994(x, y) {
  var x = {l: x[0], a: x[1], b: x[2]};
  var y = {l: y[0], a: y[1], b: y[2]};
  labx = x;
  laby = y;
  var k2 = 0.015;
  var k1 = 0.045;
  var kl = 1;
  var kh = 1;
  var kc = 1;

  var c1 = Math.sqrt(x.a * x.a + x.b * x.b);
  var c2 = Math.sqrt(y.a * y.a + y.b * y.b);

  var sh = 1 + k2 * c1;
  var sc = 1 + k1 * c1;
  var sl = 1;

  var da = x.a - y.a;
  var db = x.b - y.b;
  var dc = c1 - c2;

  var dl = x.l - y.l;
  var dh = Math.sqrt((da * da) + (db * db) - (dc * dc));

  return Math.sqrt(Math.pow((dl/(kl * sl)),2) + Math.pow((dc/(kc * sc)),2) + Math.pow((dh/(kh * sh)),2));
};
