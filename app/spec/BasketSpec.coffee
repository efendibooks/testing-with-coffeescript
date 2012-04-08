describe "Basket", ->
  test = {}
  beforeEach ->
    test.basket = new Basket()
    test.item = new Item "Macbook Air", "Newer, thinner, better", 799

  it "should be able to add item to basket", ->
    test.basket.add(test.item)
    expect(test.basket.count).toEqual 1

  it "should be able to remove item from basket", ->
    test.basket.remove(1)
    expect(test.basket.count).toEqual 0

  it "should be able to calculate total price", ->
    test.basket.calculate()
    expect(test.basket.calculate()).toEqual 799


