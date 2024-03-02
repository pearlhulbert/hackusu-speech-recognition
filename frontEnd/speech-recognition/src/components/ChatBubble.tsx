import styles from '../styles/ChatBubble.module.css';

interface Props {
	content: string;
	side: string;
}


export function ChatBubble({ content, side }: Props) {
	return (
		
        <div className={styles.messageBar + ' ' +  styles.messageBar_ + side}>
            <div className={styles.chatBubble + ' ' + styles.chatBubble_ + side}>
                {content}
            </div>
        </div>
	);
}
