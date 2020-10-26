const fs = require("fs");

try {
  const distFiles = fs.readdirSync('dist')
  distFiles.forEach(i => {
    fs.unlinkSync(`dist/${i}`)
  });
  if (fs.statSync('index.html')) {
    // index.htmlのコピー
    fs.copyFileSync('index.html', 'dist/index.html')
    console.info("Set up files");
  }
} catch (e) {
  console.error(`Error ${e}`)
}