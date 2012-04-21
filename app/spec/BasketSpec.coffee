describe "Basket", ->
  test = {}
  beforeEach ->
    test.basket = new Basket()
    test.item = new Item 1, "Macbook Air", "Newer, thinner, better", 800
    test.item2 = new Item 2, "Magic Trackpad", "Better than a mouse", 50
    test.basket.add test.item2, 1

  describe "adding items", ->

    it "should be able to add a new item to basket", ->
      priorCountVal = test.basket.distinctCount
      test.basket.add(test.item, 1)
      expect(test.basket.distinctCount).toEqual priorCountVal + 1

    it "should be able to update quantity when adding an item already in the basket", ->
      test.basket.add(test.item, 1)
      priorCountVal = test.basket.getQuantity(1)
      test.basket.add(test.item, 1)
      expect(test.basket.getQuantity(1)).toEqual priorCountVal + 1

    it "should update the total count by 1 when adding a brand new item", ->
      priorCountVal = test.basket.totalCount
      test.basket.add(test.item, 1);
      expect(test.basket.totalCount).toEqual priorCountVal + 1

    it "should increase total count by 1 when adding one more of an item that already exists", ->
      test.basket.add(test.item, 1)
      priorCountVal = test.basket.totalCount
      test.basket.add(test.item, 1)
      expect(test.basket.totalCount).toEqual priorCountVal + 1

    it "should update distinct count when adding brand new item", ->
      priorCountVal = test.basket.distinctCount
      test.basket.add(test.item, 1)
      expect(test.basket.distinctCount).toEqual priorCountVal + 1

    it "should not update distinct count when adding more of an item that already exists", ->
      test.basket.add(test.item, 1)
      priorCountVal = test.basket.distinctCount
      test.basket.add(test.item, 2)
      expect(test.basket.distinctCount).toEqual priorCountVal

  describe "removing items", ->
    it "should return false if item does not exist to remove", ->
      expect(test.basket.remove(39)).toBeFalsy()

    it "should remove a specific quantity if given a second parameter", ->
      test.basket.add(test.item, 5)
      prevCountVal = test.basket.getQuantity(1);
      test.basket.remove(1,1)
      expect(test.basket.getQuantity(1)).toEqual 4

    it "should remove all items if not given a second parameter", ->
      test.basket.add(test.item, 1)
      test.basket.remove(1)
      expect(test.basket.getQuantity(1)).toBeFalsy()

    it "should remove all items if quantity given is more than the quantity in basket", ->
      test.basket.add(test.item, 2)
      test.basket.remove(1, 5)
      expect(test.basket.getQuantity(1)).toBeFalsy()

    it "should remove all items if quantity given is the same as the quantity in basket", ->
      test.basket.add(test.item, 2)
      test.basket.remove(1,2)
      expect(test.basket.getQuantity(1)).toBeFalsy()

  describe "calculating total cost", ->
    it "should calculate the cost for a single item in the basket", ->
      expect(test.basket.calculateTotal()).toEqual 50

    it "should calculate the cost for 1 item type with multiple quantities", ->
      test.basket.add(test.item2, 3)
      expect(test.basket.calculateTotal()).toEqual 200

    it "should calculate cost for multiple items and multiple quantities", ->
      test.basket.add(test.item2, 2)
      test.basket.add(test.item, 2)
      expect(test.basket.calculateTotal()).toEqual 1750

  describe "helper functions in the Basket class", ->
    describe "getQuantity", ->

      it "should return false if passed an id that is not in array", ->
        expect(test.basket.getQuantity(12345)).toBeFalsy()

      it "should return false if passed an invalid argument, such as a string", ->
        expect(test.basket.getQuantity("hello!")).toBeFalsy()

      it "should return the quantity if given a valid id", ->
        expect(test.basket.getQuantity(2)).toEqual 1

    describe "itemExistsInBasket", ->
      it "should return false if item id does not exist", ->
        expect(test.basket.itemExistsInBasket(23455)).toBeFalsy()

      it "should return true if item id does exist", ->
        expect(test.basket.itemExistsInBasket(2)).toBeTruthy()

      it "should return false if given an invalid argument, such as a string", ->
        expect(test.basket.itemExistsInBasket("hello")).toBeFalsy()

    describe "getItemLocation", ->

      it "should return the location of item when given valid id", ->
        expect(test.basket.getItemLocation(2)).toEqual 0

      it "should return false if item doesn't exist", ->
        expect(test.basket.getItemLocation(39)).toBeFalsy()

      it "should return false if given a invalid input", ->
        expect(test.basket.getItemLocation("hello")).toBeFalsy()


  #it "should be able to calculate total price", ->
    #test.basket.calculate()
    #expect(test.basket.calculate()).toEqual 799


