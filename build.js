const fs = require("fs");

try {
  const folder = 'dist'

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }

  const distFiles = fs.readdirSync(folder)
  distFiles.forEach(i => {
    try {
      fs.rmdirSync(`${folder}/${i}`)
      console.info(`Deleted : ${i}`)
    } catch (e) {
      console.error(`Folder : ${e}`)
    }
    fs.unlinkSync(`${folder}/${i}`)
  });

  if (fs.statSync('src/html/index.html')) {
    // index.htmlのコピー
    try {
      fs.copyFileSync('src/html/index.html', `${folder}/index.html`)
    } catch (e) {
      console.error(`Error: Can't copy index.html(${e})`)
    }
  }

  if (fs.statSync('src/img')) {
    const imgFolder = fs.readdirSync('src/img');
    if (!fs.existsSync(`${folder}/img`)) {
      fs.mkdirSync(`${folder}/img`)
    }
    imgFolder.forEach(i => {
      fs.copyFileSync(`src/img/${i}`, `${folder}/img/${i}`);
    });
    console.info("Set up files");
  }
} catch (e) {
  console.error(`Process error ${e}`)
}