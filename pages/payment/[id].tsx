import { useRouter } from 'next/dist/client/router'
import React from 'react'

const paymentDetail = () => {
    const { query } = useRouter()
    return (
        <div>
            {query.id}
        </div>
    )
}

export default paymentDetail
