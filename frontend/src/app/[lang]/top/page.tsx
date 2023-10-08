"use client"

import { UserCard, UserCardProps } from "@components/UserCard"
import useBackButton from "@hooks/useBackButton"
import { useSDK } from "@tma.js/sdk-react"
import axios from "axios"
import { useEffect, useState } from "react"

export default function Top() {
  useBackButton()

  const [users, setUsers] = useState<UserCardProps[]>([])

  const {
    components: { initDataRaw }
  } = useSDK()
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND}/topOfUsers/balance`, {
        headers: {
          Authorization: `Bearer ${initDataRaw}`
        }
      })
      .then((data) => setUsers(data.data))
  }, [])

  return (
    <div className="p-4">
      {users.map((user) => (
        <UserCard key={user.name} {...user} />
      ))}
    </div>
  )
}
