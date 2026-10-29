exports.InventroyPage = class InventoryPage {
//class LoignPage {} => this is how you create a class in Javascript
    constructor(page) {
        this.page = page;
        // this.username_textbox = page.getByRole('textbox',{name: 'Username'});
        // this.password_textbox = page.getByRole('textbox',{name:'Password'});
        // this.login_button = page.getByRole('button', {name: 'Login' });
    }

    async gotoInventroyPage(){
        //await this.page.goto('https://www.saucedemo.com');
    }
    // async login(username, password){
    //     await this.username_textbox.fill(username);
    //     await this.password_textbox.fill(password);
    //     await this.login_button.click();
    // }

}