type DeliveryItem<TProps = any> = {
  id: string
  contentType: string
  name: string
  route?: { path?: string }
  properties: TProps
}

export const useUmbraco = () => {
  const { public: { UMBRACO_BASE_URL } } = useRuntimeConfig()

  const listBooks = async (page = 1, pageSize = 24) => {
    const res = await $fetch<{ items: DeliveryItem[]; total: number }>(
      `${UMBRACO_BASE_URL}/umbraco/delivery/api/v2/content`,
      { query: { contentType: 'book', page, pageSize } }
    )
    // filter out the container if it sneaks in
    res.items = res.items.filter(i => i.contentType === 'book')
    return res
  }

  const getByPath = (path: string) =>
    $fetch<DeliveryItem>(
      `${UMBRACO_BASE_URL}/umbraco/delivery/api/v2/content/item`,
      { query: { path } }
    )

  const getById = (id: string) =>
    $fetch<DeliveryItem>(
      `${UMBRACO_BASE_URL}/umbraco/delivery/api/v2/content/item`,
      { query: { id } }
    )

  return { listBooks, getByPath, getById }
}
