import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import logo from '../../assets/logo.svg';
import like from '../../assets/like.svg';
import dislike from '../../assets/dislike.svg';
import { Container, Buttons, Empty } from './styles';
import api from '../../services/api';

export default function Main({ match }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/v1/dev/list', {
        headers: {
          user: match.params.id,
        },
      });

      setUsers(response.data.result);
    }

    loadDevs();
  }, [match.params.id]);

  async function handleLike(id) {
    const url = `/v1/dev/${id}/like`;

    await api.post(url, null, {
      headers: { user: match.params.id },
    });

    setUsers(users.filter(user => user._id !== id));
  }

  async function handleDislike(id) {
    const url = `/v1/dev/${id}/dislike`;

    await api.post(url, null, {
      headers: { user: match.params.id },
    });

    setUsers(users.filter(user => user._id !== id));
  }

  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Tindev" />
      </Link>
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <img src={user.avatar} alt={user.name} />
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>

              <Buttons>
                <button type="button" onClick={() => handleLike(user._id)}>
                  <img src={like} alt="Like" />
                </button>
                <button type="button" onClick={() => handleDislike(user._id)}>
                  <img src={dislike} alt="Dislike" />
                </button>
              </Buttons>
            </li>
          ))}
        </ul>
      ) : (
        <Empty>
          <p>Acabou :(</p>
        </Empty>
      )}
    </Container>
  );
}

Main.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
