class Basket
  items: []
  distinctCount: 0
  totalCount: 0

  add: (item, quantity) ->
    if @itemExistsInBasket(item.id)
      curItemLoc = @getItemLocation item.id
      @items[curItemLoc].quantity += quantity
    else
      @items.push({
        "item_id" : item.id,
        "quantity": quantity
      })
      @distinctCount++

    @totalCount++

    console.log @items


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







