class ReqresApi {

  // GET LIST USERS
  getListUsers(page) {
    return cy.request({
      method: "GET",
      url: `https://reqres.in/api/users?page=${page}`,
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
      },
      failOnStatusCode: false
    })
  }

  // GET SINGLE USER
  getSingleUser(id) {
    return cy.request({
      method: "GET",
      url: `https://reqres.in/api/users/${id}`,
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
      },
      failOnStatusCode: false
    })
  }

  // CREATE USER
  createUser(bodyData) {
    return cy.request({
      method: "POST",
      url: "https://reqres.in/api/users",
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
      },
      body: bodyData,
      failOnStatusCode: false
    })
  }

  // UPDATE USER (PUT)
  updateUser(id, bodyData) {
    return cy.request({
      method: "PUT",
      url: `https://reqres.in/api/users/${id}`,
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
      },
      body: bodyData,
      failOnStatusCode: false
    })
  }

  // PATCH USER
  patchUser(id, bodyData) {
    return cy.request({
      method: "PATCH",
      url: `https://reqres.in/api/users/${id}`,
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
      },
      body: bodyData,
      failOnStatusCode: false
    })
  }

  // DELETE USER
  deleteUser(id) {
    return cy.request({
      method: "DELETE",
      url: `https://reqres.in/api/users/${id}`,
      headers: {
        "User-Agent": "Mozilla/5.0"
      },
      failOnStatusCode: false
    })
  }

  // REGISTER SUCCESS
  registerSuccess(bodyData) {
    return cy.request({
      method: "POST",
      url: "https://reqres.in/api/register",
      headers: {
        "User-Agent": "Mozilla/5.0"
      },
      body: bodyData,
      failOnStatusCode: false
    })
  }

  // REGISTER FAILED
  registerFailed(bodyData) {
    return cy.request({
      method: "POST",
      url: "https://reqres.in/api/register",
      headers: {
        "User-Agent": "Mozilla/5.0"
      },
      body: bodyData,
      failOnStatusCode: false
    })
  }

  // LOGIN SUCCESS
  loginSuccess(bodyData) {
    return cy.request({
      method: "POST",
      url: "https://reqres.in/api/login",
      headers: {
        "User-Agent": "Mozilla/5.0"
      },
      body: bodyData,
      failOnStatusCode: false
    })
  }

  // LOGIN FAILED
  loginFailed(bodyData) {
    return cy.request({
      method: "POST",
      url: "https://reqres.in/api/login",
      headers: {
        "User-Agent": "Mozilla/5.0"
      },
      body: bodyData,
      failOnStatusCode: false
    })
  }

  // DELAYED RESPONSE
  delayedResponse(seconds) {
    return cy.request({
      method: "GET",
      url: `https://reqres.in/api/users?delay=${seconds}`,
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
      },
      failOnStatusCode: false
    })
  }

}

export default new ReqresApi()
