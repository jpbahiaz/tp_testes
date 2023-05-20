import { useState } from "react";
import { userStore } from "../../stores/user/store";
import { CreateUserContainer, CreateUserField, UserList } from "./styles";
import { SubmitHandler, useForm } from "react-hook-form";

type CreateUserInputs = {
  name: string;
  email: string;
};

function SelectUser() {
  const allUsers = userStore((state) => state.all);
  const selectUser = userStore((state) => state.selectCurrentUser);
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const { register, handleSubmit } = useForm<CreateUserInputs>();
  const onSubmit: SubmitHandler<CreateUserInputs> = (data) => console.log(data);

  return (
    <div>
      <h1>Selecione um usuário</h1>
      <div>
        {allUsers.length ? (
          allUsers.map((user) => (
            <UserList>
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
            <button type="submit">Criar</button>
          </form>
        )}
      </CreateUserContainer>
    </div>
  );
}

export default SelectUser;
