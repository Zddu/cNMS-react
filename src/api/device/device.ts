import { getData } from '@/util/axios';

export const getAllDevice = () => getData('/cool/devices');
