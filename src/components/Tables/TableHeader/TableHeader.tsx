import Link from 'next/link';
import React, { CSSProperties } from 'react';
import styles from './styles.module.scss';

type Props = {
    buttonPath?: string;
    buttonStyles?: CSSProperties;
    buttonText?: string;
    buttonIcon?: React.ReactNode;
    title: string;
};

const TableHeader = ({ buttonPath, buttonStyles, buttonText, buttonIcon, title }: Props) => {
    return (
        <div className={styles.tableHeaderContainer}>
            <span className={styles.tableTitle}>{title}</span>
            {buttonPath && (
                <Link href={buttonPath}
                    className={buttonStyles ? '' : styles.tableNewButton}
                    style={buttonStyles && buttonStyles}
                >
                    {/* <a style={buttonStyles ? buttonStyles : { color: 'white', backgroundColor: 'orange', padding: '.5rem 1rem' }}> */}
                    {buttonIcon && buttonIcon} {buttonText}
                    {/* </a> */}
                </Link>
            )}
        </div>
    );
};

export default TableHeader;