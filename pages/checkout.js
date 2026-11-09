exports.CheckoutPage = class CheckoutPage {

constructor(page){
    this.page = page;
    this.checkout_Btn = page.getByRole("button", { name: "Checkout" });
    this.continue_Btn = page.getByRole("button", { name: "Continue" });
    this.finish_Btn = page.getByRole("button", { name: "Finish" });

    this.first_Name = page.getByLabel("First Name");
    this.last_Name = page.getByLabel("Last Name");
    this.zip_Code = page.getByLabel("Zip/Postal Code");
}

}