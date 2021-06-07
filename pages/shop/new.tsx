import { Button, Table } from 'antd'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import { useApproveCreateRequestShop, useCreateRequestShops, useRejectCreateRequestShop } from '../../graphql/shop'

const newShops = () => {

    const { data } = useCreateRequestShops()
    const [deletedList, setDeletedList] = useState<number[]>([])
    const [approveCreateRequestShop, { loading: approveLoading }] = useApproveCreateRequestShop()
    const [rejectCreateRequestShop, { loading: rejectLoading }] = useRejectCreateRequestShop()

    const onDelete = useCallback(async (id: number) => {
        if (approveLoading || rejectLoading) return
        if (!confirm('삭제후 복구하실 수 없습니다')) return
        const { data } = await rejectCreateRequestShop({ variables: { id } })
        console.log(data)
        setDeletedList(prev => [...prev, data.rejectCreateRequestShop.id])
    }, [approveLoading, rejectLoading])

    const onApprove = useCallback(async (id: number) => {
        if (approveLoading || rejectLoading) return
        if (!confirm('정말 승인하시겠습니까?')) return
        await approveCreateRequestShop({ variables: { id } })
    }, [approveLoading, rejectLoading])


    return (
        <div>
            <Table
                columns={[
                    {
                        title: '이름',
                        dataIndex: 'shopName',
                        align: 'center',
                    },
                    {
                        title: '이메일',
                        render: (_, r) => <div>{r.seller.email}</div>,
                        align: 'center',
                    },
                    {
                        title: '사업자번호',
                        render: (_, r) => <div>{r.seller.licenseNumber}({r.seller.bizType})</div>,
                        align: 'center'
                    },
                    {
                        title: '스토어링크',
                        render: (_, r) => <a href={r.storeLink} target='_blank' >{r.storeLink}</a>,
                        align: 'center'
                    },
                    {
                        title: '액션',
                        render: (_, r) =>
                            <>
                                {deletedList.includes(r.id)
                                    ? <div>삭제됨</div>
                                    : <>
                                        {r.state === '정상' && <div>가입완료</div>}
                                        {r.state === '가입요청' && <div>
                                            <Button onClick={() => onApprove(r.id)} >승인</Button>
                                            <Link href={`/shop/${r.id}`} ><a><Button>자세히</Button></a></Link>
                                            <Button onClick={() => onDelete(r.id)} >삭제</Button>
                                        </div>}
                                    </>}
                            </>
                        ,
                        align: 'center'
                    }
                ]}
                // scroll={{ x: 1500 }}
                sticky
                dataSource={data?.createRequestShops || []}
            />
        </div>
    )
}

export default newShops
