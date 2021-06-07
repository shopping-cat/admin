import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'

const item = () => {
    return (
        <div>
            <Link href='/item/new' ><a><Button>신규상품</Button></a></Link>
            <Link href='/item/update' ><a><Button>업데이트 요청상품</Button></a></Link>
        </div>
    )
}

export default item
