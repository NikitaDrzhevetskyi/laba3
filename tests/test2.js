const { Builder, By, Key, until } = require('selenium-webdriver');

// Оголошення тестової функції
async function testGoogleSearch() {
  // Ініціалізація WebDriver (в даному прикладі використовується Chrome)
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Крок 1: Відкрити сайт з полем для пошуку
    await driver.get('https://www.google.com');

    // Крок 2: Знайти поле вводу для пошуку та ввести текст
    let searchField = await driver.findElement(By.name('q'));
    await searchField.sendKeys('Selenium WebDriver', Key.RETURN);

    // Крок 3: Дочекатися, поки результати пошуку будуть відображені
    await driver.wait(until.elementLocated(By.id('search')), 5000);

    // Крок 4: Перевірити, чи відображаються результати пошуку
    let results = await driver.findElements(By.css('#search .g')); // Шукаємо елементи результатів пошуку
    if (results.length > 0) {
      console.log('Тест пройшов успішно: результати пошуку відображені.');
    } else {
      console.log('Тест провалено: результати пошуку не знайдені.');
    }
  } catch (error) {
    // Обробка помилки, якщо щось пішло не так
    console.error('Виникла помилка:', error);
  } finally {
    // Крок 5: Закрити браузер
    await driver.quit();
  }
}

// Виклик тестової функції
testGoogleSearch();
