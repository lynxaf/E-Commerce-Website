import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_KEY are required")
}
// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseAnonKey)


export const getImageUrl = (name: string, path : 'brands' | 'products'= 'brands') => {
    const { data } = supabase
  .storage
  .from('belanja')
  .getPublicUrl(`public/${path}/${name}`)

  return data.publicUrl
}


export const uploadFile = async (file: File, path: 'brands' | 'products' = 'brands') => {

  const fileType = file.type.split('/')[1]
  const filename = `${path}-${Date.now()}.${fileType}`
  const { data, error } = await supabase
  .storage
  .from('belanja')
  .upload(`public/${path}/${filename}`, file, {
    cacheControl: '3600',
    upsert: false
  })

  if (error) {
    throw new Error(`Failed to upload file: ${error.message}`)
  }
  return filename
}

export const deleteFile = async (filename: string, path: 'brands' | 'products' = 'brands') => {
  const { error } = await supabase
  .storage
  .from('belanja')
  .remove([`public/${path}/${filename}`])
  if (error) {
    throw new Error(`Failed to delete file: ${error.message}`)
  }
}