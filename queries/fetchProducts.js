import gql from "graphql-tag";

export default gql`
{
  products {
    _id
    name
    stripeProductId
    subscriptions {
      _id
      name
      stripeSubscriptionPlanId
      interval
      price
    }
  }
}
`;