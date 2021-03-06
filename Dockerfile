#-------------------------------------------------------------------------------
# Copyright (C) 2017 Create-Net / FBK.
# All rights reserved. This program and the accompanying materials
# are made available under the terms of the Eclipse Public License 2.0
# which accompanies this distribution, and is available at
# https://www.eclipse.org/legal/epl-2.0/
#
# SPDX-License-Identifier: EPL-2.0
# 
# Contributors:
#     Create-Net / FBK - initial API and implementation
#-------------------------------------------------------------------------------
ARG BASEIMAGE_BUILD=resin/raspberry-pi3-node:7.8.0-20170426

FROM $BASEIMAGE_BUILD

# Defines our working directory in container
WORKDIR /home

# Copies the package.json first for better cache on later pushes
COPY package.json package.json

RUN npm -d install

COPY . .

RUN npm run build

EXPOSE 1337

CMD node ./server.js
