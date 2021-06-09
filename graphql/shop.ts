import gql from "graphql-tag"
import { createMutationHook, createQueryHook } from "../lib/createApolloHook"
import { ShopState } from '../constants/type'


// 
export const SHOPS = gql`
  query {
    shops {
        id
        shopName
        shopImage
        rate
        rateNum
        itemNum
        state
    }
  }
`


interface ShopsData {
    shops: {
        id: number
        shopName: string
        shopImage: string
        rate: number
        rateNum: number
        itemNum: number
        state: ShopState
    }[]
}
interface ShopsVars { }
export const useShops = createQueryHook<ShopsData, ShopsVars>(SHOPS)

// 
export const UPDATE_SHOP = gql`
  mutation ($input:UpdateShopInput!, $id:Int!){
    updateShop(input:$input, id:$id) {
        id
        state
    }
  }
`
interface UpdateShopData { }
export interface UpdateShopInput {
    state: ShopState
}

interface UpdateShopVars {
    id: number
    input: UpdateShopInput
}
export const useUpdateShop = createMutationHook<UpdateShopData, UpdateShopVars>(UPDATE_SHOP)


// 
export const SHOP = gql`
  query ($id:Int!){
    shop (id:$id) {
        id
        shopName
        shopImage
        rate
        rateNum
        itemNum
        refundInfo
        exchangeInfo
        kakaoLink
        csPhone
        bankAccountNumber
        bankName    
        bankOwnerName
        kakaoId
        managerName 
        managerPhone
        managerEmail
        storeLink
        state
        seller {
            id
            email
            licenseNumber
            bizType
            bizRegistration
        }   
    }
  }
`


interface ShopData {
    shop: {
        id: number
        shopName: string
        shopImage: string
        rate: number
        rateNum: number
        itemNum: number
        refundInfo: string
        exchangeInfo: string
        kakaoLink: string
        csPhone: string
        bankAccountNumber: string
        bankName: string
        bankOwnerName: string
        kakaoId: string
        managerName: string
        managerPhone: string
        managerEmail: string
        storeLink: string
        state: ShopState
        seller: {
            id: number
            email: string
            licenseNumber: string
            bizType: string
            bizRegistration: string
        }
    }
}
interface ShopVars {
    id: number
}
export const useShop = createQueryHook<ShopData, ShopVars>(SHOP)



// QUERY/CREATE_REQUEST_SHOPS
export const CREATE_REQUEST_SHOPS = gql`
  query {
    createRequestShops {
        id
        shopName
        storeLink
        state
        seller {
            id
            email
            licenseNumber
            bizType
        }   
    }
  }
`

interface CreateRequestShop {
    id: number
    shopName: string
    storeLink: string
    state: ShopState
    seller: {
        id: number
        email: string
        licenseNumber: string
        bizType: string
    }
}

interface CreateRequestShopsData {
    createRequestShops: CreateRequestShop[]
}
interface CreateRequestShopsVars {

}
export const useCreateRequestShops = createQueryHook<CreateRequestShopsData, CreateRequestShopsVars>(CREATE_REQUEST_SHOPS)



// 
export const APPROVE_CREATE_REQUEST_SHOP = gql`
  mutation ($id:Int!){
    approveCreateRequestShop (id:$id) {
        id
        state
    }
  }
`

interface ApproveCreateRequestShopData {
    approveCreateRequestShop: {
        id: number
        state: ShopState
    }
}
interface ApproveCreateRequestShopVars {
    id: number
}
export const useApproveCreateRequestShop = createMutationHook<ApproveCreateRequestShopData, ApproveCreateRequestShopVars>(APPROVE_CREATE_REQUEST_SHOP)


// 
export const REJECT_CREATE_REQUEST_SHOP = gql`
  mutation ($id:Int!){
    rejectCreateRequestShop (id:$id) {
        id
    }
  }
`

interface RejectCreateRequestShopData {
    rejectCreateRequestShop: {
        id: number
    }
}
interface RejectCreateRequestShopVars {
    id: number
}
export const useRejectCreateRequestShop = createMutationHook<RejectCreateRequestShopData, RejectCreateRequestShopVars>(REJECT_CREATE_REQUEST_SHOP)