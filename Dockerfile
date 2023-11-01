FROM node:20 as build
WORKDIR /src/
COPY ./package.json ./yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive --production
COPY ./ ./
RUN yarn build

FROM nginx:1.25 as final
EXPOSE 80
COPY --from=build /src/public/ /usr/share/nginx/html/
