import { FiTrash2 } from 'react-icons/fi'

import { BsFillCheckCircleFill } from 'react-icons/bs'


import styles from '../Task/styles.module.scss'
import { ITask } from '../../App'

interface TaskProps {
  task: ITask,
  removeTask: (id: number) => void,
  toggleTask: (id: number) => void,
}

export default function Tasks({ task, removeTask, toggleTask }: TaskProps) {

  return (
    <>
      <div className={styles.container}>
        <button className={styles.check} onClick={() => toggleTask(task.id)}>
          {task.isCompleted ? <BsFillCheckCircleFill size={16} className={styles.isCompletedMark} /> : <div />}

        </button>

        <p className={task.isCompleted ? styles.isCompletedParagraph : ''}>
          {task.title}
        </p>

        <button className={styles.thrashIcon} onClick={() => removeTask(task.id)} > <FiTrash2 /></button>
      </div>
    </>

  )
}