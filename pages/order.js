import PleaseSignIn from '../components/PleaseSignIn';

const Order = (props) => (
    <div>
        <PleaseSignIn>
            <p>This is a single Order {props.query.id}</p>
        </PleaseSignIn>
    </div>
);

export default Order;