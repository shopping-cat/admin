import { Button, Input, Select, Space, Table } from 'antd'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { UpdateShopInput, useShops, useUpdateShop } from '../../graphql/shop'
import moneyFormat from '../../lib/moneyFormat'

const shop = () => {

    const [search, setSearch] = useState('')

    const { data, loading, refetch } = useShops()
    const [updateShop, { loading: updateLoading }] = useUpdateShop()

    const searchedData = data?.shops.filter(t => t.shopName.toLowerCase().includes(search.toLowerCase())).map(v => ({ ...v, key: v.id }))

    const onUpdate = useCallback(async (id: number, input: UpdateShopInput) => {
        if (updateLoading) return
        await updateShop({ variables: { input, id } })
    }, [updateLoading])

    if (loading) return loading

    return (
        <div>
            <Space style={{ marginBottom: 16 }} >
                <Input.Search
                    placeholder='상점명으로 검색하기'
                    onChange={t => setSearch(t.target.value)}
                    style={{ width: 300 }}
                />
                <Button onClick={() => refetch()} type='primary' >새로고침</Button>
                <Link href='/shop/new' ><a><Button>신규가입 리스트</Button></a></Link>
            </Space>
            <Table
                columns={[
                    {
                        title: '상점명',
                        dataIndex: 'shopName',
                        fixed: 'left',
                        align: 'center',
                        render: (t, record) => <Highlighter
                            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                            searchWords={[search]}
                            autoEscape
                            textToHighlight={t ? t.toString() : ''}
                        />
                    },

                    {
                        title: '평점수',
                        dataIndex: 'rateNum',
                        sorter: (a, b) => a.rateNum - b.rateNum,
                        align: 'center'
                    },
                    {
                        title: '평점',
                        dataIndex: 'rate',
                        sorter: (a, b) => a.rate - b.rate,
                        align: 'center'
                    },
                    {
                        title: '상품수',
                        dataIndex: 'itemNum',
                        sorter: (a, b) => a.itemNum - b.itemNum,
                        align: 'center'
                    },
                    {
                        title: '상태',
                        dataIndex: 'state',
                        filters: [
                            {
                                text: '가입요청',
                                value: '가입요청'
                            },
                            {
                                text: '정상',
                                value: '정상'
                            },
                            {
                                text: '정지',
                                value: '정지'
                            },
                            {
                                text: '탈퇴',
                                value: '탈퇴'
                            },
                        ],
                        render: (t, record) =>
                            <>
                                {t === '상품등록요청'
                                    ?
                                    <div>{t}</div>
                                    :
                                    <Select
                                        onChange={(v) => onUpdate(record.id, { state: v })}
                                        loading={updateLoading}
                                        value={t}
                                    >
                                        <Select.Option value='정상'>정상</Select.Option>
                                        <Select.Option value='정지'>정지</Select.Option>
                                    </Select>
                                }
                            </>
                        ,
                        onFilter: (value, record) => record.state === value,
                        align: 'center'
                    }
                ]}
                dataSource={searchedData}
            />
        </div>
    )
}

export default shop
