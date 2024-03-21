// import totp from "totp-generator";

// setInterval(() => {
//   const token = totp("JBSWY3DPEHPK3PXP", { digits: 6, period: 30 });
//   console.log(token, new Date()); // prints an 8-digit token
// }, 1000);

import * as ua from "ua-parser-js";

const parser = new ua.UAParser(
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
);

console.log(parser.getResult());

const parser2 = new ua.UAParser(
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.203"
);

const userAgent =
  "Mozilla/5.0 (Windows NT 6.2; WOW64; Trident/7.0; rv:11.0) like Gecko easescreen Crystal 9.2";

const parser3 = new ua.UAParser(userAgent);

console.log(parser3.getResult());
