import gql from "graphql-tag"
import { createQueryHook } from "../lib/createApolloHook"

// 
export const USER = gql`
  query($id:String!) {
    user (id:$id) {
        id
        name
        photo
        type
        paymentNum
        couponNum
        point
        certificatedInfo {
            id
            phone
        }
        refundBankAccount {
            id
            bankName
            accountNumber
            ownerName
        }
        deliveryInfo {
            id
            postCode
            address
            addressDetail
            name
            phone
        }
        userDetail {
            email
        }
    }
  }
`


interface UserData {
    user: {
        id: string
        name: string
        photo: string
        type: 'cat' | 'dog'
        paymentNum: number
        couponNum: number
        point: number
        certificatedInfo: {
            id: number
            phone: string
        } | null
        refundBankAccount: {
            id: number
            bankName: string
            accountNumber: string
            ownerName: string
        } | null
        deliveryInfo: {
            id: number
            postCode: string
            address: string
            addressDetail: string
            name: string
            phone: string
        } | null
        userDetail: {
            email: string | null
        }
    }
}
interface UserVars {
    id: string
}
export const useUser = createQueryHook<UserData, UserVars>(USER)