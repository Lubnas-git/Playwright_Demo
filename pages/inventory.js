//this class is unused

exports.InventoryPage = class InventoryPage {
    constructor(page) {
        this.page = page;
        this.inventory_items = page.locator('.inventory_item');
    
    }

}