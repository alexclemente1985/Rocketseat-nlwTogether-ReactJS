import React from 'react';
import IllustrationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";
import "../styles/auth.scss";
import Button from '../components/Button';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Home: React.FC = () => {
  const history = useHistory();
  const {user, signInWithGoogle} = useAuth();
  
  async function handleCreateRoom(){
    if(!user){
      await signInWithGoogle();
    }
    history.push("/rooms/new");
  }
  return (
  <div id="page-auth">
    <aside>
      <img src={IllustrationImg} alt="Ilustração para perguntas e respostas"/>
      <strong>Crie salas  de Q&amp;A</strong>
      <p>Tire as dúvidas de sua audiência em tempo real</p>
    </aside>
    <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask"/>
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Logo do Google"/>
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input type="text" placeholder="Digite o código da sala"></input>
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
  </div>
  );
}

export default Home;