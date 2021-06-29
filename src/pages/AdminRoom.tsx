import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import Button from '../components/Button';
import Question from '../components/Question';
import RoomCode from '../components/RoomCode';
//import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
import "../styles/room.scss";
import deleteImg from "../assets/images/delete.svg";

type RoomParams = {
  id:string;
}

const AdminRoom: React.FC = () => {
  //const {user, signInWithGoogle} = useAuth();
  const params = useParams<RoomParams>();
  //const [newQuestion, setNewQuestion] = useState('');
  const roomId = params.id;
  
  const {questions, title} = useRoom(roomId);

  const history = useHistory();

  async function handleEndRoom(){
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    });

    history.push('/');
  }

  // async function handleSendQuestion(e: FormEvent){
  //   e.preventDefault();
  //   if(newQuestion.trim() === ''){
  //     return;
  //   }

  //   if(!user){
  //     throw new Error('You must be logged in')
  //   }

  //   const question = {
  //     content: newQuestion,
  //     author: {
  //       name: user.name,
  //       avatar: user.avatar,
  //     },
  //     isHighlighted: false,
  //     isAnswered: false
  //   };

  //   await database.ref(`rooms/${roomId}/questions`).push(question);
  //   setNewQuestion('');
  // }

  async function handleDeleteQuestion(questionId: string){
    if(window.confirm('Tem certeza que você deseja excluir esta pergunta ?')){
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }
  
  return (
  <div id="page-room">
    <header>
      <div className="content">
        <img src={logoImg} alt="Letmeask" />
        <div>
          <RoomCode code={roomId}/>
          <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
        </div>
      </div>
    </header>
    <main>
      <div className="room-title">
        <h1>Sala {title}</h1>
        {questions.length > 0 && <span>{questions.length} pergunta{questions.length !== 1 && 's'}</span>}
      </div>
      
      <div className="question-list">
        {questions.map(question => (
            <Question key={question.id} content={question.content} author={question.author}>
              <button type="button" onClick={()=>handleDeleteQuestion(question.id)}>
                <img src={deleteImg} alt="Remover pergunta" />
              </button>
            </Question>
          )
        )}
      </div>
      
    </main>
  </div>
  );
}

export default AdminRoom;