const express = require("express");
const app = express();
const PORT = 1004;

app.get("/", (req, res) => {
    res.send("여기는 메인 페이지");
});
app.get("/login", (req, res) => {
    res.send("여기는 로그인 페이지");
})

app.listen(PORT, function () {
    console.log("서버 가동이닷");
});
