#!/bin/bash

for feature in \
2d-deterministic
do

echo 'export * from "'"./rapier_wasm2d"'"' > builds/${feature}/pkg/raw.d.ts
echo 'export * from "'"./rapier_wasm2d"'"' > builds/${feature}/pkg/raw.d.ts

done;