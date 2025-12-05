export default async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  window.api.sql('update config set content = ? where id = 1', 'update', [JSON.stringify(data)])
}
