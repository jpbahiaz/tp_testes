import { userStore } from "../../stores/user/store";
import { CreateUserContainer, UserList } from "./styles";

function SelectUser() {
  const allUsers = userStore((state) => state.all);
  const selectUser = userStore((state) => state.selectCurrentUser);

  return (
    <div>
      <h1>Selecione um usuário</h1>
      <div>
        {allUsers.map((user) => (
          <UserList>
            <div>
              {user.name} - {user.email}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                selectUser(user);
              }}
            >Selecionar</button>
          </UserList>
        ))}
      </div>
      <CreateUserContainer> 

      </CreateUserContainer> 
    </div>
  );
}

export default SelectUser;
