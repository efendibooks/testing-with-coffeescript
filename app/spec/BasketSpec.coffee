describe "Basket", ->
  test = {}
  beforeEach ->
    test.basket = new Basket()
    console.log(test.basket)
    test.item = new Item 001, "Macbook Air", "Newer, thinner, better", 799
    item2 = new Item(002, "Magic Trackpad", "Better than a mouse", 50)
    test.basket.add item2, 1

  it "should be able to add a new item to basket", ->
    priorCountVal = test.basket.distinctCount
    test.basket.add(test.item, 1)
    expect(test.basket.distinctCount).toEqual priorCountVal + 1

  it "should be able to update quantity when adding an item already in the basket", ->
    test.basket.add(test.item, 1)
    priorCountVal = test.basket.getQuantity(001)
    test.basket.add(test.item, 1)
    expect(test.basket.getQuantity(001)).toEqual priorCountVal + 1



  #it "should be able to remove item from basket", ->
    #test.basket.remove("Macbook Air", 1)
    #expect(test.basket.count).toEqual 0

  #it "should be able to calculate total price", ->
    #test.basket.calculate()
    #expect(test.basket.calculate()).toEqual 799


