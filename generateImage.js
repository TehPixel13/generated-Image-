const { spwan } = require("node:child_process");
const fs = require("node:fs");

if (!fs.existsSync("./tmp")) {

  fs.mkdirSync("./tmp"); 
}
async function generateImage(id,prompt) {
    const outputDir = `output/${id}`;

  await new Promise((resolve) => {
    const options = ["--model", "SD-2.1", "--outdir", "output", prompt];

    const cmd = spwan("imagine", options);

    cmd.stderr.on("data", (data) => {
     console.log(`stderr: ${data}`);
    });

    cmd.on("close", (code) => {
     console.log(`child proccess exited with code ${code}`)
     resolve();
    });
});

const jpegs = fs
  .filter((file) => file.endsWith(".jpg"));

  const file = `./tmp${id}/.jpg`;
  fs.renameSync(`./${outputDir}/generated/${jpegs[0]}`, file);

  fs.rmSync(`./${outputDir}`, { recursive: true });

  return { file };
}

 
module.exports = { generateImage };