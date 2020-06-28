/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getVarthai = /* GraphQL */ `
  query GetVarthai($id: ID!) {
    getVarthai(id: $id) {
      id
      varthai
      hint
    }
  }
`;
export const listVarthais = /* GraphQL */ `
  query ListVarthais(
    $filter: ModelVarthaiFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVarthais(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        varthai
        hint
      }
      nextToken
    }
  }
`;
