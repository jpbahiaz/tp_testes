import { useEffect, useState } from "react";
import { userStore } from "../../modules/user/store";
import { CreateUserContainer, CreateUserField, UserList } from "./styles";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "../../shared/constants";

type CreateUserInputs = {
  name: string;
  email: string;
};

function SelectUser() {
  const allUsers = userStore((state) => state.all);
  const usersReceived = userStore((state) => state.usersReceived);
  const selectUser = userStore((state) => state.selectCurrentUser);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [loading, setLoading] = useState(false);

  async function getUsers() {
    const users = await axios.get(`${BASE_URL}/users`);
    usersReceived(users.data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  const { register, handleSubmit, reset } = useForm<CreateUserInputs>();
  const onSubmit: SubmitHandler<CreateUserInputs> = async (data) => {
    setLoading(true);
    await axios.post(`${BASE_URL}/users`, data);
    setIsCreatingUser(false);
    setLoading(false);
    reset();
    getUsers();
  };

  return (
    <div>
      <h1>Selecione um usuário</h1>
      <div>
        {allUsers.length ? (
          allUsers.map((user) => (
            <UserList key={user.email}>
              <div>
                {user.name} - {user.email}
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  selectUser(user);
                }}
              >
                Selecionar
              </button>
            </UserList>
          ))
        ) : (
          <UserList>Nenhum usuário encontrado</UserList>
        )}
      </div>
      <CreateUserContainer>
        <button onClick={() => setIsCreatingUser((prev) => !prev)}>
          {isCreatingUser ? "Fechar" : "Criar usuário"}
        </button>
        {isCreatingUser && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <CreateUserField>
              <input placeholder="Nome" {...register("name")} />
            </CreateUserField>
            <CreateUserField>
              <input placeholder="Email" {...register("email")} />
            </CreateUserField>
            <button disabled={loading} type="submit">
              Criar
            </button>
          </form>
        )}
      </CreateUserContainer>
    </div>
  );
}

export default SelectUser;
