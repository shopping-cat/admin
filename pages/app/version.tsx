import { Button, InputNumber, Space, Switch, Table } from 'antd'
import React, { useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import LoadingView from '../../components/View/LoadingView'
import { useAppVersions, useDeleteAppVersion, useCreateAppVersion, useUpdateAppVersion, UpdateAppVersionInput, CreateAppVersionInput } from '../../graphql/appVersion'

const version = () => {

    const { data, loading, refetch } = useAppVersions()
    const [deletedList, setDeletedList] = useState<number[]>([])
    const [createAppVersion, { loading: createLoading }] = useCreateAppVersion()
    const [deleteAppVersion, { loading: deleteLoading }] = useDeleteAppVersion()
    const [updateAppVersion, { loading: updateLoading }] = useUpdateAppVersion()
    const { reset, register, getValues, control } = useForm<CreateAppVersionInput>({
        defaultValues: {
            majorVersion: 0,
            minorVersion: 0,
            patchVersion: 0,
            appstoreDistributed: false,
            playstoreDistributed: false,
            updateRequire: false
        }
    })
    const onDelete = useCallback(async (id: number) => {
        if (createLoading || deleteLoading || updateLoading) return
        if (!confirm('삭제후 복구하실 수 없습니다')) return

        const { data } = await deleteAppVersion({ variables: { id } })

        setDeletedList(prev => [...prev, data.deleteAppVersion.id])

    }, [createLoading, deleteLoading, updateLoading])

    const onUpdate = useCallback(async (input: UpdateAppVersionInput) => {
        if (createLoading || deleteLoading || updateLoading) return
        console.log(input)
        await updateAppVersion({ variables: { input } })

    }, [createLoading, deleteLoading, updateLoading])

    const onCreate = useCallback(async () => {
        if (createLoading || deleteLoading || updateLoading) return
        await createAppVersion({ variables: { input: getValues() } })
        reset()
        await refetch()
    }, [createLoading, deleteLoading, updateLoading, getValues()])


    if (loading) return <LoadingView />

    return (
        <div>
            <Space style={{ marginBottom: 16 }} >
                <Controller
                    control={control}
                    name='majorVersion'
                    render={({ field: { value, onChange } }) => (<InputNumber value={value} onChange={onChange} />)}
                />
                <Controller
                    control={control}
                    name='minorVersion'
                    render={({ field: { value, onChange } }) => (<InputNumber value={value} onChange={onChange} />)}
                />
                <Controller
                    control={control}
                    name='patchVersion'
                    render={({ field: { value, onChange } }) => (<InputNumber value={value} onChange={onChange} />)}
                />

                <Button onClick={onCreate} >등록</Button>
            </Space>
            <Table
                columns={[
                    {
                        title: 'Major',
                        align: 'center',
                        dataIndex: 'majorVersion'
                    },
                    {
                        title: 'Minor',
                        dataIndex: 'minorVersion',
                        align: 'center',
                    },
                    {
                        title: 'Patch',
                        align: 'center',
                        dataIndex: 'patchVersion'
                    },
                    {
                        title: '업데이트 필수',
                        align: 'center',
                        render: (_, r) => <Switch checked={r.updateRequire} onChange={v => onUpdate({ id: r.id, updateRequire: v })} />
                    },
                    {
                        title: '앱스토어 통과',
                        align: 'center',
                        render: (_, r) => <Switch checked={r.appstoreDistributed} onChange={v => onUpdate({ id: r.id, appstoreDistributed: v })} />
                    },
                    {
                        title: '플레이스토어 통과',
                        align: 'center',
                        render: (_, r) => <Switch checked={r.playstoreDistributed} onChange={v => onUpdate({ id: r.id, playstoreDistributed: v })} />
                    },
                    {
                        title: '삭제',
                        align: 'center',
                        render: (_, r) => <>
                            {deletedList.includes(r.id)
                                ? <div>삭제됨</div>
                                : <Button onClick={() => onDelete(r.id)} >삭제</Button>
                            }

                        </>
                    }
                ]}
                dataSource={data?.appVersions.filter(v => !deletedList.includes(v.id)) || []}
            />
        </div>
    )
}

export default version
