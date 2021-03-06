FROM phusion/baseimage:0.9.19
MAINTAINER Peter Willemsen <peter@codebuffet.co>

# For nano to work
ENV TERM xterm

# Install Node.js and npm
RUN curl -sL https://deb.nodesource.com/setup_4.x | bash -
RUN apt-get update
RUN apt-get install -y build-essential tcl curl wget python2.7 python2.7-dev python-pip nodejs sudo

#We prebuild our meteor app, so no need to install this inside docker...
#RUN curl https://install.meteor.com/ | sh

WORKDIR /var/www/app
ENV MONGO_URL mongodb://db:27017/commonbike
#ENV MONGO_OPLOG_URL mongodb://db:27017/local

EXPOSE 80
ENV PORT 80

ADD ./docker/bin/run-server.sh /etc/service/server/run
ADD ./mrt_build /var/www/app

ENV METEOR_SETTINGS '{"mapbox":{"style":"mapbox.streets","accessToken":"pk.eyJ1IjoiZXJpY3ZycCIsImEiOiJjaWhraHE5ajIwNmRqdGpqN2h2ZXhqMnRsIn0.1FBWllDyQ_nSlHFE2jMLDA"},"private":{"testdata":{"cleanup":false,"insert":false,"log":false}}}'

WORKDIR /var/www/app/bundle/programs/server
RUN npm install

# clean up
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
