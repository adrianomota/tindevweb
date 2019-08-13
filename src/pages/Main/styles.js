import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  margin: 0 auto;
  text-align: center;
  padding: 50px 0;
  width: 980px;

  ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
    margin-top: 60px;

    li > img {
      max-width: 100%;
      height: 320px;
      border-radius: 5px 5px 0 0;
    }

    li {
      display: flex;
      flex-direction: column;

      footer {
        flex: 1;
        background: #fff;
        border: 1px solid #eee;
        padding: 15px 20px;
        text-align: left;
        border-radius: 0 0 5px 5px;

        strong {
          font-size: 16px;
          color: #333;
        }

        p {
          font-size: 14px;
          color: #999;
          line-height: 20px;
          margin-top: 5px;
        }
      }
    }
  }
`;

export const Buttons = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;

  button {
    height: 50px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.5);
    border: 0;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
    transition: background 0.3s;
    &:hover {
      background: ${darken(0.03, '#eee')};
    }
    img {
      transition: background 0.2s;

      &:hover {
        transform: translateY(-5px);
      }
    }
  }
`;

export const Empty = styled.div`
  p {
    display: flex;
    color: #ccc;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    font-size: 34px;
    margin-top: 300px 0;
  }
`;
