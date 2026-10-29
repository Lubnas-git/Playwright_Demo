
//to be able to use the LoginPage class in another file, you would need to 
//make it exportable by using exports.LoginPage = class LoginPage{ etc}
// and ofcourse in the file where you need to use it, you have to import it their.

exports.LoginPage = class LoginPage {
//class LoignPage {} => this is how you create a class in Javascript
    constructor(page) {
        this.page = page;
        this.username_textbox = page.getByRole('textbox',{name: 'Username'});
        this.password_textbox = page.getByRole('textbox',{name:'Password'});
        this.login_button = page.getByRole('button', {name: 'Login' });
    }

    async gotoLoginPage(){
        await this.page.goto('https://www.saucedemo.com');
    }
    async login(username, password){
        await this.username_textbox.fill(username);
        await this.password_textbox.fill(password);
        await this.login_button.click();
    }

}