FROM node
WORKDIR /app

COPY package.json .
RUN  npm install country-cities --force
RUN  npm install --legacy-peer-deps
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
