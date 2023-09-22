var express = require("express");
var router = express.Router();



//라우팅 
// app.get("/", (req, res) => {
//     res.render('index');  // ./views/index.ejs
// });
// app.get("/login", (req, res) => {
//     res.render('login');
// });
// app.get("/contact", (req, res) => {
//     res.render('contact');
// });

// app.post("/contactProc", (req, res) => {
//     const name = req.body.name,
//         email = req.body.email,
//         memo = req.body.memo;

//     var response = `이름 : ${name}, 이메일 : ${email}, 메모: ${memo} `
//     res.send(response);
//     //console.log(response);
// })

//연습1
// router.get('/:id', (req, res, next) => {
//     res.send('파라미터: ' + req.params.id);
// });
// router.post('/', (req, res, next) => {
//     res.send('제목: ' + req.body.title);
// });
// router.put('/', (req, res, next) => {
//     res.send('put /')
// });
// router.delete('/', (req, res, next) => {
//     res.send('year: ' + req.body.year);
// });




// router.post('/data', (req, res) => {
//     // Postman으로 전송된 데이터를 req.body에서 가져옵니다.
//     const { id, psword } = req.body;

//     // 데이터를 콘솔에 출력합니다.
//     console.log(`Received Data: id = ${id}, password = ${psword}`);

//     // 서버에서 만든 데이터를 응답으로 보냅니다.
//     const responseData = { message: 'Data received successfully', id, psword };
//     res.json(responseData);
// });



module.exports = router;