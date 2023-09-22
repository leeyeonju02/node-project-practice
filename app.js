const express = require("express");
const ejs = require("ejs");
const app = express();
const PORT = 1004;
const router = require('./router');
const bodyParser = require('body-parser');
const connection = require('./database');
const bcrypt = require('bcryptjs');

// 앱 세팅
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

//데이터베이스 보기 
app.get('/', async (req, res) => {
    let sql = "SELECT * FROM lyj_users";
    try {
        const [results] = await connection.query(sql);
        res.send(results);
    } catch (err) {
        throw err;
    }
});


app.post("/register", async (req, res) => {
    const { email, password } = req.body; // 클라이언트에서 보내는 값 받기.

    // 이메일 형식 검사
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).send("이메일 형식이 아니야");
    }

    // 비밀번호 길이 검사
    if (password.length < 8) {
        return res.status(400).send("비밀번호가 8자리 미만은 안돼");
    }

    try {
        //이미 존재하는 이메일인지 겹치지 않게 (unique)
        const [users] = await connection.query("SELECT * FROM lyj_users WHERE email = ?", [email]);
        if (users.length > 0) {
            return res.status(400).send("이미 있는 이메일이야");
        }

        // 비밀번호 해싱
        const saltRounds = 10; // 솔트 생성 라운드 수
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const [results] = await connection.query(
            "INSERT INTO lyj_users (email, password) VALUES (?, ?)", // SQL 명령어 : 선택한 테이블에 새로운 데이터 삽입 
            [email, hashedPassword] // 해싱된 비밀번호를 저장
        );

        res.status(200).send("게시물을 성공적으로 작성했습니다.");

    } catch (error) {
        console.error(error);
        res.status(500).send("DB 오류 발생.");
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // 이메일, 비번이 비어있는지
    if (!email || !password) {
        return res.status(400).json({ error: "이메일 또는 비밀번호가 비어 있습니다." });
    }

    try {
        // 이메일이 존재하지 않으면
        const [users] = await connection.query("SELECT * FROM lyj_users WHERE email = ?", [email]);

        if (users.length === 0) {
            return res.status(400).json({ error: "해당 이메일이 존재하지 않습니다." });
        }

        // DB내에 해싱된 비번이랑 맞는지 확인
        const hashedPassword = users[0].password;
        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        if (!passwordMatch) {
            return res.status(400).json({ error: "비밀번호가 일치하지 않습니다." });
        }


        return res.status(200).json({ message: "로그인 성공!" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "DB 오류 발생." });
    }
});

app.listen(PORT, function () {
    console.log(`서버 가동이닷! 접속 주소: http://localhost:${PORT}`);
});








