import * as semver from 'semver';

const res = semver.gt("1.3.0", "1.21.0");

const old = "1.3.1-4";

const n = semver.inc(old, '', {})

console.log(n)





