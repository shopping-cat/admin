import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'

const app = () => {
    return (
        <div>
            <Link href='/app/version' ><a><Button>앱 버전관리</Button></a></Link>
        </div>
    )
}

export default app
