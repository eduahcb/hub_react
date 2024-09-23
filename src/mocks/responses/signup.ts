import { HttpResponse } from "msw"

export const Signup = {
  success: () => {
    return new HttpResponse(null, {
      status: 204,
      headers: {
        authorization: 'dawkldjawkljdwklajdkljawkldjawkl',
      },
    })
  },

  emailAlready: () => {
    const body = JSON.stringify({
      error: 'Bad Request',
      message: 'email already exists',
    })

    return new HttpResponse(body, {
      status: 400,
    })
  },

  internalError: () => {
    const body = JSON.stringify({
      error: 'Internal Server',
      message: 'oops!! something went wrong'
    })

    return new HttpResponse(body, {
      status: 500,
    })
  }
}

