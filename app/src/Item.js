var Item;

Item = (function() {

  function Item(id, title, desc, cost) {
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.cost = cost;
    this.protectedFields = ["id"];
  }

  Item.prototype.update = function(opts) {
    var key, _results;
    _results = [];
    for (key in opts) {
      if ((this[key] != null) && !this.isProtected(key)) {
        _results.push(this[key] = opts[key]);
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Item.prototype.addProtected = function(field) {
    return this.protectedFields.push(field);
  };

  Item.prototype.isProtected = function(field) {
    var pF, _i, _len, _ref;
    _ref = this.protectedFields;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      pF = _ref[_i];
      if (field === pF) return true;
    }
    return false;
  };

  return Item;

})();
