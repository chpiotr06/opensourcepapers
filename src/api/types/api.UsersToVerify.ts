export type UserToVerify = {
  id: string
  name: string
  surname: string
  scientific_profile_id: string
  scientific_profiles: {
    degree: string
    institution: string
    scientific_discipline: string
  }
}

export type UsersToVerifyResponse = {
  data: UserToVerify[]
}
