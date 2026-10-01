export enum ExceptionType {
  DELAY = 'DELAY',
  DAMAGE = 'DAMAGE',
  ADDRESS = 'ADDRESS',
}

export enum ExceptionStatus {
  OPEN = 'OPEN',
  RESOLVED = 'RESOLVED',
}

export interface ShipmentException {
  id: string;
  shipmentId: string;
  type: ExceptionType;
  description: string;
  status: ExceptionStatus;
}
