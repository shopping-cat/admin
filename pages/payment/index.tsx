import { Button, Input, Select, Space, Table } from 'antd'
import dayjs from 'dayjs'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { usePayments } from '../../graphql/payment'
import moneyFormat from '../../lib/moneyFormat'

const payment = () => {

    const [search, setSearch] = useState('')
    const [searchUserName, setSearchUserName] = useState('')

    const { data, loading, refetch } = usePayments()

    const searchedData = data?.payments.filter(t => t.id.toLowerCase().includes(search.toLowerCase())).map(v => ({ ...v, key: v.id })).filter(t => t.user.name.toLowerCase().includes(searchUserName.toLowerCase())).map(v => ({ ...v, key: v.id }))


    if (loading) return loading

    return (
        <div>
            <Space style={{ marginBottom: 16 }} >
                <Input.Search
                    placeholder='주문번호로 검색하기'
                    onChange={t => setSearch(t.target.value)}
                    style={{ width: 200 }}
                />
                <Input.Search
                    placeholder='유저 닉네임으로 검색하기'
                    onChange={t => setSearchUserName(t.target.value)}
                    style={{ width: 200 }}
                />
                <Button onClick={() => refetch()} type='primary' >새로고침</Button>
                <Link href='/shop/new' ><a><Button>신규가입 리스트</Button></a></Link>
            </Space>
            <Table
                columns={[
                    {
                        title: '주문번호',
                        align: 'center',
                        render: (t, r) => <Link href={`/payment/${r.id}`} ><a><Highlighter
                            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                            searchWords={[search]}
                            autoEscape
                            textToHighlight={r.id}
                        /></a></Link>
                    },
                    {
                        title: '유저 닉네임',
                        fixed: 'left',
                        align: 'center',
                        render: (t, r) => <Link href={`/user/${r.user.id}`} ><a><Highlighter
                            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                            searchWords={[searchUserName]}
                            autoEscape
                            textToHighlight={r.user.name}
                        /></a></Link>
                    },
                    {
                        title: '생성일',
                        sorter: (a, b) => dayjs(a.createdAt).toDate().getTime() - dayjs(b.createdAt).toDate().getTime(),
                        render: (_, r) => <div>{dayjs(r.createdAt).format('YYYY-MM-DD hh:mm:ss')}</div>,
                        align: 'center'
                    },
                    {
                        title: '가격',
                        dataIndex: 'price',
                        align: 'center',
                        render: (t) => <div>{moneyFormat(t)}</div>
                    },
                    {
                        title: '배송비',
                        dataIndex: 'deliveryPrice',
                        align: 'center',
                        render: (t) => <div>{moneyFormat(t)}</div>
                    },
                    {
                        title: '추가배송지',
                        dataIndex: 'extraDeliveryPrice',
                        align: 'center',
                        render: (t) => <div>{moneyFormat(t)}</div>
                    },
                    {
                        title: '쿠폰세일',
                        dataIndex: 'couponSale',
                        align: 'center',
                        render: (t) => <div>{moneyFormat(t)}</div>
                    },
                    {
                        title: '포인트세일',
                        dataIndex: 'pointSale',
                        align: 'center',
                        render: (t) => <div>{moneyFormat(t)}</div>
                    },
                    {
                        title: '총 결제금액',
                        dataIndex: 'totalPrice',
                        align: 'center',
                        render: (t) => <div>{moneyFormat(t)}</div>
                    },
                    {
                        title: '결제수단',
                        dataIndex: 'paymentMethod',
                        align: 'center'
                    },
                    {
                        title: '상태',
                        dataIndex: 'state',
                        align: 'center',
                        filters: [
                            {
                                text: '입금대기',
                                value: '입금대기'
                            },
                            {
                                text: '구매접수',
                                value: '구매접수'
                            },
                            {
                                text: '정상처리',
                                value: '정상처리'
                            },
                            {
                                text: '취소처리',
                                value: '취소처리'
                            },
                            {
                                text: '오류처리',
                                value: '오류처리'
                            },
                        ]
                    }
                ]}
                dataSource={searchedData}
            />
        </div>
    )
}

export default payment
