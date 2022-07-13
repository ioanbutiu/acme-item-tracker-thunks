import React from 'react';
import { connect } from 'react-redux';
import { createUser, updateThing, updateUser, deleteUser } from './store';

const Users = ({
  users,
  createUser,
  deleteUser,
  things,
  removeThingFromUser,
  increment,
}) => {
  return (
    <div>
      <h1>Users</h1>
      <button onClick={createUser}>+</button>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              {user.name} ({user.ranking})
              <button onClick={() => deleteUser(user)}>Delete</button>
              <button onClick={() => increment(user, -1)}>-</button>
              <button onClick={() => increment(user, 1)}>+</button>
              <ul>
                {things
                  .filter((thing) => thing.userId === user.id)
                  .map((thing) => {
                    return (
                      <li key={thing.id}>
                        {thing.name} ({thing.ranking})
                        <button onClick={() => removeThingFromUser(thing)}>
                          Remove
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// const mapStateToProps = (state)=> {
//   return {
//     users: state.users,
//     things: state.things
//   };
// }

// const mapDispatch = (dispatch)=> {
//   return {
//     createUser: async()=> {
//       const user = (await axios.post('/api/users', {name: Math.random()})).data;
//       dispatch({ type: 'CREATE_USER', user});
//       //hint
//       //dispatch(createUser({name: Math.random()}));
//     },
//     removeThingFromUser: async(thing)=> {
//       thing = {...thing, userId: null}
//       const updatedThing = (await axios.put(`/api/things/${thing.id}`, thing)).data
//       dispatch({ type: 'UPDATE_THING', thing: updatedThing});
//     },
//     deleteUser: async(user)=> {
//       await axios.delete(`/api/users/${user.id}`);
//       dispatch({ type: 'DELETE_USER', user});
//     },
//   };
// }
// export default connect(mapStateToProps, mapDispatch)(Users);

export default connect(
  (state) => {
    return {
      users: state.users,
      things: state.things,
    };
  },
  (dispatch) => {
    return {
      createUser: () => {
        dispatch(createUser({ name: Math.random() }));
      },
      removeThingFromUser: (thing) => {
        thing = { ...thing, userId: null };
        dispatch(updateThing(thing));
      },
      increment: (user, dir) => {
        user = { ...user, ranking: user.ranking + dir };
        dispatch(updateUser(user));
      },
      deleteUser: (user) => {
        dispatch(deleteUser(user));
      },
    };
  }
)(Users);
