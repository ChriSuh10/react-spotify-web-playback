import { IPlayOptions } from './types/spotify';

export async function checkTracksStatus(tracks: string | string[], token: string) {
  const ids = Array.isArray(tracks) ? tracks : [tracks];

  return fetch(`https://api.spotify.com/v1/me/tracks/contains?ids=${ids}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(d => d.json());
}

export async function getTrackInfo(trackURI: string, token: string) {
  const trackId = trackURI.split(":").pop();
  return fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(d => d.json());
}

export async function getDevices(token: string) {
  return fetch(`https://api.spotify.com/v1/me/player/devices`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(d => d.json());
}

export async function getPlaybackState(token: string) {
  return fetch(`https://api.spotify.com/v1/me/player`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(d => {
    if (d.status === 204) {
      return;
    }

    return d.json();
  });
}

export async function pause(token: string) {
  return fetch(`https://api.spotify.com/v1/me/player/pause`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  });
}

export async function play(
  { context_uri, deviceId, offset = 0, uris, position_ms }: IPlayOptions,
  token: string,
) {
  let body;

  if (context_uri) {
    const isArtist = context_uri.indexOf('artist') >= 0;
    let position;

    if (!isArtist) {
      position = { position: offset };
    }

    body = JSON.stringify({ context_uri, offset: position });
  } else if (Array.isArray(uris) && uris.length) {
    body = JSON.stringify({ uris, offset: { position: offset }, position_ms });
  }

  return fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
    body,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  });
}

export async function previous(token: string) {
  return fetch(`https://api.spotify.com/v1/me/player/previous`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
}

export async function next(token: string) {
  return fetch(`https://api.spotify.com/v1/me/player/next`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
}

export async function removeTracks(tracks: string | string[], token: string) {
  const ids = Array.isArray(tracks) ? tracks : [tracks];

  return fetch(`https://api.spotify.com/v1/me/tracks`, {
    body: JSON.stringify(ids),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  });
}

export async function saveTracks(tracks: string | string[], token: string) {
  const ids = Array.isArray(tracks) ? tracks : [tracks];

  return fetch(`https://api.spotify.com/v1/me/tracks`, {
    body: JSON.stringify({ ids }),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  });
}

export async function seek(position: number, token: string) {
  return fetch(`https://api.spotify.com/v1/me/player/seek?position_ms=${position}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  });
}

export async function setDevice(deviceId: string, token: string) {
  return fetch(`https://api.spotify.com/v1/me/player`, {
    body: JSON.stringify({ device_ids: [deviceId], play: true }),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  });
}

export async function setVolume(volume: number, token: string) {
  return fetch(`https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  });
}
