describe "Item", ->
  test = {}
  beforeEach ->
    test.item = new Item 1, "Magic Mouse", "Super awesome", 50

  describe "updating an item", ->
    it "should update only the properties passed to it", ->
      test.item.update
        "title" : "The Magic Mouse"
        "cost" : 49.50
      expect(test.item.title).toEqual "The Magic Mouse"
      expect(test.item.cost).toEqual 49.50
      expect(test.item.desc).toEqual "Super awesome"

    it "should not be able to update the ID property as its protected", ->
      test.item.update
        "title" : "The Magic Mouse"
        "id" : 49
      expect(test.item.title).toEqual "The Magic Mouse"
      expect(test.item.id).toEqual 1

  describe "protected fields", ->
    it "should be able to add a new protected field to the array", ->
      priorCount = test.item.protectedFields.length
      test.item.addProtected "desc"
      expect(test.item.protectedFields.length).toEqual priorCount+1
    it "should protect the ID field by default", ->
      expect(test.item.protectedFields).toContain("id")
    it "should stop the update method updating the field if it's protected", ->
      test.item.addProtected "desc"
      test.item.update
        "desc" : "new description"
      expect(test.item.desc).toEqual "Super awesome"

  describe "isProtected()", ->
    it "should return true if field is protected", ->
      expect(test.item.isProtected("id")).toBeTruthy()
    it "should return false if field is not protected or does not exist", ->
      expect(test.item.isProtected("desc")).toBeFalsy()
      expect(test.item.isProtected("foo")).toBeFalsy()

  describe "getting ratings from websites", ->
    beforeEach ->
      spyOn(test.item, 'getRatings').andCallFake ->
        JSON.parse('{"ratings":[{"rating":4,"review":"This is a really great product","source":"Amazon"},{"rating":1,"review":"I didnt really like it that much it wasnt very good","source":"PC World"},{"rating":3,"review":"Its pretty average.","source":"Ebay"}]}')

    it "should return three latest ratings", ->
      expect(test.item.getRatings().ratings.length).toEqual 3
    it "should be able to parse an individual rating's score", ->
      expect(test.item.getRatings().ratings[0].rating).toEqual 4
