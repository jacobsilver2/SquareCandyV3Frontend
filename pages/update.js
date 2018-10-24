import UpdateItem from '../components/UpdateItem';

// getInitialProps in app.js exposes queries all over the app.
// This is where the query prop comes from
const Sell = ({query}) => (
    <div>
        <UpdateItem id={query.id}/>
    </div>
);

export default Sell;