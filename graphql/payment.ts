import { gql } from "@apollo/client";
import { PaymentState } from "../constants/type";
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