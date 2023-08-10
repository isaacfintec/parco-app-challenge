export interface Parking {
  name: string;
  spots: number;
  contact: number;
  parkingType: string;
}

export type ValidUpdatedProps = Pick<Parking, 'spots' | 'contact'>;

export default Parking;
