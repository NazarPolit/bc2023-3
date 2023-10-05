const fs = require('fs');

function analyzeAndWriteToFile(inputFilePath, outputFilePath) {
  fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Помилка читання файлу JSON:', err);
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      const outputData = [];

      for (const item of jsonData) {
        if (item.parent === "BS3_BanksLiab") {
          const result = `${item.txten}:${item.value}`;
          outputData.push(result);
        }
      }

      fs.writeFile(outputFilePath, outputData.join('\n'), 'utf8', (err) => {
        if (err) {
          console.error('Помилка запису в файл:', err);
        } else {
          console.log('Результати аналізу записані у файл output.txt');
        }
      });
    } catch (err) {
      console.error('Помилка при розборі JSON:', err);
    }
  });
}

analyzeAndWriteToFile('data.json', 'output.txt');
