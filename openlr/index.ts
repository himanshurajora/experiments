// @ts-nocheck
const openLR = require("openlr-js");

const input = "CCkBEAAlJAmZhiVZfwAJBQQEA8IACgUEBIc6APqDACIACQUEBANBADAAAA==";
const inputBuffer = Buffer.from(input, "base64");
const ref = LocationReference.fromIdAndBuffer("binary", inputBuffer);
const decoder = new BinaryDecoder();
const rawRef = decoder.decodeData(ref);
const obj = Serializer.serialize(rawRef);

console.log(obj);
