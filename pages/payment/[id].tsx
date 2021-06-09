import { Descriptions } from 'antd'
import dayjs from 'dayjs'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React from 'react'
import LoadingView from '../../components/View/LoadingView'
import { usePayment } from '../../graphql/payment'
import moneyFormat from '../../lib/moneyFormat'
import phoneFormat from '../../lib/phoneFormat'

const paymentDetail = () => {
    const { query } = useRouter()
    const { data, loading } = usePayment({ variables: { id: query.id.toString() } })

    if (loading) return <LoadingView />

    return (
        <div style={{ padding: 16, backgroundColor: '#fff' }} >
            <Descriptions title='결제정보' bordered  >

                <Descriptions.Item span={3} label='주문자 닉네임' > <Link href={`/user/${data.payment.user.id}`} ><a>{data.payment.user.name}</a></Link></Descriptions.Item>


                <Descriptions.Item label='결제 이름' >{data.payment.name}</Descriptions.Item>
                <Descriptions.Item label='생성일' >{dayjs(data.payment.createdAt).format('YYYY-MM-DD hh:ss:mm')}</Descriptions.Item>
                <Descriptions.Item label='상태' >{data.payment.state}</Descriptions.Item>

                <Descriptions.Item label='상품가격' >{moneyFormat(data.payment.price)}</Descriptions.Item>
                <Descriptions.Item label='배송비' >{moneyFormat(data.payment.deliveryPrice)}</Descriptions.Item>
                <Descriptions.Item label='추가배송비' >{moneyFormat(data.payment.extraDeliveryPrice)}</Descriptions.Item>

                <Descriptions.Item label='상품 세일' >{moneyFormat(data.payment.itemSale)}</Descriptions.Item>
                <Descriptions.Item label='쿠폰세일' >{moneyFormat(data.payment.couponSale)}</Descriptions.Item>
                <Descriptions.Item label='포인트세일' >{moneyFormat(data.payment.pointSale)}</Descriptions.Item>

                <Descriptions.Item span={2} label='총 결제가격' >{moneyFormat(data.payment.totalPrice)}</Descriptions.Item>
                <Descriptions.Item label='결제수단' >{data.payment.paymentMethod}</Descriptions.Item>

                <Descriptions.Item label='배송지' >{data.payment.address} ({data.payment.postCode})</Descriptions.Item>
                <Descriptions.Item label='수령인 정보' >{data.payment.addressName} {phoneFormat(data.payment.addressPhone)}</Descriptions.Item>
                <Descriptions.Item label='배송메모' >{data.payment.deliveryMemo}</Descriptions.Item>

                <Descriptions.Item label='가상계좌제한 시간' >{data.payment.vBankDate ? dayjs(data.payment.vBankDate).format('YYYY-MM-DD hh:mm:ss') : ''}</Descriptions.Item>
                <Descriptions.Item label='가상계좌번호' >{data.payment.vBankNum}</Descriptions.Item>
                <Descriptions.Item label='가상계좌예금주' >{data.payment.vBankName}</Descriptions.Item>

                <Descriptions.Item label='환불사유' >{data.payment.cancelReason}</Descriptions.Item>
                <Descriptions.Item label='환불된 포인트' >{data.payment.cancelPoint}</Descriptions.Item>
                <Descriptions.Item label='환불된 금액' >{data.payment.cancelPrice}</Descriptions.Item>

            </Descriptions>

            <h3>주문 리스트</h3>
            {data.payment.orders.map(order => (
                <Descriptions title={<Link href={`/order/${order.id}`} ><a>{order.id}</a></Link>} key={order.id} bordered style={{ marginTop: 16 }}  >

                    <Descriptions.Item label='상품명' ><Link href={`/item/${order.item.id}`} ><a>{order.item.name}</a></Link></Descriptions.Item>
                    <Descriptions.Item label='평점' > <Link href={`/itemReview/${order.itemReview?.id}`} ><a>{order.itemReview?.rate}</a></Link></Descriptions.Item>
                    <Descriptions.Item label='상태' >{order.state}</Descriptions.Item>

                    <Descriptions.Item label='가격' >{moneyFormat(order.itemPrice)}</Descriptions.Item>
                    <Descriptions.Item label='옵션가격' >{moneyFormat(order.itemOptionPrice)}</Descriptions.Item>
                    <Descriptions.Item label='수량' >{moneyFormat(order.num)}</Descriptions.Item>

                    <Descriptions.Item label='상품세일' >{moneyFormat(order.itemSale)}</Descriptions.Item>
                    <Descriptions.Item label='사용 쿠폰수' >{moneyFormat(order.coupons.length)}</Descriptions.Item>
                    <Descriptions.Item label='총금액' >{moneyFormat(order.totalPrice)}</Descriptions.Item>

                    <Descriptions.Item span={3} label='상품옵션' >{order.itemOption?.data?.reduce((prev, curr) => prev + curr + ', ', '')}</Descriptions.Item>

                    <Descriptions.Item label='배달업체' >{order.deliveryCompany} ({order.deliveryCompanyCode})</Descriptions.Item>
                    <Descriptions.Item label='송장번호' >{order.deliveryNumber}</Descriptions.Item>
                    <Descriptions.Item label='배송완료일자' >{order.deliveryCompletionDate ? dayjs(order.deliveryCompletionDate).format('YYYY-MM-DD hh:mm:ss') : ''}</Descriptions.Item>

                    <Descriptions.Item label='환불, 교환, 취소 사유' >{order.reason}</Descriptions.Item>
                    <Descriptions.Item span={2} label='상세사유' >{order.reasonDetail}</Descriptions.Item>

                    <Descriptions.Item label='환불금액' >{order.refundPrice}</Descriptions.Item>
                    <Descriptions.Item label='환불포인트' >{order.refundPoint}</Descriptions.Item>
                    <Descriptions.Item label='환불수단' >{order.refundMethod}</Descriptions.Item>
                </Descriptions>
            ))}
        </div>
    )
}

export default paymentDetail
