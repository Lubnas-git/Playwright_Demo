//this class is unused

exports.InventoryPage = class InventoryPage {
    constructor(page) {

        this.page = page;

        this.inventory_items = page.locator('.inventory_item');

        this.product_sort = page.locator('.product_sort_container');

        this.item_name = page.locator('.inventory_item_name');
        this.item_price = page.locator('.inventory_item_price');
        this.item_description = page.locator('.inventory_item_desc');

        this.shopping_cart = page.locator('.shopping_cart_badge');

        this.add_to_cart_btn = page.getByRole('button', { name: 'Add to Cart' });
        this.remove_btn = page.getByRole('button', { name: 'Remove' });
    }

}