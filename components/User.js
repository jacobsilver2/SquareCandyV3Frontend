import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const CURRENT_USER_QUERY = gql`
  query {
    me{
      id
      email
      name
      permissions
    }
  }
`;

// the purpose of this component is to pass the payload to the children.  That way you don't have to put all this code everywhere
// take special note of the {...props}.  This is so whatever props come into this component can also get passed down to its children

const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
)

User.propTypes = {
  children: PropTypes.func.isRequired,
}

export default User;
export {CURRENT_USER_QUERY};

