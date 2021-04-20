module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;
    this.totalColor= oldCart.totalColor || 0;
 
    this.add = function(item, id){
        var storedItem = this.items[id];
        if (!storedItem){
            storedItem = this.items[id] = {item: item, qty: 0, price: 0}
        }
        storedItem.qty++;
        storedItem.color = storedItem.item.color * storedItem.qty;
        console.log(storedItem.color)
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
        this.totalColor += storedItem.item.color;
        console.log(this.totalColor)
    };
    this.reduceByOne = function(id){
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;
        this.items[id].color -= this.items[id].item.color;
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price;
        this.totalColor -= this.items[id].item.color;

        if (this.items[id].qty <= 0){
            delete this.items[id];
        }
    };

    this.sumar = function(id){
        this.items[id].qty++;
        this.items[id].price += this.items[id].item.price;
        this.items[id].color += this.items[id].item.color;
        this.totalQty++;
        this.totalPrice += this.items[id].item.price;
        this.totalColor += this.items[id].item.color;
    };
  


    this.removeItem = function(id){
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        this.totalColor -= this.items[id].color;
        delete this.items[id];
    };

    this.generateArray = function(){
        var arr = [];
        for (var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    };
};