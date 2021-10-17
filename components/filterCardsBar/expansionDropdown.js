import cardExpansionData from '../../data/card-expansion.json';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

import MaterialUIDarkTheme from '../providers/materialUIDarkTheme';



const ExpansionDropdown = ({ handleChange, value }) =>
    <MaterialUIDarkTheme>
        <InputLabel>
            <Select className="expansion-dropdown" value={value} onChange={handleChange}>
                {cardExpansionData.map(el =>
                    <MenuItem key={el.code} value={el.code}>{`${el.name}(${el.code})`}</MenuItem>
                )}
                <MenuItem value={'ALL'}>全部擴充</MenuItem>
            </Select>
        </InputLabel>
    </MaterialUIDarkTheme>

export default ExpansionDropdown;