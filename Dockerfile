# กำหนด base image จาก Node.js version ล่าสุดของ Alpine Linux
FROM node:18

RUN npm install -g nodemon

# สร้างและตั้งค่า directory ใน container เป็นที่ตั้งของแอป
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json (ถ้ามี)
COPY package*.json ./

# ติดตั้ง dependencies ในโปรเจกต์
RUN npm install

# คัดลอกทุกไฟล์จากโปรเจกต์ลงใน container
COPY . .

ENV NODE_ENV production

# เปิด port ที่แอปของคุณจะรัน
EXPOSE 3000

# กำหนดคำสั่งเพื่อเริ่มแอป
CMD ["npm","run","dev"]
