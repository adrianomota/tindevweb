import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import { Container } from './styles';
import logo from '../../assets/logo.svg';
import api from '../../services/api';

export default function Home({ history }) {
  const [currentUser, setUsername] = useState('');

  async function handleSubmit({ username }) {
    const response = await api.post('/v1/dev/me', {
      username,
    });

    const { _id } = response.data.result;

    history.push(`/dev/${_id}`);
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <img src={logo} alt="avatar" />
        <Input
          name="username"
          placeholder="Digite seu usuário no Github"
          value={currentUser}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </Form>
    </Container>
  );
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
