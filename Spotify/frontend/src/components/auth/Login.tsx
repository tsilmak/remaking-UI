import React from "react";
import { SpotifyIcon } from "../icons/icons";

const Login = () => {
  return (
    <div className="max-w-[734px] w-full flex items-center justify-center mx-auto my-7 text-white rounded-lg bg-gradient-to-b bg-[#121212] pt-9 pb-3">
      <div>
        <SpotifyIcon className="w-9 h-9" />
      </div>
      <div>
        <h1>Iniciar sessão no Spotify</h1>
      </div>
    </div>
  );
};

export default Login;
