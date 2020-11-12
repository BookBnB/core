import {server} from "./mockHTTP";
import {beforeEach} from "mocha";

beforeEach(async function () {
    server.listen();
});
