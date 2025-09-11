export const useUmbraco = () => {
  const { public: { UMBRACO_BASE_URL } } = useRuntimeConfig()

  // Returns the raw response from the Delivery API
  const listBooks = () =>
    $fetch(`${UMBRACO_BASE_URL}/umbraco/delivery/api/v2/content`, {
      query: { contentType: 'book', pageSize: 50 }
    })

  return { listBooks }
}
