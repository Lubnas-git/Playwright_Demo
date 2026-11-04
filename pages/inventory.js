//this class is unused

exports.InventoryPage = class InventoryPage {
    constructor(page) {

        this.page = page;

        this.inventory_items = page.locator('.inventory_item');

        this.product_sort = page.locator('.product_sort_container');

        this.item_name = page.locator('.inventory_item_name');
        this.item_price = page.locator('.inventory_item_price');
        this.item_description = page.locator('.inventory_item_desc');

        this.shopping_cart = page.locator('.shopping_cart_link');

        this.burger_menu = page.getByRole("button", { name: "Open Menu" });
        
        this.dynamic_catalog = page.getByRole('button',{name: 'Dynamic Catalog'});
     }

}