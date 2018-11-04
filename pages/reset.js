import Reset from '../components/Reset';
import { checkPropTypes } from 'prop-types';

const Sell = (props) => (
    <div>
        <Reset resetToken={props.query.resetToken}/>
        <p>Your token is {props.query.resetToken}</p>
    </div>
);

export default Sell;