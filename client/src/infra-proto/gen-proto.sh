#!/bin/bash
PROTO_DIR=./gen-proto
INPUT_FILES="proto proto/*.proto"

rm -rf ./gen-proto
mkdir ./gen-proto

export PATH=$PATH:./bin

# # Generate GRPC TypeScript code (d.ts)
npx grpc_tools_node_protoc \
    -I ${INPUT_FILES} \
    --js_out=import_style=commonjs,binary:${PROTO_DIR} \
    --grpc-web_out=import_style=typescript,mode=grpcweb:${PROTO_DIR}