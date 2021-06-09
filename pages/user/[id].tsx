import { Descriptions, Image } from 'antd'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import styled from 'styled-components'
import LoadingView from '../../components/View/LoadingView'
import { useUser } from '../../graphql/user'
import itemTypeToKorean from '../../lib/itemTypeToKorean'
import phoneFormat from '../../lib/phoneFormat'

const Container = styled.div`
    background-color:#fff;
    padding: 16px;
`

const userDetail = () => {

    const { query } = useRouter()
    const { data, loading } = useUser({ variables: { id: query.id.toString() } })

    if (loading) return <LoadingView />

    return (
        <Container>
            <Descriptions title='유저정보' bordered  >
                <Descriptions.Item span={3} label='사진' ><Image src={data.user.photo} height={100} width={100} /></Descriptions.Item>
                <Descriptions.Item label='이름' >{data.user.name}</Descriptions.Item>
                <Descriptions.Item label='타입' >{itemTypeToKorean(data.user.type)}</Descriptions.Item>
                <Descriptions.Item label='이메일' >{data.user.userDetail?.email || '없음'}</Descriptions.Item>

                <Descriptions.Item label='포인트' >{data.user.point}포인트</Descriptions.Item>
                <Descriptions.Item label='쿠폰' >{data.user.couponNum}개</Descriptions.Item>
                <Descriptions.Item label='총 결제 수' >{data.user.paymentNum}</Descriptions.Item>

                <Descriptions.Item label='환불계좌은행' >{data.user.refundBankAccount?.bankName}</Descriptions.Item>
                <Descriptions.Item label='환불계좌예금주' >{data.user.refundBankAccount?.ownerName}</Descriptions.Item>
                <Descriptions.Item label='환불계좌번호' >{data.user.refundBankAccount?.accountNumber}</Descriptions.Item>

                <Descriptions.Item span={2} label='배송지 주소' >{data.user.deliveryInfo?.address} {data.user.deliveryInfo?.addressDetail} ({data.user.deliveryInfo?.postCode})</Descriptions.Item>
                <Descriptions.Item label='수령인 정보' >{data.user.deliveryInfo?.name} {phoneFormat(data.user.deliveryInfo?.phone)}</Descriptions.Item>

                <Descriptions.Item label='본인인증 전화번호' >{data.user.certificatedInfo?.phone}</Descriptions.Item>
            </Descriptions>
        </Container>
    )
}

export default userDetail
