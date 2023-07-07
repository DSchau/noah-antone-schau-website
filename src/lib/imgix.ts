export const IMGIX_URL=`https://api.imgix.com/api/{{api_version}}`

export const imgix = async (path: string, opts = {}) => {
  // replace all double brackets with a replacer function
  const url = `${IMGIX_URL}${path}`.replace(/\{\{([^\}]+)\}\}/g, (fullMatch, key) => {
    switch (key) {
      case 'api_version':
        return 'v1';
      case 'source_id':
        return import.meta.env.PUBLIC_IMGIX_SOURCE_ID;
      default:
        return fullMatch;
    }
  })

  const response = await fetch(url, {
    headers: {
      Authorization: `bearer ${import.meta.env.IMGIX_API_KEY}`
    },
    ...opts
  })

  if (!response.ok) {
    console.error(response)
    throw new Error(`${response.statusText}: ${response.status}`)
  }

  return response.json()
}