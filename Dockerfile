FROM ubuntu:latest
MAINTAINER Ryan.michael.tate@gmail.com

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update --fix-missing
RUN apt-get install -q -y build-essential gcc make software-properties-common git curl g++ python-dev python-pip libkrb5-dev

# Install Node

RUN curl http://nodejs.org/dist/latest-v5.x/node-v5.6.0-linux-x64.tar.gz | tar xz
RUN mv node* node && \
    ln -s /node/bin/node /usr/local/bin/node && \
    ln -s /node/bin/npm /usr/local/bin/npm


# Install Ethereum

RUN add-apt-repository ppa:ethereum/ethereum
RUN add-apt-repository ppa:ethereum/ethereum-dev
RUN apt-get update
RUN apt-get install -q -y geth

# Add Application Files

WORKDIR /app

ADD . /app

RUN rm -rf /root/.ethereum
RUN rm -rf /node_modules/
RUN npm cache clean
RUN npm install

ENV NODE_ENV development

EXPOSE 8000

CMD ["npm", "start"]
