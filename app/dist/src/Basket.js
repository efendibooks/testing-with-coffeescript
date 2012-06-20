// Generated by CoffeeScript 1.3.1
var Basket;

Basket = (function() {

  Basket.name = 'Basket';

  function Basket() {
    this.items = [];
    this.distinctCount = 0;
    this.totalCount = 0;
  }

  Basket.prototype.add = function(item, quantity) {
    var curItemLoc;
    if (this.itemExistsInBasket(item.id)) {
      curItemLoc = this.getItemLocation(item.id);
      this.items[curItemLoc].quantity += quantity;
    } else {
      this.items.push({
        "item_id": item.id,
        "quantity": quantity,
        "item": item
      });
      this.distinctCount++;
    }
    return this.totalCount += quantity;
  };

  Basket.prototype.remove = function(item_id, quantity) {
    var item, loc, removeAll, removeQuantity,
      _this = this;
    if (quantity == null) {
      quantity = "all";
    }
    if (!this.itemExistsInBasket(item_id)) {
      return false;
    }
    removeAll = function(item_id) {
      var i;
      i = _this.getItemLocation(item_id);
      _this.items[i] = null;
      return _this.updateItems();
    };
    removeQuantity = function(quantity, item_loc) {
      return _this.items[item_loc].quantity -= quantity;
    };
    if (quantity !== "all") {
      loc = this.getItemLocation(item_id);
      item = this.items[loc];
      if (item.quantity <= quantity) {
        return removeAll(item_id);
      } else {
        return removeQuantity(quantity, loc);
      }
    } else {
      return removeAll(item_id);
    }
  };

  Basket.prototype.calculateTotal = function() {
    var i, total, _i, _len, _ref;
    total = 0;
    _ref = this.items;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      total += i.item.cost * i.quantity;
    }
    return total;
  };

  Basket.prototype.getQuantity = function(item_id) {
    var i, _i, _len, _ref;
    _ref = this.items;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      if (i.item_id === item_id) {
        return i.quantity;
      }
    }
    return false;
  };

  Basket.prototype.itemExistsInBasket = function(item_id) {
    var i, _i, _len, _ref;
    _ref = this.items;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      if (i.item_id === item_id) {
        return true;
      }
    }
    return false;
  };

  Basket.prototype.getItemLocation = function(item_id) {
    var count, i, _i, _len, _ref;
    count = 0;
    _ref = this.items;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      if (i.item_id === item_id) {
        return count;
      }
      ++count;
    }
    return false;
  };

  Basket.prototype.updateItems = function() {
    var i, newArr, _i, _len, _ref;
    newArr = [];
    _ref = this.items;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      if (i !== null) {
        newArr.push(i);
      }
    }
    return this.items = newArr;
  };

  return Basket;

})();
