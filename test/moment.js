import moment from "moment";

const time = "2024-01-17T16:20:16+05:30";

console.log(moment(time).utc(true).format());
