type DeliveryItem<TProps = Record<string, unknown>> = {
  id: string
  contentType: string
  name: string
  route?: { path: string }
  properties: TProps
}

export const useUmbraco = () => {
  const { public: { UMBRACO_BASE_URL } } = useRuntimeConfig()

  // List items of a content type (e.g. "book")
  const listByType = <TProps = any>(contentType: string, page = 1, pageSize = 20) =>
    $fetch<{ items: DeliveryItem<TProps>[], total: number }>(
      `${UMBRACO_BASE_URL}/umbraco/delivery/api/v2/content`, {
        query: { contentType, page, pageSize }
      }
    )

  // Get a single item by path (e.g. "/books/the-martian")
  const getByPath = <TProps = any>(path: string) =>
    $fetch<DeliveryItem<TProps>>(
      `${UMBRACO_BASE_URL}/umbraco/delivery/api/v2/content/item`,
      { query: { path } }
    )

  return { listByType, getByPath }
}
