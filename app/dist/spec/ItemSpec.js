
describe("Item", function() {
  var test;
  test = {};
  beforeEach(function() {
    return test.item = new Item(1, "Magic Mouse", "Super awesome", 50);
  });
  describe("updating an item", function() {
    it("should update only the properties passed to it", function() {
      test.item.update({
        "title": "The Magic Mouse",
        "cost": 49.50
      });
      expect(test.item.title).toEqual("The Magic Mouse");
      expect(test.item.cost).toEqual(49.50);
      return expect(test.item.desc).toEqual("Super awesome");
    });
    return it("should not be able to update the ID property", function() {
      test.item.update({
        "title": "The Magic Mouse",
        "id": 49
      });
      expect(test.item.title).toEqual("The Magic Mouse");
      return expect(test.item.id).toEqual(1);
    });
  });
  describe("protected fields", function() {
    it("should be able to add a new protected field to the array", function() {
      var priorCount;
      priorCount = test.item.protectedFields.length;
      test.item.addProtected("desc");
      return expect(test.item.protectedFields.length).toEqual(priorCount + 1);
    });
    it("should protect the ID field by default", function() {
      return expect(test.item.protectedFields).toContain("id");
    });
    return it("should stop the update method updating the field if it's protected", function() {
      test.item.addProtected("desc");
      test.item.update({
        "desc": "new description"
      });
      return expect(test.item.desc).toEqual("Super awesome");
    });
  });
  return describe("isProtected()", function() {
    it("should return true if field is protected", function() {
      return expect(test.item.isProtected("id")).toBeTruthy();
    });
    return it("should return false if field is not protected or does not exist", function() {
      expect(test.item.isProtected("desc")).toBeFalsy();
      return expect(test.item.isProtected("foo")).toBeFalsy();
    });
  });
});