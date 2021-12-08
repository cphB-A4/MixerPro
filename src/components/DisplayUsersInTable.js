import { Table } from "react-bootstrap";

function DisplayUsersInTable({ userList, setUserState, setUsers }) {
  return (
    <Table striped bordered hover>
      {
        <>
          <thead>
            <tr>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user, index) => (
              <tr key={index}>
                <td>
                  <button
                    className="btn btn-black"
                    onClick={() => {
                      setUserState(user);
                      setUsers("");
                    }}
                  >
                    {user}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </>
      }
    </Table>
  );
}

export default DisplayUsersInTable;