import { imgix } from './imgix'

export async function getAllPhotos(): Promise<any[]> {
  const response = await imgix(`/assets/{{source_id}}?page[number]=0&page[size]=100`)
    .then(res => res.data)

  return response.map((photo: any) => photo.attributes.origin_path)
}
