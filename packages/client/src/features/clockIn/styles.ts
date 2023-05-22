import styled from "styled-components";

export const ClockInButtonContainer = styled.div`
  border-bottom: 1px solid grey;
  padding-bottom: 20px;

  button {
    font-size: 30px;
    width: 100%;
  }
`;

export const AttendanceList = styled.div`
  margin: 20px 0;
  display: flex;
  flex-flow: column;
  gap: 10px;
`;

export const AttendanceItem = styled.div`
  cursor: pointer;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  padding: 10px;
  border: 1px solid grey;
  border-radius: 5px;

  .date {
    font-weight: bold;
  }

  .status {
  }

  .recordings {
    display: flex;
    flex-flow: row wrap;
    gap: 10px;
    padding-left: 20px;
  }
`;

export const AttendanceFilters = styled.div`
  margin: 20px 0;
  display: flex;
  flex-flow: row;
  gap: 10px;

  .selected {
    background: white;
    color: black;
  }
`
