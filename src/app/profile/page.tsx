'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const Profile = () => {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === 'loading') return

        if (!session?.user) {
            router.push('/auth')
        }
    }, [session, status, router])

    if (!session?.user) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <div>
            <h1>Profile</h1>
        </div>
    )
}

export default Profile
