import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Error from './ErrorMessage';
import Table from './styles/Table';
import SickButton from './styles/SickButton';



const POSSIBLE_PERMISSIONS = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMDELETE',
  'ITEMUPDATE',
  'PERMISSIONUPDATE',
];

const UPDATE_PERMMSIONS_MUTATION = gql`
  mutation updatePermissions($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`;

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const Permissions = (props) => (
  <Query query={ALL_USERS_QUERY}>
    {({data, loading, error}) => 
    console.log(data) || 
    (
      <div>
        <Error error={error}/>
        <div>
          <h2>Manage Permissions</h2>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                {POSSIBLE_PERMISSIONS.map(permission => 
                  <th key={permission}>{permission}</th>
                )}
                <th>👇</th>
              </tr>
            </thead>
                <tbody>
                  {data.users.map(user => <UserPermissions user={user} key={user.id}/>)}
                </tbody>
          </Table>
        </div>
      </div>
    )}
  </Query>
)

class UserPermissions extends Component {

  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      permissions: PropTypes.array
    }).isRequired,
  } 
  state = {
    permissions: this.props.user.permissions,
  }

  handlePermissionChange = e => {
    const checkbox = e.target;
    let updatedPermissions = [...this.state.permissions];
    // figure out if we need to remove or add thsi permission
    if (checkbox.checked){
      //add it in
      updatedPermissions.push(checkbox.value);
    } else {
      updatedPermissions = updatedPermissions.filter(permission => permission != checkbox.value)
    }
    this.setState({
      permissions: updatedPermissions
    })
  }

  render() {
    const user = this.props.user;
    return (
      <Mutation 
        mutation={UPDATE_PERMMSIONS_MUTATION} 
        variables={{
          permissions: this.state.permissions,
          userId: this.props.user.id
        }}
      >
        {(updatePermissions, {loading, error}) => (
          <>
          {error && <tr><td colSpan="8"><Error error={error}/></td></tr>}
          <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            {POSSIBLE_PERMISSIONS.map(permission => (
              <td key={permission}>
                <label htmlFor={`${user.id}-permission-${permission}`}>
                  <input id={`${user.id}-permission-${permission}`} type="checkbox" checked={this.state.permissions.includes(permission)}
                    value={permission}
                    onChange={this.handlePermissionChange}
                  />
                </label>
              </td>
            ))}
            <td>
              <SickButton 
                type="button" 
                disabled={loading}
                onClick={updatePermissions}
              >Updat{loading ? 'ing' : "e"}
              </SickButton>
            </td>
          </tr>
          </>
        )}
      </Mutation>
    );
  }
}



export default Permissions;

