import { gql } from "@apollo/client";
import { OrderState, PaymentState } from "../constants/type";
import { createMutationHook, createQueryHook } from "../lib/createApolloHook";


// 
export const PAYMENTS = gql`
  query {
    payments {
        id
        name
        createdAt
        state
        paymentMethod
        price
        deliveryPrice
        extraDeliveryPrice
        totalPrice
        pointSale
        couponSale
        user {
            id
            name
        }
    }
  }
`


interface PaymentsData {
    payments: {
        id: string
        name: string
        createdAt: Date
        state: PaymentState
        paymentMethod: string
        price: number
        deliveryPrice: number
        extraDeliveryPrice: number
        totalPrice: number
        user: {
            id: string
            name: string
        }
    }[]
}
interface PaymentsVars { }
export const usePayments = createQueryHook<PaymentsData, PaymentsVars>(PAYMENTS)

export const PAYMENT = gql`
  query($id:String!) {
    payment(id:$id) {
        id
        name
        createdAt
        state
        paymentMethod #
        price 
        deliveryPrice
        extraDeliveryPrice
        totalPrice
        pointSale
        couponSale
        totalPrice
        itemSale
        address
        addressName
        addressPhone
        postCode
        deliveryMemo
        vBankNum
        vBankName
        vBankDate
        cancelReason
        cancelPoint
        cancelPrice
        user {
            id
            name
        }
        orders {
            id
            state
            itemPrice
            itemOptionPrice
            itemSale
            totalPrice
            num
            itemOption
            deliveryCompletionDate
            deliveryNumber
            deliveryCompany
            deliveryCompanyCode
            reason
            reasonDetail
            refundPrice
            refundPoint
            refundMethod
            expectationRefundPrice
            expectationRefundPoint
            coupons {
                id
            }
            itemReview {
                id
                rate
            }
            item {
                id
                name
            }
        }
    }
  }
`


interface PaymentData {
    payment: {
        id: string
        name: string
        createdAt: Date
        state: PaymentState
        cancelReason: string
        cancelPoint: number
        cancelPrice: number
        paymentMethod: string
        price: number
        deliveryPrice: number
        extraDeliveryPrice: number
        totalPrice: number
        pointSale: number
        couponSale: number
        itemSale: number
        address: string
        addressName: string
        addressPhone: string
        postCode: string
        deliveryMemo: string
        vBankNum: string
        vBankName: string
        vBankDate: Date
        user: {
            id: string
            name: string
        }
        orders: {
            id: number
            state: OrderState
            itemPrice: number
            itemOptionPrice: number
            itemSale: number
            totalPrice: number
            num: number
            itemOption: { data: string[] }
            deliveryCompletionDate: Date
            deliveryNumber: string
            deliveryCompany: string
            deliveryCompanyCode: string
            reason: string
            reasonDetail: string
            refundPrice: number
            refundPoint: number
            refundMethod: string
            expectationRefundPrice: number
            expectationRefundPoint: number
            coupons: {
                id: number
            }[]
            itemReview: {
                id: number
                rate: number
            }
            item: {
                id: number
                name: string
            }
        }[]
    }
}
interface PaymentVars {
    id: string
}
export const usePayment = createQueryHook<PaymentData, PaymentVars>(PAYMENT)