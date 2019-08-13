import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  img {
    align-self: center;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }

  input {
    margin-top: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 48px;
    padding: 0 20px;
    font-size: 16px;
    color: #666;

    &::placeholder {
      color: #999;
    }
  }

  button {
    margin: 10px 0 0;
    height: 48px;
    font-weight: bold;
    font-size: 16px;
    border-radius: 4px;
    border: 0;
    background: #df4724;
    color: #fff;
  }
`;
