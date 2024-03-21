import { useEffect } from "react"
import { useQuery } from "react-query"
import { User } from "./types/common.type"
import { getUsers } from "./utils/axios.instance"

export const Test = () => {
    const { data } = useQuery<User[]>('getUsers', getUsers)




    return (
        <>
            {
                JSON.stringify(data)
            }
        </>
    )
}