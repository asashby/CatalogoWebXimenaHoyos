import React, { memo } from 'react';
import { InputStyled } from './Input.styles';

type Props = {
	label?: string;
	name?: string;
	onChange?: (evt: React.ChangeEvent) => void;
	onBlur?: (evt: React.FocusEvent) => void;
	onFocus?: (evt: React.FocusEvent) => void;
	onKeyUp?: (evt: React.KeyboardEvent) => void;
	required?: boolean;
	type?: string;
	value?: string;
	hasError?: boolean;
	errorMessage?: string;
	externalClasses?: string;
};

export const Input = memo(
	({
		label,
		value = '',
		required,
		type = 'text',
		onChange,
		onFocus,
		onBlur,
		onKeyUp,
		name,
		hasError,
		errorMessage,
		externalClasses
	}: Props) => {
		const errorClasses = hasError ? 'invalid' : '';
		const outsideClasses = externalClasses ? externalClasses : '';
		const inputClasses = `${errorClasses} ${outsideClasses}`;
		return (
			<InputStyled className="flex column">
				{label ? <label className="medium">{label}</label> : null}
				<input
					className={inputClasses}
					value={value}
					type={type}
					name={name}
					onChange={onChange}
					onBlur={onBlur}
					onFocus={onFocus}
					onKeyUp={onKeyUp}
					required={required}
				/>
				<p className="has-error">{hasError ? errorMessage : ''}</p>
			</InputStyled>
		);
	}
);
