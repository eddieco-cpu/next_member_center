import { gql } from "@apollo/client";

export const getTeachifyUserSyntax = gql`
  mutation LogIn($auth: LOGIN_AUTH!, $subdomain: String!) {
    logIn(auth: $auth, subdomain: $subdomain) {
      token
      user {
        email
        id
      }
    }
  }
`;

export const getHasAccessToCourseSyntax = gql`
  query Query($subdomain: String!, $slug: String!) {
    course(subdomain: $subdomain, slug: $slug) {
      courseType
      slug
      name
      defaultPricing
      plans {
        amount
        compareAtPrice
      }
      sections {
        id
        title
        lectures {
          id
          title
          isLocked
          isFreePreview
        }
      }
      isPurchased
    }
  }
`;

export const registerTeachifyUserSyntax = gql`
  mutation SignUp($auth: SIGNUP_AUTH!, $subdomain: String!) {
    signUp(auth: $auth, subdomain: $subdomain) {
      token
      user {
        email
        id
      }
    }
  }
`;

export const getOrderListSyntax = gql`
  query Payments($subdomain: String!, $state: String, $sorting: SortingInput) {
    payments(subdomain: $subdomain, state: $state, sorting: $sorting) {
      lineitems {
        itemImage
        itemName
        itemId
        itemSlug
        itemType
        amount
      }
      invoice {
        id
        number
        category
        buyerUbn
        buyerName
        donation
        loveCode
      }
      id
      amount
      paymentState
      tradeNo
      paidAt
      paymentType
      createdAt
    }
  }
`;

export const getTeachifyCourseSyntax = gql`
  query CourseListQuery($subdomain: String!) {
    purchasedCourses(subdomain: $subdomain) {
      name
      image
      tags
      courseType
      slug
      detailProgress {
        completionRate
      }
    }
    attendedSessions {
      nodes {
        name
        coverPhoto
        slug
      }
    }
  }
`;
