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
      <h4>Lista de usuários</h4>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Excluir</th>
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
