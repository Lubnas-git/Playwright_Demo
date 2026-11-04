
exports.CartPage = class CartPage{

constructor(page){
    this.page = page;
    this.cart_item = page.locator('.cart_item');
}


}