# Web application Baanrimnam resort คืออะไร?
เป็น Webapp สำหรับการ Booking บ้านพักของรีสอร์ท โดยมีฟังก์ชั่นการทำงานทั่วไปเช่น sign in & sign up , booking , payment โดยจะมีทั้งหมด 2 สิทธิ์ใหญ่คือ Admin และ Customer 

## อธิบาย Backend ของ Web application บ้านริมน้ำรีสอร์ท

เป็นส่วนที่ไว้สำหรับประมวลผลและเชื่อมต่อกับฐานข้อมูล โดยจะมีส่วนที่เชื่อมต่อ API ของ Frontend เพื่อรับหรือส่งข้อมูลมาประมวลผล

## โครงสร้างระบบ
1. server.js เป็นส่วนที่ใช่สำหรับการตั้งค่าต่าง ๆ ของ Server โดยผมใช้ Express.js ซึ่ง framework ทีีนิยมใช้พัฒนา web application ใน Node.js
2. ส่วนของ router เป็นส่วนที่ใช้สำหรับจัดการ API ต่าง ๆ ทั้งส่วนที่ request และ response
3. ส่วนของ Endpoint เป็นส่วนของการดึงข้อมูลออกจาก API ที่รับมาเพื่อนำมาใช้งาน
4. ส่วนของ Logic เป็นส่วนที่ใช้สำหรับการประมวลผมต่าง ๆ
5. ส่วนของ Plugin เป็นส่วนที่ใช้สำหรับเชื่อมต่อฐานข้อมูลและจัดการฐานข้อมูลเช่น query , insert , update 

## การป้องกันระบบ
1. ป้องกัน XSS โดยใช้ libary helmet
2. ป้องกัน SQL injection โดยใช้การเขียนแบบ Prepared Statements
3. ป้องกัน DDos โดยกำหนด rate limit และ libary CORs

## เพิ่มเติม
1. มีการใช้ JWT ในการตรวจสอบก่อนนำข้อมูลมาใช้งาน และ verify user
2. มีการใช้ libary passport เพื่อใช้สำหรับการทำ Google OAuth
