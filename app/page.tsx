import { Chart } from '@/components/chart';
import { Table } from '@/components/table';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Chart />
      <Table />
    </main>
  )
}
