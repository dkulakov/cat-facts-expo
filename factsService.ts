import { formatUrl, constructEndpointUrl } from './httpUtils';

const BASE_URL = 'https://cat-fact.herokuapp.com';

interface FactsRandomParams {
  readonly animal_type: string;
  readonly amount: number;
}

export type Fact = {
  used: boolean;
  source: string;
  type: string;
  deleted: boolean;
  _id: string;
  user: string;
  text: string;
  __v: number;
  updatedAt: Date;
  createdAt: Date;
  status: {
    verified: boolean;
    sentCount: number;
  };
};

export type FactsResponse = Fact[];

export const getFactsRandomUrl = (params: FactsRandomParams): string => {
  const endpoint = constructEndpointUrl(BASE_URL)('/facts/random');
  return formatUrl(endpoint, params);
};

export const getCatFactsRandomUrl = (amount: number = 3): string =>
  getFactsRandomUrl({ animal_type: 'cat', amount });
