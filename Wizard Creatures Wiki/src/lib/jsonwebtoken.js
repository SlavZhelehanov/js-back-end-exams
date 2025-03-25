import jsonwebtoken from "jsonwebtoken";
import util from "util";

export default {
    sign: util.promisify(jsonwebtoken.sign),
    verify: util.promisify(jsonwebtoken.verify)
}