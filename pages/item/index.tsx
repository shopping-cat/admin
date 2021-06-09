import { Button, Input, Select, Space, Table } from 'antd'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { UpdateItemInput, useItems, useUpdateItem } from '../../graphql/item'
import itemTypeToKorean from '../../lib/itemTypeToKorean'
import moneyFormat from '../../lib/moneyFormat'

const item = () => {

    const [search, setSearch] = useState('')
    const [searchShop, setSearchShop] = useState('')

    const { data, loading, refetch } = useItems()
    const [updateItem, { loading: updateLoading }] = useUpdateItem()

    const searchedData = data?.items.filter(t => t.name.toLowerCase().includes(search.toLowerCase())).map(v => ({ ...v, key: v.id })).filter(t => t.shop.shopName.toLowerCase().includes(searchShop.toLowerCase())).map(v => ({ ...v, key: v.id }))

    const onUpdate = useCallback(async (id: number, input: UpdateItemInput) => {
        if (updateLoading) return
        await updateItem({ variables: { input, id } })
    }, [updateLoading])

    if (loading) return loading

    return (
        <div>

            <Space style={{ marginBottom: 16 }} >
                <Input.Search
                    placeholder='상품명으로 검색하기'
                    onChange={t => setSearch(t.target.value)}
                    style={{ width: 200 }}
                />
                <Input.Search
                    placeholder='상점명으로 검색하기'
                    onChange={t => setSearchShop(t.target.value)}
                    style={{ width: 200 }}
                />
                <Button onClick={() => refetch()} type='primary' >새로고침</Button>
                <Link href='/item/new' ><a><Button>신규상품</Button></a></Link>
                <Link href='/item/update' ><a><Button>업데이트 요청상품</Button></a></Link>
            </Space>
            <Table
                columns={[
                    {
                        title: '상품명',
                        dataIndex: 'name',
                        fixed: 'left',
                        align: 'center',
                        render: (t, record) => <Link href={`/item/${record.id}`} ><a><Highlighter
                            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                            searchWords={[search]}
                            autoEscape
                            textToHighlight={t ? t.toString() + (record.updateItem ? `(수정요청)` : '') : ''}
                        />
                        </a></Link>
                    },
                    {
                        title: '상점명',
                        fixed: 'left',
                        align: 'center',
                        render: (t, record) => <Link href={`/shop/${record.shop.id}`} ><a><Highlighter
                            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                            searchWords={[searchShop]}
                            autoEscape
                            textToHighlight={record.shop.shopName}
                        />
                        </a></Link>
                    },
                    {
                        title: '가격',
                        dataIndex: 'price',
                        render: t => <div>{moneyFormat(t)}</div>,
                        sorter: (a, b) => a.price - b.price,
                        align: 'center'
                    },
                    {
                        title: '배송비',
                        dataIndex: 'deliveryPrice',
                        filters: [
                            {
                                text: '무료배송만',
                                value: true
                            }
                        ],
                        render: t => <div>{t === 0 ? '무료배송' : moneyFormat(t)}</div>,
                        onFilter: (value, record) => record.deliveryPrice === 0,
                        align: 'center'
                    },
                    {
                        title: '타입',
                        dataIndex: 'type',
                        render: (v) => <div>{itemTypeToKorean(v)}</div>,
                        align: 'center',
                        filters: [
                            {
                                text: '고양이',
                                value: 'cat'
                            },
                            {
                                text: '강아지',
                                value: 'dog'
                            },
                            {
                                text: '고양이,강아지',
                                value: 'both'
                            },
                        ],
                        onFilter: (value, record) => record.state === value,
                    },
                    {
                        title: '카테고리',
                        align: 'center',
                        render: (_, r) => <div>{r.category1} / {r.category2}</div>
                    },
                    {
                        title: '총 구매확정',
                        dataIndex: 'totalOrderNum',
                        align: 'center',
                        sorter: (a, b) => a.totalOrderNum - b.totalOrderNum,
                    },
                    {
                        title: '좋아요',
                        dataIndex: 'likeNum',
                        align: 'center',
                        sorter: (a, b) => a.likeNum - b.likeNum,
                    },
                    {
                        title: '평점',
                        dataIndex: 'rate',
                        align: 'center',
                        sorter: (a, b) => a.rate - b.rate
                    },
                    {
                        title: '리뷰',
                        dataIndex: 'reviewNum',
                        align: 'center',
                        sorter: (a, b) => a.reviewNum - b.reviewNum
                    },
                    {
                        title: '상태',
                        dataIndex: 'state',
                        filters: [
                            {
                                text: '판매중',
                                value: '판매중'
                            },
                            {
                                text: '판매중지',
                                value: '판매중지'
                            },
                            {
                                text: '판매정지',
                                value: '판매정지'
                            },
                            {
                                text: '재고없음',
                                value: '재고없음'
                            },
                            {
                                text: '상품등록요청',
                                value: '상품등록요청'
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
                                        <Select.Option value='판매중'>판매중</Select.Option>
                                        <Select.Option value='판매중지'>판매중지</Select.Option>
                                        <Select.Option value='재고없음'>재고없음</Select.Option>
                                        <Select.Option value='판매정지'>판매정지</Select.Option>
                                    </Select>
                                }
                            </>
                        ,
                        onFilter: (value, record) => record.state === value,
                        align: 'center'
                    },
                ]}
                dataSource={searchedData}
            />
        </div>
    )
}

export default item
