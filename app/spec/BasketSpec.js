
describe("Basket", function() {
  var test;
  test = {};
  beforeEach(function() {
    test.basket = new Basket();
    return test.item = new Item("Macbook Air", "Newer, thinner, better", 799);
  });
  it("should be able to add item to basket", function() {
    test.basket.add(test.item);
    return expect(test.basket.count).toEqual(1);
  });
  it("should be able to remove item from basket", function() {
    test.basket.remove(1);
    return expect(test.basket.count).toEqual(0);
  });
  return it("should be able to calculate total price", function() {
    test.basket.calculate();
    return expect(test.basket.calculate()).toEqual(799);
  });
});
