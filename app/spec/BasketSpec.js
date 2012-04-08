
describe("Basket", function() {
  var test;
  test = {};
  beforeEach(function() {
    var item2;
    test.basket = new Basket();
    console.log(test.basket);
    test.item = new Item(001, "Macbook Air", "Newer, thinner, better", 799);
    item2 = new Item(002, "Magic Trackpad", "Better than a mouse", 50);
    return test.basket.add(item2, 1);
  });
  it("should be able to add a new item to basket", function() {
    var priorCountVal;
    priorCountVal = test.basket.distinctCount;
    test.basket.add(test.item, 1);
    return expect(test.basket.distinctCount).toEqual(priorCountVal + 1);
  });
  return it("should be able to update quantity when adding an item already in the basket", function() {
    var priorCountVal;
    test.basket.add(test.item, 1);
    priorCountVal = test.basket.getQuantity(001);
    test.basket.add(test.item, 1);
    return expect(test.basket.getQuantity(001)).toEqual(priorCountVal + 1);
  });
});
