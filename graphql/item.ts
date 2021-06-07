import { gql } from "@apollo/client";
import { ItemState, ItemRequireInformation, ItemOption, ItemType } from "../constants/type";
import { createMutationHook, createQueryHook } from "../lib/createApolloHook";

// QUERY/ITEM
export const ITEM = gql`
  query ($id:Int!){
    item(id:$id) {
        id
        name
        likeNum
        state
        type
        deliveryPrice
        extraDeliveryPrice
        sale
        price
        salePrice
        option
        requireInformation
        html
        category1
        category2
        rate
        totalOrderNum
        reviewNum
        shop {
            id
            shopName
        }
        images {
            id
            uri
        }
        updateItem {
            id
            name
            deliveryPrice
            extraDeliveryPrice
            sale
            price
            salePrice
            option
            requireInformation
            html
            category1
            category2
            type
            images {
                id
                uri
            }
        }
    }
  }
`
export interface ItemDetail {
    id: number
    name: string
    likeNum: number
    state: ItemState
    type: ItemType
    deliveryPrice: number
    extraDeliveryPrice: number
    price: number
    sale: number
    salePrice: number
    option: ItemOption
    requireInformation: ItemRequireInformation
    html: string
    category1: string | null
    category2: string | null
    rate: number
    totalOrderNum: number
    reviewNum: number
    shop: {
        id: number
        shopName: string
    }
    images: {
        id: number
        uri: string
    }[]
    updateItem: {
        id: number
        name: string
        deliveryPrice: number
        extraDeliveryPrice: number
        sale: number
        price: number
        salePrice: number
        option: ItemOption
        requireInformation: ItemRequireInformation
        html: string
        category1: string | null
        category2: string | null
        type: ItemType
        images: {
            id: number
            uri: string
        }[]
    } | null
}
interface ItemData {
    item: ItemDetail
}
interface ItemVars {
    id: number
}
export const useItem = createQueryHook<ItemData, ItemVars>(ITEM)

// 
export const REGIST_REQUEST_ITEMS = gql`
  query {
    registRequestItems {
        id
        name
        createdAt
        likeNum
        state
        type
        rate
        totalOrderNum
        shop {
            id
            shopName
        }
        updateItem {
            id
        }
    }
  }
`
export interface Item {
    id: number
    name: string
    createdAt: Date
    likeNum: number
    state: ItemState
    type: ItemType
    rate: number
    totalOrderNum: number
    shop: {
        id: number
        shopName: string
    }
    updateItem: {
        id: number
    } | null
}
interface RegistRequestItemsData {
    registRequestItems: Item[]
}
interface RegistRequestItemsVars {

}
export const useRegistRequestItems = createQueryHook<RegistRequestItemsData, RegistRequestItemsVars>(REGIST_REQUEST_ITEMS)

// 
export const APPROVE_REGIST_REQUEST_ITEM = gql`
  mutation($id:Int!) {
    approveRegistRequestItem(id:$id) {
        id
        state
    }
  }
`

interface ApproveRegistRequestItemData { }
interface ApproveRegistRequestItemVars { }
export const useApproveRegistRequestItem = createMutationHook<ApproveRegistRequestItemData, ApproveRegistRequestItemVars>(APPROVE_REGIST_REQUEST_ITEM)


// 
export const REJECT_REGIST_REQUEST_ITEM = gql`
  mutation($id:Int!) {
    rejectRegistRequestItem(id:$id) {
        id
        state
    }
  }
`

interface RejectRegistRequestItemData {
    rejectRegistRequestItem: {
        id: number
        state: ItemState
    }
}
interface RejectRegistRequestItemVars { }
export const useRejectRegistRequestItem = createMutationHook<RejectRegistRequestItemData, RejectRegistRequestItemVars>(REJECT_REGIST_REQUEST_ITEM)

// 
export const UPDATE_REQUEST_ITEMS = gql`
  query {
    updateRequestItems {
        id
        name
        createdAt
        likeNum
        state
        type
        rate
        totalOrderNum
        shop {
            id
            shopName
        }
        updateItem {
            id
        }
    }
  }
`

interface UpdateRequestItemsData {
    updateRequestItems: Item[]
}
interface UpdateRequestItemsVars {

}
export const useUpdateRequestItems = createQueryHook<UpdateRequestItemsData, UpdateRequestItemsVars>(UPDATE_REQUEST_ITEMS)
