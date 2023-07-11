import { Chart, Table } from '@/components/components';

import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Chart />
      <Table />
    </main>
  )
}
