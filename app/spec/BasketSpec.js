
describe("Basket", function() {
  var test;
  test = {};
  beforeEach(function() {
    test.basket = new Basket();
    test.item = new Item(1, "Macbook Air", "Newer, thinner, better", 800);
    test.item2 = new Item(2, "Magic Trackpad", "Better than a mouse", 50);
    return test.basket.add(test.item2, 1);
  });
  describe("adding items", function() {
    it("should be able to add a new item to basket", function() {
      var priorCountVal;
      priorCountVal = test.basket.distinctCount;
      test.basket.add(test.item, 1);
      return expect(test.basket.distinctCount).toEqual(priorCountVal + 1);
    });
    it("should be able to update quantity when adding an item already in the basket", function() {
      var priorCountVal;
      test.basket.add(test.item, 1);
      priorCountVal = test.basket.getQuantity(1);
      test.basket.add(test.item, 1);
      return expect(test.basket.getQuantity(1)).toEqual(priorCountVal + 1);
    });
    it("should update the total count by 1 when adding a brand new item", function() {
      var priorCountVal;
      priorCountVal = test.basket.totalCount;
      test.basket.add(test.item, 1);
      return expect(test.basket.totalCount).toEqual(priorCountVal + 1);
    });
    it("should increase total count by 1 when adding one more of an item that already exists", function() {
      var priorCountVal;
      test.basket.add(test.item, 1);
      priorCountVal = test.basket.totalCount;
      test.basket.add(test.item, 1);
      return expect(test.basket.totalCount).toEqual(priorCountVal + 1);
    });
    it("should update distinct count when adding brand new item", function() {
      var priorCountVal;
      priorCountVal = test.basket.distinctCount;
      test.basket.add(test.item, 1);
      return expect(test.basket.distinctCount).toEqual(priorCountVal + 1);
    });
    return it("should not update distinct count when adding more of an item that already exists", function() {
      var priorCountVal;
      test.basket.add(test.item, 1);
      priorCountVal = test.basket.distinctCount;
      test.basket.add(test.item, 2);
      return expect(test.basket.distinctCount).toEqual(priorCountVal);
    });
  });
  describe("removing items", function() {
    it("should return false if item does not exist to remove", function() {
      return expect(test.basket.remove(39)).toBeFalsy();
    });
    it("should remove a specific quantity if given a second parameter", function() {
      var prevCountVal;
      test.basket.add(test.item, 5);
      prevCountVal = test.basket.getQuantity(1);
      test.basket.remove(1, 1);
      return expect(test.basket.getQuantity(1)).toEqual(4);
    });
    it("should remove all items if not given a second parameter", function() {
      test.basket.add(test.item, 1);
      test.basket.remove(1);
      return expect(test.basket.getQuantity(1)).toBeFalsy();
    });
    it("should remove all items if quantity given is more than the quantity in basket", function() {
      test.basket.add(test.item, 2);
      test.basket.remove(1, 5);
      return expect(test.basket.getQuantity(1)).toBeFalsy();
    });
    return it("should remove all items if quantity given is the same as the quantity in basket", function() {
      test.basket.add(test.item, 2);
      test.basket.remove(1, 2);
      return expect(test.basket.getQuantity(1)).toBeFalsy();
    });
  });
  describe("calculating total cost", function() {
    it("should calculate the cost for a single item in the basket", function() {
      return expect(test.basket.calculateTotal()).toEqual(50);
    });
    it("should calculate the cost for 1 item type with multiple quantities", function() {
      test.basket.add(test.item2, 3);
      return expect(test.basket.calculateTotal()).toEqual(200);
    });
    return it("should calculate cost for multiple items and multiple quantities", function() {
      test.basket.add(test.item2, 2);
      test.basket.add(test.item, 2);
      return expect(test.basket.calculateTotal()).toEqual(1750);
    });
  });
  return describe("helper functions in the Basket class", function() {
    describe("getQuantity", function() {
      it("should return false if passed an id that is not in array", function() {
        return expect(test.basket.getQuantity(12345)).toBeFalsy();
      });
      it("should return false if passed an invalid argument, such as a string", function() {
        return expect(test.basket.getQuantity("hello!")).toBeFalsy();
      });
      return it("should return the quantity if given a valid id", function() {
        return expect(test.basket.getQuantity(2)).toEqual(1);
      });
    });
    describe("itemExistsInBasket", function() {
      it("should return false if item id does not exist", function() {
        return expect(test.basket.itemExistsInBasket(23455)).toBeFalsy();
      });
      it("should return true if item id does exist", function() {
        return expect(test.basket.itemExistsInBasket(2)).toBeTruthy();
      });
      return it("should return false if given an invalid argument, such as a string", function() {
        return expect(test.basket.itemExistsInBasket("hello")).toBeFalsy();
      });
    });
    return describe("getItemLocation", function() {
      it("should return the location of item when given valid id", function() {
        return expect(test.basket.getItemLocation(2)).toEqual(0);
      });
      it("should return false if item doesn't exist", function() {
        return expect(test.basket.getItemLocation(39)).toBeFalsy();
      });
      return it("should return false if given a invalid input", function() {
        return expect(test.basket.getItemLocation("hello")).toBeFalsy();
      });
    });
  });
});
