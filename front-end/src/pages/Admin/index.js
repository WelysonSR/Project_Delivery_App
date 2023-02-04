import NavBar from '../../components/NavBar';
import NewUser from '../../components/NewUser';
import UserList from '../../components/UserList';
import Main from './styles';

export default function Admin() {
  return (
    <>
      <NavBar />
      <Main>
        <section>
          <NewUser />
          <UserList />
        </section>
      </Main>
    </>
  );
}
