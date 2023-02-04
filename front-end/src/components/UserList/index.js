import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function UserList() {
  const [api, setApi] = useState([]);

  const newUser = useSelector(({ login }) => login.users);

  useEffect(() => {
    const gatuser = async () => {
      try {
        const URL = 'http://localhost:3001/user';
        const { data } = await axios.get(URL);
        setApi(data);
      } catch (err) {
        console.log(err);
      }
    };
    gatuser();
    if (api.length < newUser.length) {
      setApi(newUser);
    }
  }, [newUser]);

  const deleteUser = async (id) => {
    try {
      const URL = `http://localhost:3001/user/${id}`;
      const { data } = await axios.delete(URL);
      setApi(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h4 className="fs-4 fw-light">
        Lista de usuários

      </h4>
      <table className="grid gap-3 text-center table table-light table-sm rounded">
        <thead className="table-danger">
          <tr>
            <th className="col px-md-3">ID</th>
            <th className="col px-md-3">Nome</th>
            <th className="col px-md-3">Email</th>
            <th className="col px-md-3">Tipo</th>
            <th className="col px-md-3">Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            api.filter((user) => user.role !== 'administrator').map((user) => (
              <tr key={ user.id }>
                <td
                  data-testid={
                    `admin_manage__element-user-table-item-number-${user.id}`
                  }
                >
                  {user.id}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-name-${user.id}` }
                >
                  {user.name}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-email-${user.id}` }
                >
                  {user.email}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-role-${user.id}` }
                >
                  {user.role}
                </td>
                <td>
                  <button
                    className="btn btn-light border border-danger border-opacity-50"
                    type="button"
                    onClick={ () => deleteUser(user.id) }
                    data-testid={ `admin_manage__element-user-table-remove-${user.id}` }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
