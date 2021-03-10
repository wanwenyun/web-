function myCreate(prote) {
  function f() {}
  f.prototype = prote

  return new f()
}