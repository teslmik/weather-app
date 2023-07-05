import { Graph } from '@/components/graph';
import { Table } from '@/components/table';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Graph />
      <Table />
    </main>
  )
}
