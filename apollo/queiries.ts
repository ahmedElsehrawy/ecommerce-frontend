import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($input: loginInput!) {
    login(input: $input) {
      id
      firstName
      lastName
      email
      phone
      role
      token
    }
  }
`;

export const CATEGORIES = gql`
  query categories($skip: Int!, $take: Int!) {
    categories(skip: $skip, take: $take) {
      count
      nodes {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts($where: getProductsInput!) {
    getProducts(where: $where) {
      id
      name
      description
      image
      price
      category {
        name
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query Product($where: getProductInput!) {
    product(where: $where) {
      name
      description
      id
      image
      category {
        name
      }
      price
    }
  }
`;

export const GET_CART = gql`
  query GetCart {
    getCart {
      totalPrice
      CartItem {
        id
        cartId
        quantity
        product {
          id
          name
          description
          image
          price
        }
      }
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation Mutation($input: addCartItemInput!) {
    addCartItem(input: $input) {
      id
      cartId
      quantity
      product {
        id
        name
        description
        image
        price
      }
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation Mutation($where: removeCartItemWhereUniqueInput!) {
    removeCartItem(where: $where) {
      id
    }
  }
`;
