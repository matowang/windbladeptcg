import cardExpansionData from '../../data/card-expansion.json';

const ExpansionDropdown = ({ handleChange, value }) =>
    <label>
        <select className="expansion-dropdown" value={value} onChange={handleChange}>
            {cardExpansionData.map(el =>
                <option key={el.code} value={el.code}>{el.name}</option>
            )}
            <option value="">{"全部擴充"}</option>
        </select>
    </label>

export default ExpansionDropdown;