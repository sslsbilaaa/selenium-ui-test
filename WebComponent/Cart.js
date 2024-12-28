const { By } = require('selenium-webdriver')

class Cart {
    constructor(driver){
        this.driver = driver;
        this.addcartButton = By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']");
        this.cartButton = By.xpath("//a[.='1']");
    } 

    async addcart(){
        await this.driver.findElement(this.addcartButton).click();
    }

    async isoncart(){
        const product = await this.driver.findElement(this.cartButton);
        return product.getText();
    }
}

module.exports = Cart;