const { Builder } = require('selenium-webdriver');

async function checkTitle() {
  // Створюємо новий екземпляр браузера Chrome
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Переходимо на сайт google.com
    await driver.get('https://google.com');

    // Отримуємо заголовок сторінки
    let actualTitle = await driver.getTitle();

    // Очікуваний заголовок
    let expectedTitle = 'Google';

    // Перевіряємо, що заголовок відповідає очікуваному
    if (actualTitle === expectedTitle) {
      console.log('Тест пройдено: Заголовок відповідає очікуваному');
    } else {
      console.log(`Тест не пройдено: Очікувався "${expectedTitle}", але отримано "${actualTitle}"`);
    }
  } finally {
    // Закриваємо браузер
    await driver.quit();
  }
}
// Викликаємо функцію для виконання тесту
checkTitle();
