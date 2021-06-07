import { Button, Descriptions, Image } from 'antd'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import LoadingView from '../../components/View/LoadingView'
import { useShop } from '../../graphql/shop'


const Container = styled.div`
    background-color:#fff;
    padding:24px;
`

const shopDetail = () => {
    const { query } = useRouter()
    const { data, loading } = useShop({ variables: { id: Number(query.id) } })

    if (loading) return <LoadingView />

    return (
        <Container>
            <Descriptions title='상점정보' bordered >
                <Descriptions.Item span={1.5} label='상점이름' >{data.shop.shopName}</Descriptions.Item>
                <Descriptions.Item span={1.5} label='이메일' >{data.shop.seller.email}</Descriptions.Item>

                <Descriptions.Item span={3} label='자사몰 링크' ><a href={data.shop.storeLink} target='_blank' >{data.shop.storeLink}</a></Descriptions.Item>

                <Descriptions.Item span={1.5} label='사업자등록번호' >{data.shop.seller.licenseNumber}({data.shop.seller.bizType})</Descriptions.Item>
                <Descriptions.Item span={1.5} label='카카오톡 아이디 (주문 들어오면 채팅 보내드립니다)' >{data.shop.kakaoId}</Descriptions.Item>


                <Descriptions.Item span={1.5} label='평점' >{data.shop.rate}({data.shop.rateNum})</Descriptions.Item>
                <Descriptions.Item span={1.5} label='총 상품 수' >{data.shop.itemNum}개</Descriptions.Item>

                <Descriptions.Item span={1.5} label='상점이미지' ><Image src={data.shop.shopImage} style={{ height: 300, width: 300, objectFit: 'cover' }} /></Descriptions.Item>
                <Descriptions.Item span={1.5} label='사업자등록증' ><Image src={data.shop.seller.bizRegistration} style={{ height: 300, width: 300, objectFit: 'cover' }} /></Descriptions.Item>
            </Descriptions>

            <Descriptions style={{ marginTop: 16 }} title='담당자' bordered >
                <Descriptions.Item span={1} label='이름' >{data.shop.managerName}</Descriptions.Item>
                <Descriptions.Item span={1} label='전화번호' >{data.shop.managerPhone}</Descriptions.Item>
                <Descriptions.Item span={1} label='이메일' >{data.shop.managerEmail}</Descriptions.Item>
            </Descriptions>


            <Descriptions style={{ marginTop: 16 }} title='정산 계좌' bordered >
                <Descriptions.Item span={1} label='예금주' >{data.shop.bankOwnerName}</Descriptions.Item>
                <Descriptions.Item span={1} label='은행' >{data.shop.bankName}</Descriptions.Item>
                <Descriptions.Item span={1} label='계좌번호' >{data.shop.bankAccountNumber}</Descriptions.Item>
            </Descriptions>


            <Descriptions style={{ marginTop: 16 }} title='CS/환불/교환' bordered >
                <Descriptions.Item span={1.5} label='카카오 채널 링크' ><a href={data.shop.kakaoLink} >{data.shop.kakaoLink}</a></Descriptions.Item>
                <Descriptions.Item span={1.5} label='고객샌터 전화번호' >{data.shop.csPhone}</Descriptions.Item>
                <Descriptions.Item span={3} label='환불방법' ><pre>{data.shop.refundInfo}</pre></Descriptions.Item>
                <Descriptions.Item span={3} label='교환방법' ><pre>{data.shop.exchangeInfo}</pre></Descriptions.Item>
            </Descriptions>


        </Container>
    )
}

export default shopDetail
