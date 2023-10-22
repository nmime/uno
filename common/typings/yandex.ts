interface AdvData {
  adId: string
  video: boolean
  hitLogId: string
  bidReqIdStr: string
  eventHash: string
}

export interface AdInfo {
  product: string
  lang: string
  advData: AdvData[]
  productType: string
}
