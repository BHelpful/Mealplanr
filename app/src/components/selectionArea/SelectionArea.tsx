import React, { Component, useState } from 'react';
import './SelectionArea.scss';

interface QuantityPorps {
	time?: boolean;
	ingredient?: boolean;
}

// Creates a element for user to enter quantities
export function Quantaty(props: QuantityPorps) {
	const {time, ingredient} = props;
	if(time) return (
		<div className={"quantity time"}>
			<p><span>60</span></p>
			<p><span>min</span></p>
	</div>
	); else if (ingredient) return (
		<>
			<div className={"quantity ingredient"}>
				<input type="text" placeholder={"Carrot"}/>
				<input type="number" value={10}/>
				<select>
					<option value="g">Grams</option>
					<option value="L">Liters</option>
				</select>
			</div>
			<div className={"button"}>Add</div>
		</>
	); else return (
		<div className={"quantity amount"}>
			<p>-</p>
			<p><span>2</span> portions</p>
			<p>+</p>
		</div>
	);
}

/* DRAG AND DROP HANDLES FOR Item */
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
/* END OF DRAG AND DROP HANDLES FOR Item */

interface ListingProps {
	name: string;
	drag?: boolean;
}

// Creates a list wrapper for Item
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
	amount?: number;
	unit?: "kg"|"g"|"mg"|"L"|"dL"|"cL"|"mL"|"tbsp"|"tsp"|"dsp"|"pcs"|"tin"|"bag"|"sm"|"med"|"lrg"|""|"°C";
	drag?: boolean;
}

// Creates an list element with checkbox or draggable
export function Item(props: ItemProps) {
	const {name, amount, unit, drag} = {amount: "", unit: "", ...props};
	
	if (drag) return (
		<div className={"item drag"} draggable={true}
			onDragEnter={handleDragEnter}
			onDragOver=	{handleDragOver}
			onDragLeave={handleDragLeave}
			onDragStart={handleDragStart}
			onDrop=			{handleDragDrop}
			onDragEnd=	{handleDragEnd}>
			<div className={"drag icon"}></div>
			<p><span>{name}</span></p>
			<p>{amount?<span>{amount}</span>:<span></span>}<span> {unit}</span></p>
			<div className={"cross icon"}></div>
		</div>
	);
	else return (
		<label className={"item cc"}>
			<input type="checkbox" />
			<span className="mark"></span>
			<p>{name}</p>
			<p><span>{amount}</span><span>{unit}</span></p>
		</label>
	);
}

// Function to handle click on remove icon on tag
const handleTagRemove = (evt: any) => evt.target.parentElement.remove();
// Function to handle click on tag text
const toggleTag = (evt: any) => {
	const elem = evt.target;
	const old = elem.classList[0] || "include";
	elem.classList.remove(old);
	elem.classList.add(old==="include" ? "exclude" : "include");
	elem.title = `${toFirstUpperCase(old)} item by clicking`;
}

interface TagProps {
	type: string,
	name: string,
	toggleable?: boolean,
	nonremovable?: boolean
}

// Function to create a tag
export function Tag(props: TagProps) {
	const { type, name, toggleable, nonremovable } = props;
	return <div className={'tag ' + type}>
					<p onClick={toggleable?toggleTag:()=>{}}>{name}</p>
					<span className={nonremovable?'':'removal'} onClick={nonremovable?()=>{}:handleTagRemove}></span>
				</div>;
}

// Handle to toggle dropdown state
const toggleDropdown = (toggle = true) => (evt: any) => {
	evt.preventDefault();
	if(!toggle || evt.target.classList.contains('open')) {
		evt.target.classList.remove('open');
	} else {
		evt.target.classList.add('open');
	}
}

// Manipulate ONLY the first letter to be uppercase
const toFirstUpperCase = (v: string) => v.replace(/(\w)(.*)/, (...args: any[]) => args[1].toUpperCase()+args[2]);

/* GET DATA FROM API */
const lookupType = (name: string) => {
	switch(name.toLowerCase()) {
		case 'chicken': return 'meat';
		default: return 'unkown';
	}
}
/* ENDOF GET DATA FROM API */

interface KeyboardEventWithData extends KeyboardEvent {
	data?: HTMLElement;
}

// Get the name of a variable name as a string
const varToString = (varObj: any) => (Object.keys(varObj)[0]).toString();

// Unused <- undefined
const handleSubmit = (evt: any) => 0;

// Handle to execute on keypress on a searchbar
const handleKeyDown = (createTag: any, tags: any) => (evt: any) => {
	// Checks for enter or a comma
	if(evt.key === 'Enter' || evt.key === ",") {
		const target: any = evt.target||evt.data;
		evt.preventDefault();
		const elem = target.parentElement.nextElementSibling;
		const newTaglist = tags;
		if(elem.classList.contains('tags')) {
			const v = target.value;
			// Add new tag if matches requirements
			if(v.match(/(\w{2,} ?)+/)) newTaglist.push({"name": toFirstUpperCase(v), "type": lookupType(v)});
			// Empty tag list
			target.value = '';
			// Fill populate list with updatede values
			createTag(newTaglist.filter((v:any,i:number,a:any)=>a.findIndex((t:any)=>(t.name === v.name))===i));
		}
	}
};

// Yeild function to generate id's with format: AA, BA, CA, ...
function* HTMLIDgenerator(): Generator<string> {
	var n = Math.ceil(Math.random() * 63);
	while (++n) yield (String.fromCharCode((n % 26) + 64) + String.fromCharCode(Math.floor(n / 26) + 64));
}

const htmlID = HTMLIDgenerator(); // Create generator from yield function
const getHTMLID: Array<string> = [];  // List of previus generated ids
const generateHTMLID = (): string => {
	getHTMLID.push(htmlID.next().value); // Get next id
	return getHTMLID.slice(-1)[0];
}

// Handle for clicking on search bar with dropdown menu
const handleMouseDown = (dropdown: boolean, createTag?:any, tags?:any) => (evt: any) => {
	const parent = evt.target.parentElement;
	parent.classList.remove("open");
	const elem: any = document.getElementById(parent.dataset.for);
	elem.value = evt.target.innerHTML;
	elem.classList.remove("open");
	if(!dropdown && createTag && tags) {
		var ke: KeyboardEventWithData = new KeyboardEvent('keydown', {key: ','});
		ke.data = elem;
		handleKeyDown(createTag, tags)(ke);
	}
}

interface SearchProps {
	taglist?: boolean;
	decription: string;
	type?: string;
	datalist?: Array<string>;
	toggleable?: boolean;
}

// Creates a search-bar, either with or without tags
function Search(props: SearchProps) {
	const { taglist, decription, type, datalist, toggleable } = props;
	const dropdown = type==="dropdown";
	const [tags, createTag] = useState([{name:'',type:''}]);
	if(tags[0] && tags[0].name === '') tags.pop();
	return (
		<div className={"search "+(taglist ? "tags":"")}>
			<div className={"bar "+type||''}>
				<input
					id={generateHTMLID()}
					onClick={toggleDropdown()}
					onBlur={toggleDropdown(false)}
					onChange={(evt:any)=>evt.preventDefault()}
					onKeyDown={taglist ? handleKeyDown(createTag, tags):()=>{}}
					placeholder={decription}
					list={datalist?varToString(datalist):''}/>
				{datalist ?
					<div className="dropdown list" data-for={getHTMLID.slice(-1)[0]}>
						{datalist.map((v: string, i: number) => (<div key={i} onMouseDown={handleMouseDown(dropdown, createTag, tags)}>{v}</div>))}
					</div>
				: ''}
				<label htmlFor={getHTMLID.slice(-1)[0]} onClick={type!=="dropdown"?handleSubmit:()=>{}}></label>
			</div>
			{taglist ? <div className="tags list">
				{tags.length > 0 ? tags.map((v, i) => (<Tag key={i} name={v.name} type={v.type} toggleable={toggleable} />)) : ''}
			</div>: ''}
		</div>
	);
}

interface MultipleChoiceProps {
	decription: string,
	name: string,
}

// Creates a checkbox
export function MultipleChoice(props: MultipleChoiceProps) {
	const {decription, name} = props;
	return (
		<><input type="checkbox" id={name} /><label htmlFor={name}>{decription}</label></>
	);
}

// Create a list with weekdays name - formatted as length, case, and index-day
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

// Rotate-right a list
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

// Convert short meal-format to long
const fullMeal = (short: string | null) => {
	switch (short) {
		case 'A':   return 'Appetiser';
		case 'M':   return 'Main';
		case 'D':   return 'Desert';
		case 'AM':  return 'Appetiser + Main';
		case 'AD':  return 'Appetiser + Desert';
		case 'MD':  return 'Main + Desert';
		case 'AMD': return 'Appetiser + Main + Desert';
		default:    return 'Choose';
	}
};

interface WeekdaysProps {
	decription: string;
	offset?: number;
	namelength?: number;
	uppercase?: boolean;
}

// Handle to toggle weekday selection
const handleWeekSelection = (evt: any) => {
	const elem = evt.target;
	if(!elem.classList.contains("unavailable")) {
		const old = elem.classList.contains("available") ? "available" : "selected"
		elem.classList.remove(old);
		elem.classList.add(old==="available" ? "selected" : "available");
		const distantSibling: any  = document.getElementsByClassName(elem.id)[0];
		if(distantSibling) {
			if(old==="available") {
				distantSibling.classList.remove("unavailable");
				distantSibling.children[1].disabled = false;
			} else {
				distantSibling.classList.add("unavailable");
				distantSibling.children[1].disabled = true;
			}
		}
	}
}

// Creates the weekday button selection
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
			case -1: selected[i] = 'unavailable'; break;
			case 0: selected[i] = 'available'; break;
			case 1: selected[i] = 'selected'; break;
			default: selected[i] = '';
		}
	});

	return (
		<div className="selection weekdays">
			<p>{decription}</p>
			<div className="week">
				{days.map((v: string, index: number) => (
					<div key={index} id={generateHTMLID()} className={'day ' + selected[index]} onClick={handleWeekSelection}>
						{v}
					</div>
				))}
			</div>
		</div>
	);
}

// Creates the weekday-dropdown
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
						className={'day ' + (getHTMLID.slice(index-7)[0]) + " " + (selected[index] ?? 'unavailable')}
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

// Creates a textbox, that can be used as search or input
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

// Creates a area for buttons, to arrange them
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

// Creates a list element for Guide
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

// Creates a list to hold Steps
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

// Creates the box around buttons/search/other selections
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
