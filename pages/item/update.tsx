import { Button, Table } from 'antd'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import LoadingView from '../../components/View/LoadingView'
import { useApproveUpdateRequestItem, useUpdateRequestItems, useRejectUpdateRequestItem } from '../../graphql/item'
import itemTypeToKorean from '../../lib/itemTypeToKorean'

const update = () => {

    const { data, loading } = useUpdateRequestItems()
    const [deletedList, setDeletedList] = useState<number[]>([])
    const [approveCreateRequestShop, { loading: approveLoading }] = useApproveUpdateRequestItem()
    const [rejectCreateRequestShop, { loading: rejectLoading }] = useRejectUpdateRequestItem()

    const onDelete = useCallback(async (id: number) => {
        if (approveLoading || rejectLoading) return
        if (!confirm('삭제후 복구하실 수 없습니다')) return
        const { data } = await rejectCreateRequestShop({ variables: { id } })
        console.log(data)
        setDeletedList(prev => [...prev, data.rejectUpdateRequestItem.id])
    }, [approveLoading, rejectLoading])

    const onApprove = useCallback(async (id: number) => {
        if (approveLoading || rejectLoading) return
        if (!confirm('정말 승인하시겠습니까?')) return
        await approveCreateRequestShop({ variables: { id } })
    }, [approveLoading, rejectLoading])


    if (loading) return <LoadingView />

    return (
        <div>
            <Table
                columns={[
                    {
                        title: '상점',
                        align: 'center',
                        render: (_, r) => <Link href={`/shop/${r.shop.id}`} ><a>{r.shop.shopName}</a></Link>
                    },
                    {
                        title: '상품명',
                        dataIndex: 'name',
                        align: 'center',
                    },
                    {
                        title: '타입',
                        align: 'center',
                        render: (_, r) => <div>{itemTypeToKorean(r.type)}</div>
                    },
                    {
                        title: '액션',
                        render: (_, r) =>
                            <>
                                {deletedList.includes(r.id)
                                    ? <div>업데이트 삭제됨</div>
                                    : <>
                                        {!r.updateItem && <div>업데이트 게시됨</div>}
                                        {!!r.updateItem && <div>
                                            <Button onClick={() => onApprove(r.id)} >승인</Button>
                                            <Link href={`/item/${r.id}`} ><a><Button>자세히</Button></a></Link>
                                            <Button onClick={() => onDelete(r.id)} >삭제</Button>
                                        </div>}
                                    </>
                                }
                            </>
                        ,
                        align: 'center'
                    }
                ]}
                // scroll={{ x: 1500 }}
                sticky
                dataSource={data?.updateRequestItems || []}
            />
        </div>
    )
}

export default update
