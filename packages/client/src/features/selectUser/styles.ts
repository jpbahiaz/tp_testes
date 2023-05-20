import styled from "styled-components";

export const UserList = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
`;

export const CreateUserContainer = styled.div`
  margin: 10px 0;

  form {
    margin: 20px 0;
  }
`

export const CreateUserField = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;

  input {
    margin: 10px 0;
  }
`
