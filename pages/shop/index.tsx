import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'

const shop = () => {
    return (
        <div>
            <Link href='/shop/new' ><a><Button>신규가입</Button></a></Link>
        </div>
    )
}

export default shop
