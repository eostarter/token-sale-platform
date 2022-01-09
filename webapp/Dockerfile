FROM node:12-slim as build-stage

ARG react_app_tag
ARG react_app_name
ARG react_app_title
ARG react_app_logo
ARG react_app_footer_links
ARG react_app_ual_app_name
ARG react_app_ual_api_protocol
ARG react_app_ual_api_host
ARG react_app_ual_api_port
ARG react_app_ual_chain_id
ARG react_app_hasura_url

ENV REACT_APP_TAG $react_app_tag
ENV REACT_APP_NAME $react_app_name
ENV REACT_APP_TITLE $react_app_title
ENV REACT_APP_LOGO $react_app_logo
ENV REACT_APP_FOOTER_LINKS $react_app_footer_links
ENV REACT_APP_UAL_APP_NAME $react_app_ual_app_name
ENV REACT_APP_UAL_API_PROTOCOL $react_app_ual_api_protocol
ENV REACT_APP_UAL_API_HOST $react_app_ual_api_host
ENV REACT_APP_UAL_API_PORT $react_app_ual_api_port
ENV REACT_APP_UAL_CHAIN_ID $react_app_ual_chain_id
ENV REACT_APP_HASURA_URL $react_app_hasura_url

WORKDIR /usr/src/app

COPY package.json .

COPY yarn*.lock .

RUN yarn --frozen-lockfile

COPY . .

ENV GENERATE_SOURCEMAP false

RUN yarn build

FROM nginx:1.16.1-alpine as run-stage

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
COPY --from=build-stage /usr/src/app/compression.conf /etc/nginx/conf.d/compression.conf
COPY --from=build-stage /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]