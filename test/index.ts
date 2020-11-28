import {server} from "./mockHTTP";
import {afterEach, before, after} from "mocha";

before(() => {
    server.listen()
});

afterEach(() => {
    server.resetHandlers()
})

after(() => {
    server.close()
})
