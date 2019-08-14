import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

import sockerUrl from '../../services/socket';

import logo from '../../assets/logo.svg';
import like from '../../assets/like.svg';
import dislike from '../../assets/dislike.svg';
import itsamatch from '../../assets/itsamatch.png';

import { Container, Buttons, Empty, Match, MatchAvatar } from './styles';
import api from '../../services/api';

export default function Main({ match }) {
  const [users, setUsers] = useState([]);
  const [matchDev, setMatchDev] = useState(null);

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

  useEffect(() => {
    const socket = io(sockerUrl, {
      query: { user: match.params.id },
    });

    socket.on('match', dev => {
      setMatchDev(dev);
    });
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

      {matchDev && (
        <Match>
          <img src={itsamatch} alt="It's a match" />

          <MatchAvatar src={matchDev.avatar} alt="" />
          <strong>{matchDev.name}</strong>
          <p>{matchDev.bio}</p>

          <button type="button" onClick={() => setMatchDev(null)}>
            FECHAR
          </button>
        </Match>
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
