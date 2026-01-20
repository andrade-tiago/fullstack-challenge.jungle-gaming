export const isAppRpcError = (error: any) => {
  return typeof error?.['type'] === 'number'
}
