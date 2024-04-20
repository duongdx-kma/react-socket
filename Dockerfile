# stage1 - build react app first
FROM public.ecr.aws/docker/library/node:16-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json yarn.lock /app/

RUN yarn install

COPY . .

RUN yarn build

# stage 2 - build the final image and copy the react build files
FROM public.ecr.aws/nginx/nginx:1.25-alpine

ENV USER=executor
ENV GROUP=executor

RUN addgroup -g 1098 $GROUP \
    && adduser -D -u 1098 $USER -G $GROUP \
    && chown -R $USER:$GROUP /var/cache/nginx \
    && chown -R $USER:$GROUP /var/log/nginx \
    && chown -R $USER:$GROUP /etc/nginx/conf.d

RUN chmod -R 777 /etc/nginx/conf.d

USER $USER

# copy artifacts from build stage
COPY --from=build /app/build /usr/share/nginx/html

# config nginx configuration
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# config env flexible way
COPY nginx/env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
