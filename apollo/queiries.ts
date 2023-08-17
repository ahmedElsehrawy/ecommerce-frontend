import { gql } from "@apollo/client";

export const ME = gql`
  query user {
    user {
      id
      firstName
      lastName
      email
      password
      balance
      phone
      token
      role
      Order {
        id
        userId
        orderStatus
        totalPrice
        address {
          id
          country
          city
          telephone
          street
          houseNumber
        }
        OrderItem {
          id
          product {
            id
            name
            description
            mainImage
            price
          }
          quantity
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const LOGIN = gql`
  mutation login($input: loginInput!) {
    login(input: $input) {
      id
      firstName
      lastName
      email
      phone
      role
      cart {
        CartItem {
          id
        }
      }
      token
    }
  }
`;

export const REGISTER = gql`
  mutation Register($input: createUserInput!) {
    register(input: $input) {
      id
      firstName
      lastName
      email
      phone
      role
      cart {
        CartItem {
          id
        }
      }
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
  query GetProducts($where: getProductsInput!, $skip: Int!, $take: Int!) {
    products(where: $where, skip: $skip, take: $take) {
      count
      nodes {
        id
        name
        description
        mainImage
        Gallery {
          id
          url
        }
        categoryId
        vendorId
        price
        discountId
        averageRatingValue
        Comment {
          id
          commentText
          createdAt
          user {
            id
            firstName
            lastName
          }
        }
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
      mainImage
      Gallery {
        id
        url
      }
      category {
        name
      }
      price
      Comment {
        id
        commentText
        createdAt
        user {
          id
          firstName
          lastName
        }
      }
      averageRatingValue
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
          mainImage
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
        mainImage
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

export const CREATE_ORDER = gql`
  mutation Mutation($input: createOrderInput!) {
    createOrder(input: $input) {
      id
      userId
      totalPrice
      orderStatus
      address {
        country
        city
      }
      createdAt
      updatedAt
      OrderItem {
        id
        quantity
        product {
          name
          price
        }
      }
    }
  }
`;

export const CREATE_ADDRESS = gql`
  mutation CreateAddress($input: createAddressInput!) {
    createAddress(input: $input) {
      id
      userId
    }
  }
`;

export const GET_USER_ADDRESSES = gql`
  query GetUserAddresses($where: getUserAddressesInput!) {
    getUserAddresses(where: $where) {
      id
      country
      city
      postalCode
      telephone
      street
      houseNumber
    }
  }
`;

export const ADD_AS_FAVOURITE = gql`
  mutation Mutation($input: addToFavouriteInput!) {
    AddAsFavourite(input: $input) {
      id
      product {
        id
        name
        description
        mainImage
        price
      }
    }
  }
`;

export const GET_FAVOURITES = gql`
  query Query {
    getFavourites {
      id
      product {
        id
        name
        description
        mainImage
        price
      }
    }
  }
`;

export const REMOVE_FROM_FAVOURITES = gql`
  mutation RemoveFromFavourites($where: removeFromFavouritesInput!) {
    removeFromFavourites(where: $where) {
      id
      product {
        id
      }
    }
  }
`;

export const GET_ONE_ORDER = gql`
  query GetOneOrder($where: getOrderInput!) {
    getOneOrder(where: $where) {
      id
      userId
      orderStatus
      address {
        id
        country
        city
        postalCode
        telephone
        street
        houseNumber
      }
      totalPrice
      OrderItem {
        id
        product {
          name
          price
          mainImage
        }
        quantity
      }
      createdAt
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($input: createCommentInput!) {
    createComment(input: $input) {
      commentText
      createdAt
      commentOwnerId
      id
      user {
        id
        firstName
        lastName
      }
      productId
      updatedAt
    }
  }
`;

export const CREATE_RATING = gql`
  mutation CreateRating($input: createRatingInput!) {
    createRating(input: $input) {
      id
      productId
      ratingValue
      userId
    }
  }
`;

export const DELETE_ADDRESS = gql`
  mutation DeleteAddress($where: getUserWhereUniqueInput!) {
    deleteAddress(where: $where) {
      id
    }
  }
`;

export const GET_COMMENTS = gql`
  query GetComments($where: getCommentsInput!) {
    getComments(where: $where) {
      id
      commentText
      commentOwnerId
      createdAt
      productId
    }
  }
`;
