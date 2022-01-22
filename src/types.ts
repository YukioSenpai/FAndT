export interface Login {
    data: {
        email: string
        password: string
    }
}

export interface UserUpdate {
    user: {
    email: string
    firstName?: string
    lastName?: string
    }
  }