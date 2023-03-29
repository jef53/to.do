import styles from './styles.module.scss';
import logo from '../../images/logo.svg';
import clipboard from '../../images/clipboard.svg';
import { AiOutlinePlusCircle } from 'react-icons/ai';

import Tasks from '../../components/Task';
import { useState } from 'react';
import { ITask } from '../../App';

interface HomeProps {
  tasks: ITask[],
  createTask: (title: string) => void,
  removeTask: (id: number) => void,
  toggleTask: (id: number) => void,
}

export default function Home({ tasks, createTask, removeTask, toggleTask }: HomeProps) {

  const finishedTasks = tasks.filter(task => task.isCompleted === true);

  const [value, setValue] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    createTask(value)
    setValue('')
  }

  return (
    <>
      <div className={styles.Header}>
        <div className={styles.logo}>
          <img src={logo} alt='logo' />
        </div>

        <form className={styles.mainForm} onSubmit={handleSubmit}>
          <input
            type="text" id="data" name="data" placeholder="Adicione uma nova tarefa" value={value} onChange={handleChange}
          />
          <button type="submit" className={styles.submitButton}>
            Criar
            <AiOutlinePlusCircle className={styles.plusIcon} />
          </button>

        </form>

        <div className={styles.sectionContent}>
          <div className={styles.taskInfo}>
            <div className={styles.taxascriadas}>Tarefas criadas: {tasks.length}</div>
            <div className={styles.concluidas}>Concluídas: {finishedTasks.length}</div>
          </div>

          <div className={styles.taskContent}>



            <div className={styles.borderLine}>
              {tasks.length < 1 && <div>
                <div className={styles.imageContainer}><img src={clipboard} /></div>
                <h3>Você ainda não tem tarefas cadastradas</h3>
                <h6>Crie tarefas e organize seus itens a fazer</h6>
              </div>
              }
            </div>

            <div>
              {
                tasks.map((task) => (


                  <Tasks key={task.id} task={task} removeTask={removeTask} toggleTask={toggleTask} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}