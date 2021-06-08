import { gql } from "@apollo/client";
import { ItemState, ItemRequireInformation, ItemOption, ItemType } from "../constants/type";
import { createMutationHook, createQueryHook } from "../lib/createApolloHook";

// QUERY/APP_VERSIONS
export const APP_VERSIONS = gql`
  query {
    appVersions {
        id
        majorVersion
        minorVersion
        patchVersion
        updateRequire
        playstoreDistributed
        appstoreDistributed
    }
  }
`
export interface AppVersion {
    id: number
    majorVersion: number
    minorVersion: number
    patchVersion: number
    updateRequire: boolean
    playstoreDistributed: boolean
    appstoreDistributed: boolean
}
interface AppVersionsData {
    appVersions: AppVersion[]
}
interface AppVersionsVars { }
export const useAppVersions = createQueryHook<AppVersionsData, AppVersionsVars>(APP_VERSIONS)

// 
export const CREATE_APP_VERSION = gql`
  mutation ($input: CreateAppVersionInput!) {
    createAppVersion(input:$input) {
        id
        majorVersion
        minorVersion
        patchVersion
        updateRequire
        playstoreDistributed
        appstoreDistributed
    }
  }
`
interface CreateAppVersionData {
    createAppVersion: {
        id: number
    }
}
export interface CreateAppVersionInput {
    majorVersion: number
    minorVersion: number
    patchVersion: number
    updateRequire: boolean
    playstoreDistributed: boolean
    appstoreDistributed: boolean
}

interface CreateAppVersionVars {
    input: CreateAppVersionInput
}
export const useCreateAppVersion = createMutationHook<CreateAppVersionData, CreateAppVersionVars>(CREATE_APP_VERSION)

// 
export const DELETE_APP_VERSION = gql`
  mutation($id:Int!) {
    deleteAppVersion(id:$id) {
        id
    }
  }
`
interface DeleteAppVersionData {
    deleteAppVersion: {
        id: number
    }
}
interface DeleteAppVersionVars {
    id: number
}
export const useDeleteAppVersion = createMutationHook<DeleteAppVersionData, DeleteAppVersionVars>(DELETE_APP_VERSION)


// 
export const UPDATE_APP_VERSION = gql`
  mutation($input: UpdateAppVersionInput!) {
    updateAppVersion(input:$input) {
        id
        majorVersion
        minorVersion
        patchVersion
        updateRequire
        playstoreDistributed
        appstoreDistributed
    }
  }
`
interface UpdateAppVersionData {
    updateAppVersion: {
        id: number
        majorVersion: number
        minorVersion: number
        patchVersion: number
        updateRequire: boolean
        playstoreDistributed: boolean
        appstoreDistributed: boolean
    }
}

export interface UpdateAppVersionInput {
    id: number
    majorVersion?: number
    minorVersion?: number
    patchVersion?: number
    updateRequire?: boolean
    playstoreDistributed?: boolean
    appstoreDistributed?: boolean
}

interface UpdateAppVersionVars {
    input: UpdateAppVersionInput
}
export const useUpdateAppVersion = createMutationHook<UpdateAppVersionData, UpdateAppVersionVars>(UPDATE_APP_VERSION)

