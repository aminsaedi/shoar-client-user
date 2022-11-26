import React from "react";
import { useParams } from "react-router-dom";
import useMessage from "./hooks/useMessage";
import styled from "@emotion/styled";
import * as DOMPurify from "dompurify";

const colorChanger = `
  color: black;
  background-color: white;
  @media (prefers-color-scheme: dark) {
    color: white;
    background-color: black;
  }
`;

const Detail = styled.div`
  margin-top: 5px;
  text-align: center;
  font-size: 26px;
`;

const Main = styled.div`
  flex: auto;
  font-size: 83px;
  text-align: center;
  overflow: auto;
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  ${colorChanger}
`;

function App() {
  const { city } = useParams();

  const { message, isConnected } = useMessage();

  return (
    <Wrapper>
      <Detail>
        <span>{city}</span>
      </Detail>
      <Main>
        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message) }} />
      </Main>
      <Detail>
        <span>وضعیت اتصال:</span>
        <span data-testid="CONNECTION_STATUS">{isConnected}</span>
      </Detail>
    </Wrapper>
  );
}

export default App;
