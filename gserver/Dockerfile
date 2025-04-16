# 노드기반
FROM node:20

# 경로
WORKDIR /app

# 내가 가진 파일을 app에 모두 복사 앞의 . 로컬, 뒤의 . 도커
COPY . .

# 패키지 설치
RUN npm install

# 포트 설정
ENV PORT 8080

# 포트 개방
EXPOSE 8080 

# 명령 실행
CMD ["node", "server.js"]