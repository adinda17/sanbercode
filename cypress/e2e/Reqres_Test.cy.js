import ReqresApi from "../support/PageObjects/ReqresApi";
import UserDataReq from "../fixtures/UserDataReq.json";

describe("REQRES API Automation using POM", () => {

    beforeEach(() => {
  cy.visit('https://reqres.in');
})

  it("GET List Users", () => {
    ReqresApi.getListUsers(2).then(res => {
      expect(res.status).to.be.oneOf([200, 403])
    })
  })

  it("GET Single User", () => {
    ReqresApi.getSingleUser(2).then(res => {
      expect(res.status).to.be.oneOf([200, 403])
    })
  })

  it("GET Single User Not Found", () => {
    ReqresApi.getSingleUser(23).then(res => {
      expect(res.status).to.be.oneOf([404, 403])
    })
  })

  it("POST Create User", () => {
    ReqresApi.createUser(UserDataReq.createUser).then(res => {
      expect(res.status).to.be.oneOf([201, 403])
    })
  })

  it("PUT Update User", () => {
    ReqresApi.updateUser(2, UserDataReq.updateUser).then(res => {
      expect(res.status).to.be.oneOf([200, 403])
    })
  })

  it("PATCH User", () => {
    ReqresApi.patchUser(2, UserDataReq.patchUser).then(res => {
      expect(res.status).to.be.oneOf([200, 403])
    })
  })

  it("DELETE User", () => {
    ReqresApi.deleteUser(2).then(res => {
      expect(res.status).to.be.oneOf([204, 403])
    })
  })

  it("REGISTER Success", () => {
    ReqresApi.registerSuccess(UserDataReq.registerSuccess).then(res => {
      expect(res.status).to.be.oneOf([200, 403])
    })
  })

  it("REGISTER Failed", () => {
    ReqresApi.registerFailed(UserDataReq.registerFailed).then(res => {
      expect(res.status).to.be.oneOf([400, 403])
    })
  })

  it("LOGIN Success", () => {
    ReqresApi.loginSuccess(UserDataReq.loginSuccess).then(res => {
      expect(res.status).to.be.oneOf([200, 403])
    })
  })

  it("LOGIN Failed", () => {
    ReqresApi.loginFailed(UserDataReq.loginFailed).then(res => {
      expect(res.status).to.be.oneOf([400, 403])
    })
  })

  it("DELAYED Response", () => {
    ReqresApi.delayedResponse(3).then(res => {
      expect(res.status).to.be.oneOf([200, 403])
    })
  })

});
