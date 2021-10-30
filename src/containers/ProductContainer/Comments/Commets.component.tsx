import { useRef, useState, useEffect, useContext, memo } from 'react';
import { AppContext, AppContextProps } from 'pages/_app';
import ReactTimeAgo from 'react-time-ago';
import JSTimeAgo from 'javascript-time-ago';
import { Rating } from 'components/Rating';
import { User } from 'models/User';

import {
	CommentsStyled,
	CommentStyled,
	CommentsHeader,
	CommentsList,
	CommentInfo,
	CommentUser,
	CommentRating,
	CommentDate,
	CommentMessage,
	CreateCommentModalStyled,
	ModalWrapper,
	ModalClose,
	ModalTitle,
	ModalInput,
	ModalRating,
	NoComments
} from './Comments.styles';
import { Comment as CommentModel } from 'models/Comment';
import { Theme } from 'models/Theme';
import { Button } from 'components/Button';
import es from 'javascript-time-ago/locale/es';
import CommentService from 'services/CommentService';

JSTimeAgo.addLocale(es);

const commentService = new CommentService();

type CommentProps = {
	comment: CommentModel;
};

const Comment = ({ comment }: CommentProps) => {
	const { createdAt, additionalInformation, rating, description } = comment;
	const [loaded, setLoaded] = useState<boolean>(false);
	const userName = additionalInformation.customer.name;

	useEffect(() => {
		setLoaded(true);
	}, []);

	return (
		<CommentStyled className="fade-in">
			<CommentInfo className="flex row">
				<CommentUser className="semi-bold">{userName}</CommentUser>
				<CommentRating>
					<Rating value={rating} />
				</CommentRating>
				<CommentDate className="capitalize">
					{loaded && <ReactTimeAgo date={createdAt} locale="es" />}
				</CommentDate>
			</CommentInfo>
			<CommentMessage>{description}</CommentMessage>
		</CommentStyled>
	);
};

type CreateCommentModalProps = {
	isOpen: boolean;
	closeModal: (comment?: CommentModel) => void;
};

const CreateCommentModal = ({
	isOpen,
	closeModal
}: CreateCommentModalProps) => {
	const commerceSlug = '';
	const [rating, setRating] = useState(0);
	const [message, setMessage] = useState('');
	const wrapper = useRef(null);

	if (!isOpen) {
		return null;
	}

	const handleOutiseClick = (evt) => {
		if (!wrapper.current.contains(evt.target)) {
			closeModal();
		}
	};

	const handleRatingChange = (value: number) => {
		setRating(value);
	};

	const handleMessageChange = (e) => {
		setMessage(e.target.value);
	};

	const handleSubmit = () => {
		closeModal({
			commerceSlug,
			description: message,
			rating,
			typeQuestionAnswer: 3
		});
		setMessage('');
		setRating(0);
	};

	return (
		<CreateCommentModalStyled
			className="center"
			onClick={handleOutiseClick}
		>
			<ModalWrapper ref={wrapper} className="flex column">
				<ModalClose
					className="bold pointer"
					onClick={closeModal.bind(null, null)}
				>
					X
				</ModalClose>
				<ModalTitle className="medium">
					Tu opinión nos importa ¡Evalúa tu producto!
				</ModalTitle>
				<ModalRating className="flex">
					<span className="label">Calificación general</span>
					<Rating
						value={rating}
						edit={true}
						color={'#767676'}
						onChange={handleRatingChange}
					/>
					<span className="warning">Campo obligatorio*</span>
				</ModalRating>
				<ModalInput
					placeholder="Escribe aquí"
					value={message}
					onChange={handleMessageChange}
				/>
				<div className="center">
					<Button
						variant="primary"
						className="btn-publish semi-bold"
						disabled={!rating}
						onClick={handleSubmit}
					>
						PUBLICAR COMENTARIO
					</Button>
				</div>
			</ModalWrapper>
		</CreateCommentModalStyled>
	);
};

type CommentsProps = {
	hash: string;
	productId: number;
	commerceSlug: string | string[];
	user: User;
};

export const Comments = memo(
	({ hash, productId, commerceSlug, user }: CommentsProps) => {
		const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
		const [comments, setComments] = useState<CommentModel[]>([]);
		const { token: userToken, name: userName } = user || {};
		const { openLoginModal }: AppContextProps = useContext(AppContext);

		const handleClick = () => {
			if (userToken) {
				setIsModalOpen(true);
			} else {
				openLoginModal();
			}
		};

		const handleClose = async (comment?: CommentModel) => {
			if (comment) {
				try {
					await commentService.postComments(
						productId,
						comment,
						userToken,
						commerceSlug
					);
					const extraData = {
						createdAt: new Date(),
						additionalInformation: {
							customer: {
								name: userName
							}
						}
					};
					const newComment = Object.assign({}, comment, extraData);
					setComments([newComment, ...comments]);
				} catch (error) {
					console.log('Error al crear comentario', error);
				}
			}
			setIsModalOpen(false);
		};

		useEffect(() => {
			(async () => {
				try {
					const comments = await commentService.getComments(
						productId,
						hash
					);
					setComments(comments.data);
				} catch (err) {
					console.log('Error:', err);
				}
			})();
		}, []);

		useEffect(() => {
			document.body.style.overflowY = isModalOpen ? 'hidden' : 'scroll';

			return () => {
				document.body.style.overflowY = 'scroll';
			};
		}, [isModalOpen]);

		return (
			<CommentsStyled
				className="container flex column"
				id="comments-section"
			>
				<CreateCommentModal
					isOpen={isModalOpen}
					closeModal={handleClose}
				/>
				<CommentsHeader className="flex row">
					<h3 className="medium upper">comentarios</h3>
					<button className="semi-bold upper" onClick={handleClick}>
						Escribir comentario
					</button>
				</CommentsHeader>
				<CommentsList className="comments-list">
					{comments.length ? (
						comments.map((comment) => (
							<Comment
								comment={comment}
								key={`Comments-item-${comment.createdAt}`}
							/>
						))
					) : (
						<NoComments className="semi-bold">
							Este producto aún no tiene comentarios
						</NoComments>
					)}
				</CommentsList>
			</CommentsStyled>
		);
	}
);
