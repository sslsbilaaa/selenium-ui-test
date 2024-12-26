const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function sauceDemoLoginTest(){
    //Membuat koneksi dengan Browser Driver
    let driver = await new Builder().forBrowser('chrome').build();

    try{
        await driver.get("https://www.saucedemo.com");
        //Masukkan Username dan Password
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.xpath("//input[@id='password']")).sendKeys('secret_sauce');

        //Click Button Login
        await driver.findElement(By.xpath("//input[@id='login-button']")).click();

        //Memastikan kita di dashboard dengan mencari "Swag Labs"
        let titleText = await driver.findElement(By.xpath("//div[@class='app_logo']")).getText();
        assert.strictEqual(titleText.includes('Swag Labs'), true, "Title does not include'Swag Labs'");

        //Memastikan kita di dashboard dengan mencari "Burger button"
        let menuButton = await driver.findElement(By.xpath("//button[@id='react-burger-menu-btn']"));
        assert.strictEqual(await menuButton.isDisplayed(), true, "Menu Button is not visible");

        //Find Product Sauce Labs Backpack
        let title = await driver.findElement(By.xpath("//div[@class='inventory_container']")).getText();
        assert.strictEqual(title.includes('Sauce Labs Backpack'), true, "Title does not include'Sauce Labs Backpack'");

        //Click Button Add Produk To Cart
        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']")).click();

        //Validate the Product Has Been Added To Cart
        await driver.findElement(By.xpath("//div[@id='shopping_cart_container']/a[1]")).click();
        let titleProduct = await driver.findElement(By.xpath("//div[@class='inventory_item_name']")).getText();
        assert.strictEqual(titleProduct.includes('Sauce Labs Backpack'), true, "Title does not include'Sauce Labs Backpack'");


    } finally {
        await driver.quit();
    }
}

sauceDemoLoginTest();