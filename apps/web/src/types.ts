export type Car = {
  id: string
  make: string
  model: string
  year: number
  vin: string
  registrationExpiry: string
  createdAt: string
}

export type RegistrationStatus = {
  carId: string
  isExpired: boolean
  expiresOn: string
  checkedAt: string
  make: string
  model: string
}
