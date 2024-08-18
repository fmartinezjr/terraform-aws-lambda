FROM public.ecr.aws/lambda/nodejs:20

WORKDIR /var/task

COPY . .

RUN corepack enable

RUN yarn config set nodeLinker node-modules

RUN yarn install --frozen-lockfile

EXPOSE 3200

CMD ["dist/index.handler"]
