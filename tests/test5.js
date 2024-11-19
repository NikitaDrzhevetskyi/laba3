const { Builder, By, until } = require('selenium-webdriver');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const sleep = promisify(setTimeout);

// Ініціалізація WebDriver для Chrome
const driver = new Builder().forBrowser('chrome').build();

// Функція для тестування входу
async function loginTest(username, password) {
  try {
    await driver.get('https://learn.ztu.edu.ua/login/index.php');

    const usernameField = await driver.findElement(By.name('username'));
    const passwordField = await driver.findElement(By.name('password'));

    await usernameField.sendKeys(username);
    await passwordField.sendKeys(password);

    await sleep(2000); // Чекати 3 секунди

    // Відправка форми
    const loginButton = await driver.findElement(By.id('loginbtn'));
    await loginButton.click();

    await sleep(5000); // Чекати 5 секунд для завантаження сторінки

    // Перевірка результату входу
    const title = await driver.getTitle();
    if (!title.includes('Державний університет')) {
      console.log('Login failed: Expected title not found.');
      await driver.takeScreenshot().then((image) => {
        require('fs').writeFileSync('failed_login.png', image, 'base64');
      });
    } else {
      console.log('Login successful!');
    }
  } catch (error) {
    console.error('Error during login test:', error);
  }
}

// Читання даних з CSV та запуск тестів
async function runTests() {
  const csvFilePath = path.resolve('data.csv');
  const results = [];

  // Зчитування даних з CSV
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      for (const row of results) {
        await loginTest(row.username, row.password);
      }
      // Закриття браузера після виконання тестів
      await driver.quit();
    });
}

// Запуск тестів
runTests();
