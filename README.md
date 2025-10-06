系統簡介

新加坡台灣學生會的會員註冊平台，讓新生能快速完成註冊與信箱驗證，並自動收到電子會員卡。

系統以前端 React.js 建立介面，後端使用 Spring Boot，透過 Redis 暫存驗證資料，
再以 MongoDB 儲存會員資訊與學生證影像。管理員可在後台審核申請，
通過後系統會自動產生會員編號與電子會員卡（HTML/PDF），
並利用 SendGrid 將會員卡寄送至信箱。

<img width="932" height="914" alt="Home" src="https://github.com/user-attachments/assets/9ecee0db-2c4f-4d51-aa2d-c80b0bb578ad" />
<img width="932" height="959" alt="register" src="https://github.com/user-attachments/assets/dfa478a7-8b49-4dc4-b072-56c07132ea25" />
<img width="512" height="283" alt="郵箱驗證" src="https://github.com/user-attachments/assets/bba09ace-4082-45da-98ef-5a5a6aa7974d" />
<img width="573" height="485" alt="success" src="https://github.com/user-attachments/assets/670c6854-70f2-4369-ab10-d83986836cf0" />
<img width="798" height="502" alt="陳睿泰" src="https://github.com/user-attachments/assets/b85abbf5-59aa-4c35-b806-4fb947491ab7" />
