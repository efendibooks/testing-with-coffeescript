class Basket
  constructor: ->
    @items = []
    @distinctCount = 0
    @totalCount = 0

  add: (item, quantity) ->
    if @itemExistsInBasket(item.id)
      curItemLoc = @getItemLocation item.id
      @items[curItemLoc].quantity += quantity
    else
      @items.push({
        "item_id" : item.id,
        "quantity": quantity,
        "item" : item
      })
      @distinctCount++

    @totalCount += quantity

  remove: (item_id, quantity="all") ->
    return false if not @itemExistsInBasket item_id
    removeAll = (item_id) =>
      i = @getItemLocation item_id
      @items[i] = null
      @updateItems()

    removeQuantity = (quantity, item_loc) =>
      @items[item_loc].quantity -= quantity

    if quantity is "all"
      removeAll item_id
    else
      loc = @getItemLocation item_id
      item = @items[loc]
      if item.quantity <= quantity
        removeAll item_id
      else
        removeQuantity quantity, loc

  calculateTotal: ->
    total = 0
    for i in @items
      total += i.item.cost * i.quantity
    total

  getQuantity: (item_id) ->
    for i in @items
      return i.quantity if i.item_id is item_id
    false

  itemExistsInBasket: (item_id) ->
    for i in @items
      return true if i.item_id is item_id
    false

  getItemLocation: (item_id) ->
    count = 0
    for i in @items
      return count if i.item_id is item_id
      ++count
    false

  updateItems: ->
    newArr = []
    for i in @items
      if i isnt null
        newArr.push i

    @items = newArr







