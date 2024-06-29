FROM node:20

WORKDIR /usr/src/bps

COPY package.json /usr/src/bps/package.json
COPY package-lock.json /usr/src/bps/package-lock.json
COPY prisma ./prisma/ 

RUN npm install
COPY . /usr/src/bps

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
