export default async () => {
  return await window.api.sql('select * from config', 'findOne')
}
