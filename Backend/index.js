const express = require("express");
const cors = require("cors");
const { generate, generateFile } = require('./generate')
const app = express();
app.use(cors());
const {excecuteCpp} = require("./executeCpp");
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.get("/" ,(req ,res) =>{
   return res.json({hello:"world!"});
});

app.post("/run", async (req, res, next) => {
    try {
        const { language = "cpp", code } = req.body;
        if (code == undefined) {
            return res.status(400).json({ success: false, error: "Empty code body!" });
        }
        const filepath = await generateFile(language, code);
        const output = await excecuteCpp(filepath);
        return res.json({ filepath, output });
    } catch (error) {
        next(error);
    }
});
app.listen(5000, () => {
 console.log(`Listening on port 5000!`);
});