import React, { ReactNode } from 'react';
import cnames from 'classnames';
import '../styles/question.scss';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
}

const Question: React.FC<QuestionProps> = ({
  content,
  author, 
  children,
  isAnswered = false,
  isHighlighted = false
}:QuestionProps) => {
  
  return (
  <div className={cnames('question',{answered: isAnswered}, {highlighted: isHighlighted && !isAnswered})}>
    <p>{content}</p>
    <footer>
      <div className="user-info">
        <img src={author.avatar} alt={author.name} />
        <span>{author.name}</span>
      </div>
      <div>{children}</div>
    </footer>
  </div>);
}

export default Question;