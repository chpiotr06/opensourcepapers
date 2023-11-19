'use client'
import { useFetchUsersToVerify } from '@/api/hooks/useFetchUsersToVerify'

export default function Page() {
  const { data } = useFetchUsersToVerify()
  return (
    <div>
      {data?.data.map((user) => (
        <div className='flex' key={user.id}>
          <div>{user.name}</div>
          <div>{user.surname}</div>
          <div>{user.scientific_profiles.degree}</div>
          <div>{user.scientific_profiles.institution}</div>
          <div>{user.scientific_profiles.scientific_discipline}</div>
        </div>
      ))}
    </div>
  )
}
