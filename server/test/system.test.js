const chai = require("chai");
const expect = chai.expect;
const app = require("../server").app;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
let newMessageId;

let server;
before(done => {
  server = app.listen(3002, done);
});

describe("API: check getMessages endpoint", () => {
  it("returns status code 200", () => {
    return chai
      .request(app)
      .get("/messages")
      .then(res => {
        expect(res).to.have.status(200);
      });
  });
});

describe("API: check newMessage endpoint", () => {
  it("returns status code 201", () => {
    return chai
      .request(app)
      .post("/messages")
      .send({ message: "saas" })
      .then(res => {
        expect(res).to.have.status(201);
        newMessageId = res.body._id;
      });
  });
});

describe("API: check getDetails endpoint", () => {
  it("returns status code 201 and isPalindrome 'true'", () => {
    return chai
      .request(app)
      .get(`/messages/${newMessageId}`)
      .then(res => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.true;
      });
  });
});

describe("API: check deleteMessage endpoint", () => {
  it("returns status code 201", () => {
    return chai
      .request(app)
      .delete(`/messages/${newMessageId}`)
      .then(res => {
        expect(res).to.have.status(200);
      });
  });
});

//TODO: Check endpoints for fail

after(done => {
  server.close(done);
});
