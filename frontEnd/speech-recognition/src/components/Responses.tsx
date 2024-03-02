
import styles from '../styles/Responses.module.css';

interface Props {
	responses: string[];
}

export function Responses({ responses}: Props) {
	return (
		<div className={styles.responses}>
			{responses.length > 0 && (
				<div className={styles.responsesList}>
					{responses.map((response, index) => (
						// <div className="buttons-wrapper">
						// </div>

							<button
								className={styles.response}
								key={index}
								onClick={() => {
									console.log("yay")
								}}
								style={{
									visibility: response == ' ' ? 'hidden' : 'visible',
									pointerEvents: response == ' ' ? 'none' : 'auto',
									width: response == 'Select mode' ? '45%' : '100%',
									height: response == 'Select mode' ? '45%' : '100%'
									// position: response == 'Reselect training mode' ? 'relative' : 'absolute'// visibility:
								}}>
								{response}
							</button>
					))}
				</div>
			)}
		</div>
	);
}
