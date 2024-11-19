const { Builder, By, until } = require('selenium-webdriver');

async function testNavigation() {
  // Налаштування WebDriver
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // Перехід на цільову сторінку
    await driver.get('https://www.google.com');

    // Очікування завантаження сторінки
    await driver.sleep(2000);

    // Знаходимо перше посилання
    let firstLink = await driver.findElement(By.xpath('//a[@href]'));
    let currentUrl = await driver.getCurrentUrl();
    console.log(`Початковий URL: ${currentUrl}`);

    // Переконуємося, що посилання клікабельне
    await driver.wait(until.elementIsVisible(firstLink), 10000);
    await firstLink.click();

    // Очікуємо завантаження нової сторінки
    await driver.sleep(2000);

    // Отримуємо URL нової сторінки
    let newUrl = await driver.getCurrentUrl();
    console.log(`Новий URL після переходу: ${newUrl}`);

    // Перевіряємо новий URL
    if (newUrl.startsWith('https://')) {
      console.log('URL на новій сторінці правильний!');
    } else {
      console.log(`Невірний URL: ${newUrl}`);
    }

    // Повертаємося на початкову сторінку
    await driver.navigate().back();

    // Очікуємо завантаження початкової сторінки
    await driver.sleep(2000);

    // Перевіряємо URL після повернення
    let finalUrl = await driver.getCurrentUrl();
    console.log(`URL після повернення на початкову сторінку: ${finalUrl}`);

    if (finalUrl === currentUrl) {
      console.log('Ми успішно повернулися на початкову сторінку!');
    } else {
      console.log('Щось пішло не так при поверненні.');
    }
  } catch (error) {
    console.error(`Сталася помилка: ${error}`);
  } finally {
    // Завершуємо роботу WebDriver
    await driver.quit();
  }
}

// Виклик функції
testNavigation();
