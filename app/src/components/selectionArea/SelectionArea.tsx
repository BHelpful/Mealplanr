import React, { Component } from 'react';
import './SelectionArea.scss';

interface QuantityPorps {
	time?: boolean;
	ingredients?: boolean;
}

export function Quantaty(props: QuantityPorps) {
	const {time, ingredients} = props;
	if(time) return (
		<div className={"quantity time"}>
			<p><span>60</span></p>
			<p><span>min</span></p>
	</div>
	); else if (ingredients) return (
		<></>
	); else return (
		<div className={"quantity amount"}>
			<p>-</p>
			<p><span>2</span> portions</p>
			<p>+</p>
		</div>
	);
}

var dragSrcEl: any;

const handleDragStart = (evt: any) => {
  evt.target.style.opacity = '0.4';
  dragSrcEl = evt.target;
  evt.dataTransfer.effectAllowed = 'move';
  evt.dataTransfer.setData('text/html', evt.target.innerHTML);
};
const handleDragEnter = (evt: any) => evt.target.classList.add('over');
const handleDragLeave = (evt: any) => {
  evt.stopPropagation();
  evt.target.classList.remove('over');
};
const handleDragOver = (evt: any) => {
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'move';
  return false;
};
const handleDragDrop = (evt: any) => {
  if (dragSrcEl !== this) {
    dragSrcEl.innerHTML = evt.target.innerHTML;
    evt.target.innerHTML = evt.dataTransfer.getData('text/html');
  }
  return false;
}
const handleDragEnd = (evt: any) => {
  var listItens = document.querySelectorAll('.draggable');
  [].forEach.call(listItens, (item: any) => item.classList.remove('over'));
  evt.target.style.opacity = '1';
}

interface ListingProps {
	name: string;
	drag?: boolean;
}
class Listing extends Component<ListingProps> {
	render () {
		const {name, drag, children} = this.props;
		if (drag) return (
			<>
				<p>{name}</p>
				<input type="text" placeholder={"Clean/wash beans"}></input>
				<div className={"button"}>Add</div>
				<div className={"listing drag"}>{children}</div>
			</>
		);
		else return (
			<>
				<p>{name}</p>
				<div className={"listing"}>{children}</div>
			</>
		);
	}
}

interface ItemProps {
	name: string;
	drag?: boolean;
}

export function Item(props: ItemProps) {
	const {name, drag} = props;
	if (drag) return (
		<div className={"item drag"} draggable={true}
			onDragEnter={handleDragEnter}
			onDragOver=	{handleDragOver}
			onDragLeave={handleDragLeave}
			onDragStart={handleDragStart}
			onDrop=			{handleDragDrop}
			onDragEnd=	{handleDragEnd}>
			<div className={"drag icon"}></div>
			<p>{name}</p>
			<div className={"cross icon"}></div>
		</div>
	);
	else return (
		<label className={"item cc"}>
			<input type="checkbox" />
			<span className="mark"></span>
			<p>{name}</p>
			<p><span>5</span><span>stk</span></p>
		</label>
	);
}

interface TagProps {
	type: string,
	name: string,
}

export function Tag(props: TagProps) {
	const { type, name } = props;
	return <div className={'tag ' + type}>{name}</div>;
}

interface SearchProps {
	taglist?: boolean,
	decription: string,
	type?: string,
}

class Search extends Component<SearchProps> {
	render() {
		const { taglist, decription, type, children } = this.props;
		return (
			<div className="search tags">
				<p>{decription}</p>
				<div className={"bar "+type||''}>
					<span></span>
				</div>
				{taglist ? <div className="tags list">{children}</div> : ''}
			</div>
		);
	}
}

interface MultipleChoiceProps {
	decription: string,
	name: string,
}

export function MultipleChoice(props: MultipleChoiceProps) {
	const {decription, name} = props;
	return (
		<div><input type="checkbox" id={name} /><label htmlFor={name}>{decription}</label></div>
	);
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

interface TextFieldProps {
	large?: boolean,
	decription?: string,
	placeholder?: string,
	submitBtnText?: string,
}

export function TextField(props: TextFieldProps) {
	const {large, decription, placeholder, submitBtnText} = props;
	if(large) return (
		<div className={"text field large"}>
			{ decription ? <p>{decription}</p> : <></> }
			<textarea placeholder={placeholder?placeholder:''}></textarea>
			{ submitBtnText ? <input value={submitBtnText} /> : <></> }
		</div>
	); else return (
		<div className={"text field"}>
			{ decription ? <p>{decription}</p> : <></> }
			<input type={"text"} placeholder={placeholder?placeholder:''}></input>
			{ submitBtnText ? <input value={submitBtnText} /> : <></> }
		</div>
	);
}

interface ButtonFieldProps {
	decription: string,
	vertical?: boolean,
	danger?: boolean
}

class ButtonField extends Component<ButtonFieldProps> {
	render() {
		const {decription, vertical, danger, children} = this.props;

		return (
			<div className={"button field "+(vertical?"vertical":"")}>
				{children}
				<input type={"button"} className={danger?"danger":""} value={decription} />
			</div>
		);
	}
}

interface StepProps {
	decs: string;
}

export function Step(props: StepProps) {
	const {decs} = props;
	return (
		<label className={"step cc"}>
			<input type="checkbox" />
			<span className="mark"></span>
			<p>{decs}</p>
		</label>
	);
}

interface GuideProps {
	title: string;
}
class Guide extends Component<GuideProps> {
	render() {
		const {title, children} = this.props;

		return (
			<div className={"guide"}>
				<h3>{title}</h3>
				{children}
			</div>
		);
	}
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
export { Listing, Guide, Search, ButtonField };
