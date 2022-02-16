import clsx from 'clsx';
import styles from './Table.module.scss';

interface ITable {
    headers: string[],
    columns: string[],
    data: any[]
    onClickCallback: (id: number) => void,
}

const Table: React.FC<ITable> = ({headers, columns, data, onClickCallback}) => {
        return (
            <div className={styles.container}>               
                <div className={styles.rowHeader}>
                    {headers.map((header, index) => <div key={index} className={clsx(styles.cell, styles.cellHeader)}>{header}</div>)}
                </div>
                {data.length === 0 ? <div className={styles.rowNoData}>Brak wyników.</div> : 
                    data.map((obj, objIndex) => 
                        <div key={objIndex} className={styles.row} onClick={() => onClickCallback(obj.id)}>
                            {columns.map((column, columnIndex) =>
                                <div key={columnIndex} className={styles.cell}>{obj[column]}</div>
                            )}
                        </div>
                    )
                }           
            </div>
        )
    }
    
export default Table;