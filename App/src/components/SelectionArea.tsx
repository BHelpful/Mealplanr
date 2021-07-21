import React, { Component } from 'react';
import './SelectionArea.scss';

interface TagProps {
	type: string;
	name: string;
}

export function Tag(props: TagProps) {
	const { type, name } = props;
	return <div className={'tag ' + type}>{name}</div>;
}

interface TagSearchProps {
	decription: string;
}

class TagSearch extends Component<TagSearchProps> {
	render() {
		const { decription, children } = this.props;
		return (
			<div className="search tags">
				<p>{decription}</p>
				<div className="search bar"></div>
				<div className="tags list">{children}</div>
			</div>
		);
	}
}

const weekdaysNamesArr = (len = 2, uppercase = true, offset = 1) => {
	const days = [
		'monday',
		'tuesday',
		'wendsday',
		'thursday',
		'friday',
		'saturday',
		'sunday',
	];
	const parsed = Array(7);

	if (offset < 0) offset = (7 - Math.abs(offset)) % 7;
	days.forEach((v, i) => {
		parsed[(i + offset) % 7] = uppercase ? v.toUpperCase() : v;
		parsed[(i + offset) % 7] = parsed[(i + offset) % 7].slice(0, len);
	});

	return parsed;
};

const weekdaysAvailArr = (arr: any, offset: number) => {
	arr.forEach((v: number, i: number) => {
		arr[((i + offset) % 7) + 7] = arr[i];

		if (i === 6) {
			for (let i = 0; i < 7; i++) arr[i] = arr[i + 7];
			arr = arr.slice(7);
		}
	});

	return arr;
};

const fullMeal = (short: string | null) => {
	switch (short) {
		case 'A':
			return 'Appetiser';
		case 'M':
			return 'Main';
		case 'D':
			return 'Desert';
		case 'AM':
			return 'Appetiser + Main';
		case 'AD':
			return 'Appetiser + Desert';
		case 'MD':
			return 'Main + Desert';
		case 'AMD':
			return 'Appetiser + Main + Desert';
		default:
			return 'Chose';
	}
};

interface WeekdaysProps {
	decription: string;
	offset?: number;
	namelength?: number;
	uppercase?: boolean;
}

export function WeekdaysButtons(props: WeekdaysProps) {
	const { decription, namelength, uppercase, offset } = {
		namelength: 2,
		uppercase: true,
		offset: 1,
		...props,
	};
	const days = weekdaysNamesArr(namelength, uppercase, offset);
	const selected = weekdaysAvailArr(
		[-1, 1, 1, 0, 0, 1, 1],
		offset
	); /* Fetch from database */
	selected.forEach((v: number, i: number) => {
		switch (v) {
			case -1:
				selected[i] = 'unavailable';
				break;
			case 0:
				selected[i] = 'available';
				break;
			case 1:
				selected[i] = 'selected';
				break;
			default:
				selected[i] = '';
		}
	});

	return (
		<div className="selection weekdays">
			<p>{decription}</p>
			<div className="week">
				{days.map((v: string, index: number) => (
					<div key={index} className={'day ' + selected[index]}>
						{v}
					</div>
				))}
			</div>
		</div>
	);
}

export function WeekdaysDropdown(props: WeekdaysProps) {
	const { decription, namelength, uppercase, offset } = {
		namelength: 2,
		uppercase: true,
		offset: 1,
		...props,
	};
	const days = weekdaysNamesArr(namelength, uppercase, offset);
	const selected = weekdaysAvailArr(
		[null, 'AM', 'D', null, null, 'AMD', 'M'],
		offset
	); /* Fetch from database */

	return (
		<div className="selection weekdays">
			<p>{decription}</p>
			<div className="week dropdowns">
				{days.map((v: string, index: number) => (
					<div
						key={index}
						className={'day ' + (selected[index] ?? 'unavailable')}
					>
						<p>{v}</p>
						<select
							className="dropdownbox"
							disabled={!selected[index] ?? false}
							defaultValue={selected[index]}
						>
							{[null, 'A', 'M', 'D', 'AM', 'MD', 'AD', 'AMD'].map(
								(v: string | null, i) => (
									<option key={i} value={v ?? 0}>
										{(v ?? '').length} {fullMeal(v ?? '')}
									</option>
								)
							)}
						</select>
					</div>
				))}
			</div>
		</div>
	);
}

interface SelectionAreaProps {
	cln?: string;
	columns: number;
}

class SelectionArea extends Component<SelectionAreaProps> {
	render() {
		const { cln, columns, children } = { cln: null, ...this.props };
		return (
			<div
				className={'selectionarea ' + (cln ?? ' ')}
				data-columns={columns}
			>
				{children}
			</div>
		);
	}
}

export default SelectionArea;
export { TagSearch };
