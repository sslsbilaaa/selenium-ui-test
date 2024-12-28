const { Builder }  = require('selenium-webdriver');
const LoginPage = require('./WebComponent/LoginPage');
const DashboardPage = require('./WebComponent/DashboardPage');
const assert = require('assert');
const Cart = require('./WebComponent/Cart');


describe('TestCase 3', function (){
    this.timeout(40000);
    let driver;

    //Run setiap mulai test, satu kali saja paling awal
    before(async function (){
        driver = await new Builder().forBrowser('chrome').build();
    });

    //Test Suite dimulai dengan apa, setiap melakukan tes
    beforeEach(async function(){
        const loginPage = new LoginPage(driver);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    //Assertion atau validasi
    it('Login Successfully and verify dashboard', async function (){
        const dashboardPage = new DashboardPage(driver);
        const title = await dashboardPage.isOnDashboard();
        assert.strictEqual(title, 'Products', 'expected dashboard title to be Products')
    });

    afterEach(async function(){
        const cart = new Cart(driver);
        await cart.addcart();
        await cart.isoncart();
    })

    after(async function (){
        await driver.quit();
    });
})