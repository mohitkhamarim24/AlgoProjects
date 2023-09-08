const { rejects } = require('assert');
const {exec} = require ('child_process');
const { errorMonitor } = require('events');
const fs = require('fs');
const path = require('path');
const { stdout, stderr } = require('process');

const outputPath = path.join(__dirname, "outputs");

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, {recursive:true});
}

const excecuteCpp = (Filepath) => {
    const jobId = path.basename(Filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.exe`);
    return new Promise((resolve, reject) => {
        exec(`g++ ${Filepath} -o "${outPath}" && "${outPath}"`,
            (error, stdout, stderr) => {
                if (error) {
                    console.error("Compilation error:", error);
                    console.error("Compilation stderr:", stderr);
                    reject({ error, stderr });
                } else if (stderr) {
                    console.error("Execution error:", stderr);
                    reject(stderr);
                } else {
                    console.log("Compilation and execution successful.");
                    resolve(stdout);
                }
            });
    });
};
module.exports = {
    excecuteCpp
}